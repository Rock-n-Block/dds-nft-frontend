import React from 'react';
import { observer } from 'mobx-react-lite';
import { Scrollbar } from 'react-scrollbars-custom';
import BigNumber from 'bignumber.js/bignumber';

import { Modal } from '../../molecules';
import { UserMini, Button } from '../../atoms';
import { useMst } from '../../../store/store';
import { ISeller } from '../../../pages/Token';

import './MultiBuyModal.scss';

interface IMultiBuyModal {
  sellers: ISeller[];
  token: {
    name: string;
    available: number;
  };
  collection: {
    name: string;
  };
}

const MultiBuyModal: React.FC<IMultiBuyModal> = observer(({ sellers, token, collection }) => {
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.multibuy.close();
  };

  const handleBuy = (sellerId: number): void => {
    modals.checkout.open({
      token,
      collectionName: collection.name,
      sellerId,
    });
  };

  return (
    <Modal
      isVisible={modals.multibuy.isOpen}
      className="m-multibuy"
      handleCancel={handleClose}
      width={380}
      destroyOnClose
      closeIcon
    >
      <div className="m-multibuy__content">
        <div className="m-multibuy__title">
          <span className="text-xl text-grad text-bold ">Owners</span>
          <span className="text-gray text">{sellers ? sellers.length : 0}</span>
        </div>
        <div className="m-multibuy__box">
          <Scrollbar
            className="navbar__scroll"
            style={{
              width: '100%',
              height: sellers.length > 8 ? '480px' : `${sellers.length * 61}px`,
            }}
          >
            {sellers && sellers.length
              ? sellers.map((seller: ISeller) => (
                  <div className="m-multibuy__item">
                    <UserMini
                      img={seller.avatar}
                      topText={<span className="text-gray text-upper">{seller.name}</span>}
                      bottomText={
                        <span className="text-purple">
                          {seller.quantity} {seller.quantity > 1 ? 'Tokens' : 'Token'}
                        </span>
                      }
                      id={seller.id}
                      imgSize="lg"
                    />
                    <div className="m-multibuy__item-wrapper">
                      <div className="m-multibuy__item-price">
                        <div className="m-multibuy__item-price-quantity text-grad text-bold">
                          {new BigNumber(seller.price)
                            .dividedBy(new BigNumber(10).pow(18))
                            .toFixed()}
                        </div>
                        <div className="m-multibuy__item-price-currency text-upper text-sm text-gray">
                          weth
                        </div>
                      </div>
                      <Button colorScheme="outline" size="sm" onClick={() => handleBuy(seller.id)}>
                        Buy
                      </Button>
                    </div>
                  </div>
                ))
              : ''}
          </Scrollbar>
        </div>
      </div>
    </Modal>
  );
});

export default MultiBuyModal;
