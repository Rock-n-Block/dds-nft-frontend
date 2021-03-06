import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    if (user.address) {
      walletConnector.metamaskService.getEthBalance().then((data: any) => {
        user.setBalance(
          new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10),
          'eth',
        );
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
    }
  }, [user, walletConnector.metamaskService]);
  return (
    <div className="u-popover">
      <UserWallet color="black" className="u-popover__copy" address={user.address} />
      <div className="u-popover__swap">
        <div className="u-popover__swap-content">
          <div className="u-popover__swap-info">
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
            <Button colorScheme="purple" className="u-popover__swap-img" onClick={handleOpenModal}>
              <img src={SwapImg} alt="swap" />
            </Button>
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
          <ConvertModal />
        </div>
        <Button colorScheme="white" size="smd">
          <a href="https://zerion.io/" target="_blank" rel="noreferrer noopener" className="text">
            Manage funds in Zerion
          </a>
        </Button>
      </div>
      <div className="u-popover__nav">
        <Link
          to={`/user/${user.id}?tab=collectibles`}
          className="u-popover__nav-item text-bold text-black"
        >
          My items
        </Link>
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
