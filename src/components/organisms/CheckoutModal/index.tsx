import React from 'react';
import { observer } from 'mobx-react-lite';

import { CheckoutForm } from '../../../forms';
import { useMst } from '../../../store/store';
import { Modal } from '../../molecules';

import './CheckoutModal.scss';

interface ICheckoutModal {
  handleBuy: (quantity: number) => {};
  isLoading: boolean;
}

const ChecoutModal: React.FC<ICheckoutModal> = observer(({ handleBuy, isLoading }) => {
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.checkout.close();
  };

  return (
    <Modal
      isVisible={modals.checkout.getIsOpen}
      className="m-checkout"
      handleCancel={handleClose}
      width={380}
      destroyOnClose
      closeIcon
    >
      <div className="m-checkout__content">
        <div className="text-xl text-grad text-bold m-checkout__title">Checkout</div>
        <div className="m-checkout__subtitle text-gray text-bold">
          You are about to purchase{' '}
          <span className="text-purple-l">{modals.checkout.token.name}</span> from{' '}
          <span className="text-purple-l">{modals.checkout.collectionName}</span>
        </div>
        <CheckoutForm
          available={modals.checkout.token.available}
          handleBuy={handleBuy}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
});

export default ChecoutModal;
