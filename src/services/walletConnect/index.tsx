import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react';

import { rootStore } from '../../store/store';
import MetamaskService from '../web3';
import { userApi } from '../api';

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
  }

  connect = (): void => {
    this.state.provider
      .connect()
      .then((res: any) => {
        rootStore.user.setAddress(res.address);
        localStorage.dds_metamask = true;

        if (!localStorage.dds_token) {
          userApi
            .getMsg()
            .then(({ data }) => {
              this.state.provider
                .signMsg(data)
                .then((signedMsg: any) => {
                  userApi
                    .login({
                      address: rootStore.user.address,
                      msg: data,
                      signedMsg,
                    })
                    .then((result) => {
                      localStorage.dds_token = result.data.key;
                    })
                    .catch((err) => {
                      console.log(err, 'login');
                    });
                })
                .catch((err: any) => console.log(err));
            })
            .catch((err) => console.log(err, 'msg'));
        }
      })
      .catch((err: any) => {
        console.log(err, 'err');
      });
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
