import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { observer } from 'mobx-react-lite';

import LogoImg from '../../../assets/img/icons/logo.svg';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { BurgerMenu, UserPreview } from '../index';

import './Header.scss';

const Header: React.FC = observer(() => {
  const { modals, user } = useMst();
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
              <NavLink
                exact
                to={`/user/${user.id}?tab=collectibles`}
                className="header__nav-item text-bold"
              >
                My items
              </NavLink>
              <NavLink exact to="/2" className="header__nav-item text-bold">
                Following
              </NavLink>
              <NavLink exact to="/activity" className="header__nav-item text-bold">
                Activity
              </NavLink>
              <NavLink exact to="/overview" className="header__nav-item text-bold">
                How it works
              </NavLink>
            </div>
          </div>
          <div className="header__box">
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
      </div>

      <BurgerMenu className="header-mobile__content" />
    </header>
  );
});

export default Header;
