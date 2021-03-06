import { createContext, useContext } from 'react';
import { Instance, onSnapshot, types } from 'mobx-state-tree';

import { Modals } from './Modals';
import { User } from './User';

const RootModel = types.model({
  modals: Modals,
  user: User,
});
export const Store = RootModel.create({
  modals: {
    terms: {
      isOpen: false,
    },
    metamask: {},
    createCollection: {
      isOpen: false,
    },
    convert: {
      isOpen: false,
    },
    verify: {
      isOpen: false,
    },
    report: {
      isOpen: false,
    },
    fixedPrice: {
      isOpen: false,
      fee: 0,
      totalSupply: 1,
    },
    timedAuction: { isOpen: false },
    info: {
      msg: '',
    },
    auction: {
      token: {
        id: '',
        name: '',
      },
      artist: {
        id: '',
        name: '',
      },
    },
    uploadCover: {
      isOpen: false,
    },
    putOnSale: {},
    checkout: {
      token: {},
    },
    multibuy: {},
    checkAvailability: {
      user: {},
    },
  },
  user: {
    address: '',
    is_verificated: false,
    display_name: '',
    balance: { eth: '0', weth: '0' },
    follows_count: 0,
    followers_count: 0,
  },
});

export const rootStore = Store;

onSnapshot(rootStore, (snapshot) => {
  console.log('Snapshot: ', snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const { Provider } = RootStoreContext;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
