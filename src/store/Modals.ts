import { applySnapshot, getSnapshot, types } from 'mobx-state-tree';

const CheckAvailability = types
  .model({
    isAvailable: types.optional(types.boolean, true),
    user: types.model({
      name: types.optional(types.string, ''),
      avatar: types.optional(types.string, ''),
      id: types.optional(types.number, 0),
    }),
    amount: types.optional(types.number, 0),
  })
  .views((self) => ({
    get getIsOpen() {
      if (self.user.name && self.user.id && self.amount) {
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

const MultiBuyModal = types
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

const CheckoutModal = types
  .model({
    token: types.model({
      name: types.optional(types.string, ''),
      available: types.optional(types.number, 0),
    }),
    collectionName: types.optional(types.string, ''),
    sellerId: types.optional(types.number, 0),
  })
  .views((self) => ({
    get getIsOpen() {
      if (self.token.name && self.token.available && self.collectionName && self.sellerId) {
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
const FixedPriceModal = types
  .model({
    isOpen: types.optional(types.boolean, false),
    fee: types.optional(types.number, 0),
    totalSupply: types.optional(types.number, 1),
  })
  .actions((self) => ({
    open() {
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
    },
    setProps(fee: number, totalSupply: number) {
      self.fee = fee;
      self.totalSupply = totalSupply;
    },
  }));
const TimedAuctionModal = types
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
const ReportModal = types
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
      id: types.optional(types.union(types.string, types.number), ''),
    }),
    artist: types.model({
      name: types.optional(types.string, ''),
      id: types.optional(types.union(types.string, types.number), ''),
    }),
    available: types.optional(types.number, 0),
    fee: types.optional(types.number, 0),
    isRefreshPage: types.optional(types.boolean, false),
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
    close() {
      self.errMsg = '';
    },
  }));

const InfoModal = types
  .model({
    msg: types.optional(types.string, ''),
    type: types.optional(types.string, ''),
  })
  .actions((self) => ({
    setMsg(msg: string, type: 'success' | 'error') {
      self.msg = msg;
      self.type = type;
    },
    close() {
      self.msg = '';
      self.type = '';
    },
  }));

export const Modals = types
  .model({
    terms: TermsModal,
    metamask: MetamaskModal,
    createCollection: CreateCollectionModal,
    convert: ConvertModal,
    verify: VerifyModal,
    report: ReportModal,
    info: InfoModal,
    auction: AuctionModal,
    uploadCover: UploadCoverModal,
    putOnSale: PutOnSaleModal,
    fixedPrice: FixedPriceModal,
    timedAuction: TimedAuctionModal,
    checkout: CheckoutModal,
    multibuy: MultiBuyModal,
    checkAvailability: CheckAvailability,
  })
  .actions((self) => ({
    closeAll() {
      self.auction.close();
      self.putOnSale.close();
      self.fixedPrice.close();
      self.timedAuction.close();
      self.checkout.close();
      self.multibuy.close();
      self.checkAvailability.close();
    },
  }));
