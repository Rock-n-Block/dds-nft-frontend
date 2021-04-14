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

  connect = (): void => {
    this.state.provider
      .connect()
      .then((res: any) => {
        if (!localStorage.dds_token) {
          userApi
            .getMsg()
            .then(({ data }) => {
              this.state.provider
                .signMsg(data)
                .then((signedMsg: any) => {
                  userApi
                    .login({
                      address: res.address,
                      msg: data,
                      signedMsg,
                    })
                    .then((result) => {
                      localStorage.dds_token = result.data.key;
                      rootStore.user.setAddress(res.address);
                      localStorage.dds_metamask = true;
                    })
                    .catch((err) => {
                      console.log(err, 'login');
                      rootStore.user.disconnect();
                    });
                })
                .catch((err: any) => {
                  console.log(err, 'sign');
                  rootStore.user.disconnect();
                });
            })
            .catch((err) => {
              console.log(err, 'msg');
              rootStore.user.disconnect();
            });
        } else {
          rootStore.user.setAddress(res.address);
          localStorage.dds_metamask = true;
        }
      })
      .catch((err: any) => {
        rootStore.modals.metamask.setErr(err.message);
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
