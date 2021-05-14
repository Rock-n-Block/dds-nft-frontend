import { applySnapshot, getSnapshot, types } from 'mobx-state-tree';

const CheckoutModal = types
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
    token: types.model({
      name: types.optional(types.string, ''),
      id: types.optional(types.string, ''),
    }),
    artist: types.model({
      name: types.optional(types.string, ''),
      id: types.optional(types.union(types.string, types.number), ''),
    }),
    available: types.optional(types.number, 0),
    fee: types.optional(types.number, 0),
  })
  .views((self) => ({
    get getIsOpen() {
      if (self.token.name && self.token.id && self.artist.id) {
        return true;
      }
      return false;
    },
  }))
  .actions((self) => {
    let initialState = {};
    return {
      afterCreate: () => {
        initialState = getSnapshot(self);
      },
      close: () => {
        applySnapshot(self, initialState);
      },
      open: (data: any) => {
        applySnapshot(self, data);
      },
    };
  });
const UploadCoverModal = types
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
  uploadCover: UploadCoverModal,
  putOnSale: PutOnSaleModal,
  checkout: CheckoutModal,
});
