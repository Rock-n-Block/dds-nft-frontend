import { types } from 'mobx-state-tree';

export const User = types
  .model({
    address: types.string,
  })
  .actions((self) => ({
    setAddress(addr: string) {
      self.address = addr;
    },
    clear() {
      self.address = '';
    },
  }));
