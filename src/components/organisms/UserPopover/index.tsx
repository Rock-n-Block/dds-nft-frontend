import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Switch } from 'antd';

import { useMst } from '../../../store/store';
import { UserWallet, Button } from '../../atoms';
import EthImg from '../../../assets/img/icons/eth.svg';
import SwapImg from '../../../assets/img/icons/arrows-swap.svg';

import './UserPopover.scss';
import { ConvertModal } from '../index';
import { ConvertModalProps } from '../ConvertModal';

const balance: ConvertModalProps = {
  pay: { currency: 'ETH' },
  receive: { currency: 'dETH' },
};

const UserPopover: React.FC = observer(() => {
  const { modals, user } = useMst();

  const handleOpenModal = (): void => {
    modals.convert.open();
  };

  const handleDisconnect = (): void => {
    user.disconnect();
  };
  return (
    <div className="u-popover">
      <UserWallet className="u-popover__copy" address={user.address} />
      <Link to="/" className="text-purple">
        Set display name
      </Link>
      <div className="u-popover__swap">
        <div className="u-popover__swap-content">
          <div className="">
            <div className="u-popover__swap-item">
              <div className="u-popover__swap-item-img box-shadow">
                <img src={EthImg} alt="" />
              </div>
              <div className="u-popover__swap-item-content">
                <div className="u-popover__swap-item-title text-purple text-bold">Balance</div>
                <div className="u-popover__swap-item-wrapper">
                  <div className="text-bold u-popover__swap-item-currency">
                    {balance.pay.value ?? 0} {balance.pay.currency}
                  </div>
                  <div className="text-gray u-popover__swap-item-currency">$0.00</div>
                </div>
              </div>
            </div>
            <div className="u-popover__swap-item">
              <div className="u-popover__swap-item-img box-shadow">
                <img src={EthImg} alt="" />
              </div>
              <div className="u-popover__swap-item-content">
                <div className="u-popover__swap-item-title text-purple text-bold">Balance</div>
                <div className="u-popover__swap-item-wrapper">
                  <div className="text-bold u-popover__swap-item-currency">
                    {balance.receive.value ?? 0} {balance.receive.currency}
                  </div>
                  <div className="text-gray u-popover__swap-item-currency">$0.00</div>
                </div>
              </div>
            </div>
          </div>
          <Button colorScheme="purple" className="u-popover__swap-img" onClick={handleOpenModal}>
            <img src={SwapImg} alt="swap" />
          </Button>
          <ConvertModal pay={balance.pay} receive={balance.receive} />
        </div>
        <Button link="/" colorScheme="white" size="smd">
          <div className="text">Manage funds in Zerion</div>
        </Button>
      </div>
      <div className="u-popover__nav">
        <Link to="/" className="u-popover__nav-item text-bold text-black">
          Explore
        </Link>
        <Link to="/profile" className="u-popover__nav-item text-bold text-black">
          Edit profile
        </Link>
        <div className="u-popover__nav-item text-bold text-black">
          <span>Autoplay</span>
          <Switch />
        </div>
        <div
          className="u-popover__nav-item text-bold text-black text-hover"
          onClick={handleDisconnect}
          onKeyDown={handleDisconnect}
          role="button"
          tabIndex={0}
        >
          Disconnect
        </div>
      </div>
    </div>
  );
});

export default UserPopover;
