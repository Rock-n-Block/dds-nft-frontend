import React, { createContext, useContext } from 'react';
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
      }),
    };

    this.connect = this.connect.bind(this);
  }

  componentDidMount() {
    console.log(this.state.provider, 'provider');

    if (localStorage.dds_metamask) {
      this.connect();
    }

    this.state.provider.chainChangedObs.subscribe({
      next(err: string) {
        rootStore.modals.metamask.setErr(err);
      },
    });
  }

  connect = async () => {
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

      const { data: user } = await userApi.getMe();
      console.log(user, 'me');
    } catch (error) {
      console.log(error, 'connect');
      rootStore.user.disconnect();
    }
  };

  render() {
    return (
      <walletConnectorContext.Provider
        value={{ metamaskService: this.state.provider, connect: this.connect }}
      >
        {this.props.children}
      </walletConnectorContext.Provider>
    );
  }
}

export default Connector;

export function useWalletConnectorContext() {
  return useContext(walletConnectorContext);
}
