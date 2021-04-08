import { types } from 'mobx-state-tree';

/* eslint-disable no-param-reassign */
const TermsModal = types
  .model({
    isOpen: types.boolean,
  })
  .actions((self) => ({
    open() {
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
    },
  }));

export const Modals = types.model({
  terms: TermsModal,
});
