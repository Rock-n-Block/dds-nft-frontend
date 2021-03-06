import React, { createContext, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import { rootStore } from '../../store/store';
import { userApi } from '../api';
import MetamaskService from '../web3';

const walletConnectorContext = createContext<any>({
  MetamaskService: {},
  connect: (): void => {},
});

@observer
class Connector extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      provider: new MetamaskService({
        testnet: 'kovan',
        isProduction: true,
      }),
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  componentDidMount() {
    const self = this;
    if (window.ethereum) {
      if (localStorage.dds_metamask) {
        this.connect();
      }

      this.state.provider.chainChangedObs.subscribe({
        next(err: string) {
          rootStore.modals.metamask.setErr(err);
        },
      });

      this.state.provider.accountChangedObs.subscribe({
        next() {
          self.disconnect();
        },
      });
    }
  }

  connect = async () => {
    if (window.ethereum) {
      try {
        const { address } = await this.state.provider.connect();

        if (!localStorage.dds_token) {
          const metMsg: any = await userApi.getMsg();

          const signedMsg = await this.state.provider.signMsg(metMsg.data);

          const login: any = await userApi.login({
            address,
            msg: metMsg.data,
            signedMsg,
          });

          localStorage.dds_token = login.data.key;
          rootStore.user.setAddress(address);
          localStorage.dds_metamask = true;
        } else {
          rootStore.user.setAddress(address);
          localStorage.dds_metamask = true;
        }
        rootStore.user.getMe();
      } catch (err) {
        rootStore.modals.metamask.setErr(err.message);
        this.disconnect();
      }
    } else {
      rootStore.modals.metamask.setErr('No Metamask (or other Web3 Provider) installed');
    }
  };

  disconnect() {
    rootStore.user.disconnect();

    if (
      ['/create/single', '/create/multi', '/profile', '/create'].includes(
        this.props.location.pathname,
      )
    ) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <walletConnectorContext.Provider
        value={{
          metamaskService: this.state.provider,
          connect: this.connect,
          disconnect: this.disconnect,
        }}
      >
        {this.props.children}
      </walletConnectorContext.Provider>
    );
  }
}

export default withRouter(Connector);

export function useWalletConnectorContext() {
  return useContext(walletConnectorContext);
}
