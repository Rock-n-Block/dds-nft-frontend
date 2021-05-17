import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from '../index';
import { useMst } from '../../../store/store';
import './TimedAuctionModal.scss';
import SaleTimedAuctionForm from '../../../forms/SaleTimedAuction/container';

const TimedAuctionModal: React.FC = observer(() => {
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.timedAuction.close();
  };

  return (
    <Modal
      isVisible={!!modals.timedAuction.isOpen}
      handleCancel={handleClose}
      className="m-timed-auction"
      closeIcon
      width={380}
    >
      <div className="m-timed-auction__content">
        <div className="m-timed-auction__title text-xl text-grad text-bold">Timed auction</div>
        <div className="m-timed-auction__subtitle text text-bold text-gray-l">
          Enter new price. Your NFT will be pushed in top of marketplace.
        </div>
        <SaleTimedAuctionForm />
      </div>
    </Modal>
  );
});
export default TimedAuctionModal;
