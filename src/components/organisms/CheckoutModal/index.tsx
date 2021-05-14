import React from 'react';
import { observer } from 'mobx-react-lite';

import { Modal } from '../../molecules';
import { useMst } from '../../../store/store';
import { CheckoutForm } from '../../../forms';

import './CheckoutModal.scss';

interface ICheckoutModal {
  token: {
    name: string;
    available: number;
  };
  collection: {
    name: string;
  };
  handleBuy: (quantity: number) => {};
}

const ChecoutModal: React.FC<ICheckoutModal> = observer(({ token, collection, handleBuy }) => {
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.checkout.close();
  };

  return (
    <Modal
      isVisible={modals.checkout.isOpen}
      className="m-checkout"
      handleCancel={handleClose}
      width={380}
      destroyOnClose
      closeIcon
    >
      <div className="m-checkout__content">
        <div className="text-xl text-grad text-bold m-checkout__title">Checkout</div>
        <div className="m-checkout__subtitle text-gray text-bold">
          You are about to purchase <span className="text-purple-l">{token.name}</span> from{' '}
          <span className="text-purple-l">{collection.name}</span>
        </div>
        <CheckoutForm available={token.available} handleBuy={handleBuy} />
      </div>
    </Modal>
  );
});

export default ChecoutModal;
