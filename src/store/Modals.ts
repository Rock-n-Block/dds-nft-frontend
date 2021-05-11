import { types } from 'mobx-state-tree';

const PutOnSaleModal = types
  .model({
    isOpen: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    open() {
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
    },
  }));

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
const ConvertModal = types
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
const VerifyModal = types
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
const AuctionModal = types
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
  convert: ConvertModal,
  verify: VerifyModal,
  success: SuccessModal,
  auction: AuctionModal,
  putOnSale: PutOnSaleModal,
});
