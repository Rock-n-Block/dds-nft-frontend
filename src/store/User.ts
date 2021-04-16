import { applySnapshot, flow, types } from 'mobx-state-tree';

import { userApi } from '../services/api';

/* eslint-disable no-param-reassign */
export const User = types
  .model({
    address: types.string,
    avatar: types.optional(types.maybeNull(types.string), null),
    bio: types.optional(types.maybeNull(types.string), null),
    custom_url: types.optional(types.maybeNull(types.string), null),
    display_name: types.optional(types.maybeNull(types.string), null),
    followers: types.optional(types.array(types.string), []),
    follows: types.optional(types.array(types.string), []),
    id: types.optional(types.union(types.number, types.string, types.null), null),
    is_verificated: types.boolean,
    site: types.optional(types.maybeNull(types.string), null),
    twitter: types.optional(types.maybeNull(types.string), null),
  })
  .actions((self) => {
    const setAddress = (addr: string) => {
      self.address = addr;
    };
    const update = (userData: any) => {
      applySnapshot(self, userData);
      self.avatar = `https://${userData.avatar}`;
    };
    const disconnect = () => {
      self.address = '';
      delete localStorage.dds_token;
      delete localStorage.dds_metamask;
    };
    const getMe = flow(function* getMe() {
      try {
        const { data } = yield userApi.getMe();

        update(data);
      } catch (err) {
        console.log(err);
        disconnect();
      }
    });

    return {
      setAddress,
      update,
      getMe,
      disconnect,
    };
  });

/* eslint-disable no-param-reassign */
