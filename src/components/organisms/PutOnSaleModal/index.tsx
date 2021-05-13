import React from 'react';
import { observer } from 'mobx-react-lite';

import AuctionImg from '../../../assets/img/icons/auction.svg';
import SaleImg from '../../../assets/img/icons/sale.svg';
import { useMst } from '../../../store/store';
import { Modal } from '../../molecules';

import './PutOnSaleModal.scss';

const PutOnSaleModal: React.FC = observer(() => {
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.putOnSale.close();
  };

  return (
    <Modal
      isVisible={!!modals.putOnSale.isOpen}
      handleCancel={handleClose}
      className="m-put-on-sale"
      closeIcon
    >
      <div className="m-put-on-sale__content">
        <div className="m-put-on-sale__title text-xl text-grad text-bold">Put on sale</div>
        <div className="m-put-on-sale__subtitle text text-bold text-gray-l">Choose sale type</div>
        <div className="m-put-on-sale__box">
          <div className="m-put-on-sale__item box-shadow">
            <div className="m-put-on-sale__box-img">
              <img src={SaleImg} alt="Fixed price" />
            </div>
            <div className="m-put-on-sale__item-text text-bold">Fixed price</div>
          </div>
          <div className="m-put-on-sale__item box-shadow">
            <div className="m-put-on-sale__box-img">
              <img src={AuctionImg} alt="Unlimited auction" />
            </div>
            <div className="m-put-on-sale__item-text text-bold">Unlimited auction</div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default PutOnSaleModal;
