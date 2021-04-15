import { types } from 'mobx-state-tree';

export const User = types
  .model({
    address: types.string,
  })
  .actions((self) => ({
    setAddress(addr: string) {
      self.address = addr;
    },
    disconnect() {
      self.address = '';
      delete localStorage.dds_token;
      delete localStorage.dds_metamask;
    },
  }));
