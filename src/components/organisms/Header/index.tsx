import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import LogoImg from '../../../assets/img/icons/logo.svg';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import { Button } from '../../atoms';

import './Header.scss';

const Header: React.FC = () => {
  const walletConnector = useWalletConnectorContext();
  // walletConnector.connector.killSession();
  return (
    <header className="header box-shadow">
      <div className="row">
        <div className="header__content">
          <div className="header__box">
            <Link to="/">
              <img src={LogoImg} alt="dds" className="header__logo" />
            </Link>
            <div className="header__nav">
              <NavLink exact to="/" className="header__nav-item text-bold">
                Explore
              </NavLink>
              <NavLink exact to="/1" className="header__nav-item text-bold">
                My items
              </NavLink>
              <NavLink exact to="/2" className="header__nav-item text-bold">
                Following
              </NavLink>
              <NavLink exact to="/3" className="header__nav-item text-bold">
                Activity
              </NavLink>
              <NavLink exact to="/4" className="header__nav-item text-bold">
                How it works
              </NavLink>
            </div>
          </div>
          <div className="header__box">
            <Button link="/create" linkClassName="header__btn">
              Create
            </Button>
            <Button
              colorScheme="outline"
              onClick={walletConnector.web3Provider && walletConnector.web3Provider.connect}
              className="header__btn"
            >
              Connect wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
