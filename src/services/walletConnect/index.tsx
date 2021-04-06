import React, { createContext, useContext } from 'react';

import Web3Provider from '../web3';

const walletConnectorContext = createContext<any>({
  web3Provider: {},
});

const Connector: React.FC = ({ children }) => {
  const [provider, setProvider] = React.useState<any>(null);

  React.useEffect(() => {
    const web3 = new Web3Provider();
    setProvider(web3);
    web3.accountsChangedObs.subscribe({
      next(x: any) {
        console.log(x, 'change');
      },
    });
  }, []);

  return (
    <walletConnectorContext.Provider value={{ web3Provider: provider }}>
      {children}
    </walletConnectorContext.Provider>
  );
};

export default Connector;

export function useWalletConnectorContext() {
  return useContext(walletConnectorContext);
}
