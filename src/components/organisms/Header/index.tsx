import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { observer } from 'mobx-react-lite';

import LogoImg from '../../../assets/img/icons/logo.svg';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { BurgerMenu, Search, UserPreview } from '../index';

import './Header.scss';

const Header: React.FC = observer(() => {
  const { modals, user } = useMst();
  const location = useLocation();
  const walletConnector = useWalletConnectorContext();

  const connectWallet = (): void => {
    if (!localStorage.ddsTerms) {
      modals.terms.open();
    } else {
      walletConnector.connect();
    }
  };

  return (
    <header className="header">
      <div className="row">
        <div className="header__content">
          <div className="header__box">
            <Link to="/">
              <img src={LogoImg} alt="dds" className="header__logo" />
            </Link>
            <div className="header__nav">
              <NavLink exact to="/" className="header__nav-item">
                <NavHashLink to="/#explore" smooth className="text-gray text-bold">
                  Explore
                </NavHashLink>
              </NavLink>
              {user.address ? (
                <NavLink
                  exact
                  to={`/user/${user.id}?tab=collectibles`}
                  className="header__nav-item text-bold"
                >
                  My items
                </NavLink>
              ) : (
                ''
              )}
              <NavLink
                exact
                to={`/user/${user.id}?tab=following`}
                className="header__nav-item text-bold"
              >
                Following
              </NavLink>
              <NavLink exact to="/activity" className="header__nav-item text-bold">
                Activity
              </NavLink>
              {/*
              <NavLink exact to="/overview" className="header__nav-item text-bold">
                How it works
              </NavLink> */}
            </div>
          </div>
          <div className="header__box">
            {location.pathname !== '/' ? (
              <Search
                placeholder="Search items, collections, and accounts"
                className="header__search"
              />
            ) : (
              ''
            )}
            {user.address ? (
              <>
                <Button link="/create" linkClassName="header__btn">
                  Create
                </Button>
                <UserPreview />
              </>
            ) : (
              <Button colorScheme="outline" onClick={connectWallet} className="header__btn">
                Connect wallet
              </Button>
            )}
          </div>
        </div>
        <BurgerMenu className="header-mobile__content" />
      </div>
    </header>
  );
});

export default Header;
