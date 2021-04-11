import BigNumber from 'bignumber.js/bignumber';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
    provider: any;
  }
}
interface INetworks {
  [key: string]: string;
}

interface IMetamaskService {
  testnet: 'ropsten' | 'kovan' | 'rinkeby';
  isProduction?: boolean;
}

const networks: INetworks = {
  mainnet: '0x1',
  ropsten: '0x3',
  kovan: '0x2a',
  rinkeby: '0x4',
};

export default class MetamaskService {
  public wallet;

  public web3Provider;

  private testnet: string;

  private isProduction: boolean;

  public walletAddress = '';

  constructor({ testnet, isProduction = false }: IMetamaskService) {
    this.wallet = window.ethereum;
    this.web3Provider = new Web3(this.wallet);
    this.testnet = testnet;
    this.isProduction = isProduction;
    window.provider = this.web3Provider;

    this.wallet.on('chainChanged', (newChain: any) => {
      const chainId = localStorage.getItem('chainId');
      if (String(chainId) !== String(newChain)) {
        localStorage.setItem('chainId', newChain);
        window.location.reload();
      }
    });
    this.wallet.on('connect', () => {
      console.log('connect');
    });
    this.wallet.on('disconnect', () => {
      console.log('disconnect');
    });
  }

  ethRequestAccounts() {
    return this.wallet.request({ method: 'eth_requestAccounts' });
  }

  public connect() {
    const usedNetwork = this.isProduction ? 'mainnet' : this.testnet;
    const usedChain = this.isProduction ? networks.mainnet : networks[this.testnet];
    const currentChain = this.wallet.chainId;

    return new Promise((resolve, reject) => {
      if (!this.wallet) {
        reject(new Error(`${usedNetwork} wallet is not injected`));
      }

      if (!currentChain || currentChain === null) {
        this.wallet
          .request({ method: 'eth_chainId' })
          .then((resChain: any) => {
            if (resChain === usedChain) {
              this.ethRequestAccounts()
                .then((account: any) => {
                  [this.walletAddress] = account;
                  resolve({
                    address: account[0],
                    network: resChain,
                  });
                })
                .catch(() => reject(new Error('Not authorized')));
            } else {
              reject(new Error(`Please choose ${usedNetwork} network in metamask wallet`));
            }
          })
          .catch(() => reject(new Error('Not authorized')));
      } else if (currentChain === usedChain) {
        this.ethRequestAccounts()
          .then((account: any) => {
            [this.walletAddress] = account;
            resolve({
              address: account[0],
              network: currentChain,
            });
          })
          .catch(() => reject(new Error('Not authorized')));
      } else {
        reject(new Error(`Please choose ${usedNetwork} network in metamask wallet.`));
      }
    });
  }

  getContract(tokenAddress: string, abi: Array<any>) {
    return new this.web3Provider.eth.Contract(abi, tokenAddress);
  }

  static getMethodInterface(abi: Array<any>, methodName: string) {
    return abi.filter((m) => {
      return m.name === methodName;
    })[0];
  }

  encodeFunctionCall(abi: any, data: Array<any>) {
    return this.web3Provider.eth.abi.encodeFunctionCall(abi, data);
  }

  async totalSupply(tokenAddress: string, abi: Array<any>, tokenDecimals: number) {
    const contract = this.getContract(tokenAddress, abi);
    const totalSupply = await contract.methods.totalSupply().call();

    return +new BigNumber(totalSupply).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
  }

  async checkTokenAllowance(
    tokenAddress: string,
    contract: any,
    abi: Array<any>,
    tokenDecimals: number,
    walletAddress?: string,
  ) {
    const walletAdr = walletAddress || this.walletAddress;

    try {
      let result = await contract.methods.allowance(walletAdr, tokenAddress).call();
      const totalSupply = await this.totalSupply(tokenAddress, abi, tokenDecimals);

      result = result ? result.toString(10) : result;
      result = result === '0' ? null : result;
      if (result && new BigNumber(result).minus(totalSupply).isPositive()) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async approveToken(
    tokenAddress: string,
    abi: Array<any>,
    tokenDecimals: number,
    walletAddress?: string,
  ) {
    try {
      const totalSupply = await this.totalSupply(tokenAddress, abi, tokenDecimals);

      const approveMethod = MetamaskService.getMethodInterface(abi, 'approve');

      const approveSignature = this.encodeFunctionCall(approveMethod, [
        tokenAddress,
        MetamaskService.calcTransactionAmount(totalSupply, tokenDecimals),
      ]);

      return this.sendTransaction({
        from: walletAddress || this.walletAddress,
        to: tokenAddress,
        data: approveSignature,
      });
    } catch (error) {
      return error;
    }
  }

  static calcTransactionAmount(amount: number, tokenDecimal: number) {
    return new BigNumber(amount)
      .times(new BigNumber(tokenDecimal).times(tokenDecimal))
      .toString(10);
  }

  createTransaction(
    abi: Array<any>,
    method: string,
    data: Array<any>,
    tokenAddress: string,
    walletAddress?: string,
    value?: any,
  ) {
    const transactionMethod = MetamaskService.getMethodInterface(abi, method);

    const approveSignature = this.encodeFunctionCall(transactionMethod, data);

    return this.sendTransaction({
      from: walletAddress || this.walletAddress,
      to: tokenAddress,
      data: approveSignature,
      value: value || '',
    });
  }

  signMsg(msg: string) {
    return this.web3Provider.eth.personal.sign(msg, this.walletAddress, '');
  }

  sendTransaction(transactionConfig: any) {
    return this.wallet.request({
      method: 'eth_sendTransaction',
      params: [transactionConfig],
    });
  }
}
