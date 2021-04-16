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
    success: {
      successMsg: '',
    },
  },
  user: {
    address: '',
    is_verificated: false,
    display_name: '',
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
