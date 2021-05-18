import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
// import { Switch } from 'antd';
import BigNumber from 'bignumber.js/bignumber';
import { observer } from 'mobx-react-lite';

import SwapImg from '../../../assets/img/icons/arrows-swap.svg';
import EthImg from '../../../assets/img/icons/eth.svg';
import { ratesApi } from '../../../services/api';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import { useMst } from '../../../store/store';
import { Button, UserWallet } from '../../atoms';
import { ConvertModal } from '../index';

import './UserPopover.scss';

const UserPopover: React.FC = observer(() => {
  const [currentRate, setCurrentRate] = useState<number>(0);
  const { modals, user } = useMst();
  const walletConnector = useWalletConnectorContext();

  const handleOpenModal = (): void => {
    modals.convert.open();
  };
  const handleDisconnect = (): void => {
    walletConnector.disconnect();
  };
  useEffect(() => {
    walletConnector.metamaskService.getEthBalance().then((data: any) => {
      user.setBalance(new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10), 'eth');
    });
    walletConnector.metamaskService.getWethBalance().then((data: any) => {
      ratesApi.getRates().then((response) => {
        setCurrentRate(response.data.ETH);
      });
      user.setBalance(
        new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10),
        'weth',
      );
    });
  }, [user, walletConnector.metamaskService]);
  return (
    <div className="u-popover">
      <UserWallet className="u-popover__copy" address={user.address} />
      {user.display_name ? (
        <p className="text-purple">{user.display_name}</p>
      ) : (
        <Link to="/profile" className="text-purple">
          Set display name
        </Link>
      )}
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
                    {new BigNumber(user.balance?.eth ?? 0).toFixed(5)} ETH
                  </div>
                  <div className="text-gray u-popover__swap-item-currency">
                    {new BigNumber(user.balance?.eth ?? 0).multipliedBy(currentRate).toFixed(2)} $
                  </div>
                </div>
              </div>
            </div>
            <div className="u-popover__swap-item">
              <div className="u-popover__swap-item-img box-shadow">
                <img src={EthImg} alt="" />
              </div>
              <div className="u-popover__swap-item-content">
                <div className="u-popover__swap-item-title text-purple text-bold">
                  Bidding balance
                </div>
                <div className="u-popover__swap-item-wrapper">
                  <div className="text-bold u-popover__swap-item-currency">
                    {new BigNumber(user.balance?.weth ?? 0).toFixed(5)} WETH
                  </div>
                  <div className="text-gray u-popover__swap-item-currency">
                    {new BigNumber(user.balance?.weth ?? 0).multipliedBy(currentRate).toFixed(2)} $
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button colorScheme="purple" className="u-popover__swap-img" onClick={handleOpenModal}>
            <img src={SwapImg} alt="swap" />
          </Button>
          <ConvertModal />
        </div>
        <Button colorScheme="white" size="smd">
          <div className="text">
            <a href="https://zerion.io/" target="_blank" rel="noreferrer noopener">
              Manage funds in Zerion
            </a>
          </div>
        </Button>
      </div>
      <div className="u-popover__nav">
        <NavHashLink to="/#explore" smooth className="u-popover__nav-item text-bold text-black">
          Explore
        </NavHashLink>
        <Link to="/profile" className="u-popover__nav-item text-bold text-black">
          Edit profile
        </Link>
        {/*
        <div className="u-popover__nav-item text-bold text-black">
          <span>Autoplay</span>
          <Switch />
        </div> */}
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
