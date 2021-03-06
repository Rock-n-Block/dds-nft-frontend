import React from 'react';
import { observer } from 'mobx-react-lite';

import SaleFixedPriceForm from '../../../forms/SaleFixedPrice/container';
import { useMst } from '../../../store/store';
import { Modal } from '../index';

import './FixedPriceModal.scss';

interface IFixedPriceModal {
  tokenId: number;
  handleSetTokenData: (data: any) => void;
  handleApproveNft: () => {};
}

const FixedPriceModal: React.FC<IFixedPriceModal> = observer(
  ({ tokenId, handleSetTokenData, handleApproveNft }) => {
    const { modals } = useMst();

    const handleClose = (): void => {
      modals.fixedPrice.close();
    };

    return (
      <Modal
        isVisible={!!modals.fixedPrice.isOpen}
        handleCancel={handleClose}
        destroyOnClose
        className="m-fixed-price"
        closeIcon
        width={380}
      >
        <div className="m-fixed-price__content ">
          <div className="m-fixed-price__title text-xl text-grad text-bold">Fixed price</div>
          <div className="m-fixed-price__subtitle text text-bold text-gray-l">
            Enter new price. Your NFT will be pushed in top of marketplace.
          </div>
          <SaleFixedPriceForm
            fee={modals.fixedPrice.fee}
            totalSupply={modals.fixedPrice.totalSupply}
            tokenId={tokenId}
            handleSetTokenData={handleSetTokenData}
            handleApproveNft={handleApproveNft}
          />
        </div>
      </Modal>
    );
  },
);
export default FixedPriceModal;
