import { types } from 'mobx-state-tree';

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

const CreateCollectionModal = types
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

const MetamaskModal = types
  .model({
    errMsg: types.optional(types.string, ''),
  })
  .actions((self) => ({
    setErr(err: string) {
      self.errMsg = err;
    },
  }));

const SuccessModal = types
  .model({
    successMsg: types.optional(types.string, ''),
  })
  .actions((self) => ({
    setSuccessMsg(msg: string) {
      self.successMsg = msg;
    },
  }));

export const Modals = types.model({
  terms: TermsModal,
  metamask: MetamaskModal,
  createCollection: CreateCollectionModal,
  success: SuccessModal,
});
