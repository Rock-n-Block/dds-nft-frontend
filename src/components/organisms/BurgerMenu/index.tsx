import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import LogoImg from '../../../assets/img/icons/logo.svg';
import { ReactComponent as Menu } from '../../../assets/img/icons/menu.svg';
import { ReactComponent as CloseMenu } from '../../../assets/img/icons/close-menu.svg';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { Footer, Search, UserPopover, UserPreview } from '../index';

import './BurgerMenu.scss';

interface BurgerMenuProps {
  className: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = observer(({ className }) => {
  const { modals, user } = useMst();
  const walletConnector = useWalletConnectorContext();
  const [isMenuItemsVisible, setIsMenuItemsVisible] = useState(false);

  const showModal = () => {
    setIsMenuItemsVisible(!isMenuItemsVisible);
  };
  const connectWallet = (): void => {
    if (!localStorage.ddsTerms) {
      modals.terms.open();
    } else {
      walletConnector.connect();
    }
  };
  return (
    <div className={classNames(className, 'header-mobile')}>
      <Link to="/">
        <img src={LogoImg} alt="dds" className="header-mobile__logo" />
      </Link>
      <div className="header-mobile__box">
        {user.address ? <UserPreview onClick={showModal} /> : <></>}
      </div>
      {!user.address && (
        <Button colorScheme="clear" onClick={showModal} className="header-mobile__menu">
          {isMenuItemsVisible ? <CloseMenu /> : <Menu />}
        </Button>
      )}
      <div className={isMenuItemsVisible ? 'header-mobile__menu-items' : 'visually-hidden'}>
        <Search placeholder="Search items" className="header-mobile__search" />
        <nav className="header-mobile__nav">
          <NavLink
            exact
            to="/"
            className="header-mobile__nav-item text-xl text-bold text-grad"
            onClick={() => setIsMenuItemsVisible(false)}
          >
            Explore
          </NavLink>
          <NavLink
            exact
            to={`/user/${user.id}?tab=collectibles`}
            className="header-mobile__nav-item text-xl text-bold text-grad"
            onClick={() => setIsMenuItemsVisible(false)}
          >
            My items
          </NavLink>
          {/* <NavLink exact to="/1" className="header-mobile__nav-item text-xl text-bold text-grad">
            How it works
          </NavLink> */}
          <NavLink
            exact
            to="/feedback"
            className="header-mobile__nav-item text-xl text-bold text-grad"
            onClick={() => setIsMenuItemsVisible(false)}
          >
            Support
          </NavLink>
        </nav>
        {user.address ? (
          <>
            <UserPopover />
          </>
        ) : (
          <></>
        )}
        {user.address ? (
          <div className="header-mobile__btns flex-center">
            <Button
              colorScheme="gradient"
              size="md"
              link="/create"
              onClick={() => setIsMenuItemsVisible(false)}
            >
              Create
            </Button>
          </div>
        ) : (
          <div className="header-mobile__btns">
            <Button colorScheme="purple" size="md" onClick={connectWallet} className="header__btn">
              Connect
            </Button>
          </div>
        )}
        <Footer />
        {/* <section className="footer">
          <div className="footer__box footer__box-bottom">
            <div className="footer__social">
              <a href="/" target="_blank" className="footer__social-item">
                <FbImg />
              </a>
              <a href="/" target="_blank" className="footer__social-item">
                <TwImg />
              </a>
              <a href="/" target="_blank" className="footer__social-item">
                <InstImg />
              </a>
              <a href="/" target="_blank" className="footer__social-item">
                <DiskImg />
              </a>
              <a href="/" target="_blank" className="footer__social-item">
                <YoutubeImg />
              </a>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
});
export default BurgerMenu;
