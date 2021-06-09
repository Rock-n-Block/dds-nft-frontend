import React from 'react';
import { observer } from 'mobx-react-lite';
// import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';

import { Modal } from '../../molecules';
import { UserMini, Button } from '../../atoms';
import { useMst } from '../../../store/store';
import SuccessImg from '../../../assets/img/icons/success.svg';
import CancelImg from '../../../assets/img/icons/cancel.svg';

import './CheckAvailability.scss';

interface ICheckAvailability {
  isLoading: boolean;
  handleEndAuction: () => void;
  handleGetTokenData: () => void;
}

const CheckAvailability: React.FC<ICheckAvailability> = observer(
  ({ isLoading, handleEndAuction, handleGetTokenData }) => {
    const { modals } = useMst();

    const handleClose = (): void => {
      modals.checkAvailability.close();
      handleGetTokenData();
    };

    return (
      <Modal
        isVisible={modals.checkAvailability.getIsOpen}
        className="m-check-availability"
        handleCancel={handleClose}
        width={380}
        destroyOnClose
        closeIcon
      >
        <div className="m-check-availability__content">
          {modals.checkAvailability.isAvailable ? (
            <img className="m-check-availability__img" src={SuccessImg} alt="success" />
          ) : (
            <img className="m-check-availability__img" src={CancelImg} alt="success" />
          )}
          <div className="m-check-availability__title text-xl text-bold">
            {modals.checkAvailability.isAvailable ? (
              <span className="text-grad">Availability of funds is confirmed</span>
            ) : (
              <span>
                <span className="text-grad">Availability of funds is</span>{' '}
                <span className="text-black">not confirmed</span>
              </span>
            )}
          </div>
          <div className="m-check-availability__box box-gray">
            <UserMini
              imgSize="lg"
              id={modals.checkAvailability.user.id}
              img={modals.checkAvailability.user.avatar}
              hideOverflowBottom={false}
              topText={
                <span
                  className={cn('text-sm text-upper text-bold text-black', {
                    'text-gray': !modals.checkAvailability.isAvailable,
                  })}
                >
                  Highest bid
                </span>
              }
              centerText={
                <span>
                  <span className="text-gray text-upper text-sm">BY</span>{' '}
                  <span
                    className={cn('text-purple-l text-sm', {
                      'text-gray': !modals.checkAvailability.isAvailable,
                    })}
                  >
                    {modals.checkAvailability.user.name}
                  </span>
                </span>
              }
              bottomText={
                <span
                  className={cn('text-purple-l text-smd text-bold', {
                    'text-gray': !modals.checkAvailability.isAvailable,
                  })}
                >
                  {modals.checkAvailability.amount} WETH
                </span>
              }
            />
          </div>
          {modals.checkAvailability.isAvailable ? (
            <Button
              className="m-check-availability__btn"
              colorScheme="gradient"
              size="md"
              loading={isLoading}
              onClick={handleEndAuction}
            >
              End auction
            </Button>
          ) : (
            <Button
              onClick={handleClose}
              className="m-check-availability__btn"
              colorScheme="gradient"
              size="md"
            >
              Continue auction
            </Button>
          )}
        </div>
      </Modal>
    );
  },
);

export default CheckAvailability;
