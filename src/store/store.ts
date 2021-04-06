import { createContext, useContext } from 'react';
import { Instance, onSnapshot, types } from 'mobx-state-tree';

const RootModel = types.model({});

export const Store = RootModel.create({});

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
