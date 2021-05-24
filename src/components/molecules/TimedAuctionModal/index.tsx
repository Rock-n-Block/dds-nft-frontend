import React from 'react';
import { observer } from 'mobx-react-lite';

import SaleTimedAuctionForm from '../../../forms/SaleTimedAuction/container';
import { useMst } from '../../../store/store';
import { Modal } from '../index';

import './TimedAuctionModal.scss';

interface ITimedAuctionModal {
  tokenId: number;
  handleSetTokenData: (data: any) => void;
}

const TimedAuctionModal: React.FC<ITimedAuctionModal> = observer(
  ({ tokenId, handleSetTokenData }) => {
    const { modals } = useMst();

    const handleClose = (): void => {
      modals.timedAuction.close();
    };

    return (
      <Modal
        isVisible={!!modals.timedAuction.isOpen}
        handleCancel={handleClose}
        destroyOnClose
        className="m-timed-auction"
        closeIcon
        width={380}
      >
        <div className="m-timed-auction__content">
          <div className="m-timed-auction__title text-xl text-grad text-bold">Auction</div>
          <div className="m-timed-auction__subtitle text text-bold text-gray-l">
            Enter new price. Your NFT will be pushed in top of marketplace.
          </div>
          <SaleTimedAuctionForm tokenId={tokenId} handleSetTokenData={handleSetTokenData} />
        </div>
      </Modal>
    );
  },
);
export default TimedAuctionModal;
