import WalletConnectProvider from '@walletconnect/web3-provider';
import { Observable } from 'rxjs';
import Web3 from 'web3';

export default class Web3Provider {
  private provider: any;

  public web3Provider: any;

  public accountsChangedObs: any;

  constructor() {
    this.provider = new WalletConnectProvider({
      infuraId: 'd1bbf6a40e514be6878e06b2d01a7f41',
    });

    this.web3Provider = new Web3(this.provider);

    this.accountsChangedObs = new Observable((subscriber) => {
      this.provider.on('accountsChanged', (accounts: string[]) => {
        subscriber.next(accounts);
      });
    });

    this.provider.on('chainChanged', (chainId: number) => {
      console.log(chainId, 'chainChanged');
    });

    this.provider.on('disconnect', (code: number, reason: string) => {
      console.log(code, reason, 'disconnect');
    });
  }

  public connect = async () => {
    console.log(this.provider, 'provider');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    window.provider = this.provider;
    try {
      await this.provider.enable();
    } catch (err) {
      console.log(err);
      window.location.reload();
    }
  };

  public disconnect = () => {
    this.provider.disconnect();
  };
}
