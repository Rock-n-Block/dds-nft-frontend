import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import LogoImg from '../../../assets/img/icons/logo.svg';
import { ReactComponent as Menu } from '../../../assets/img/icons/menu.svg';
import { ReactComponent as DiskImg } from '../../../assets/img/icons/social/disk.svg';
import { ReactComponent as FbImg } from '../../../assets/img/icons/social/fb.svg';
import { ReactComponent as InstImg } from '../../../assets/img/icons/social/inst.svg';
import { ReactComponent as TwImg } from '../../../assets/img/icons/social/tw.svg';
import { ReactComponent as YoutubeImg } from '../../../assets/img/icons/social/youtube.svg';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { Search, UserPreview } from '../index';

import './BurgerMenu.scss';

interface BurgerMenuProps {
  className: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = observer(({ className }) => {
  const { modals, user } = useMst();
  const walletConnector = useWalletConnectorContext();
  const [isMenuItemsVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(!isMenuItemsVisible);
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
        <UserPreview />
      </div>
      <Button colorScheme="clear" onClick={showModal} className="header-mobile__menu">
        <Menu />
      </Button>
      <div className={isMenuItemsVisible ? 'header-mobile__menu-items' : 'visually-hidden'}>
        <Search placeholder="Search items" className="header-mobile__search" />
        <nav className="header-mobile__nav">
          <NavLink exact to="/" className="header-mobile__nav-item text-xl text-bold text-grad">
            Explore
          </NavLink>
          <NavLink exact to="/1" className="header-mobile__nav-item text-xl text-bold text-grad">
            How it works
          </NavLink>
          <NavLink exact to="/2" className="header-mobile__nav-item text-xl text-bold text-grad">
            Create
          </NavLink>
          <NavLink exact to="/3" className="header-mobile__nav-item text-xl text-bold text-grad">
            Support
          </NavLink>
        </nav>
        <section className="footer">
          <div className="footer__box">
            <div className="footer__nav">
              <div className="footer__nav-box">
                <div className="text-smd text-bold text-purple">Community</div>
                <Link to="/" className="text-smd text-bold text-black footer__nav-item">
                  DDS Token
                </Link>
                <Link to="/" className="text-smd text-bold text-black footer__nav-item">
                  Discussion
                </Link>
                <Link to="/" className="text-smd text-bold text-black footer__nav-item">
                  Voting
                </Link>
                <Link to="/" className="text-smd text-bold text-black footer__nav-item">
                  Suggest feature
                </Link>
              </div>
            </div>
          </div>
          {user.address ? (
            <div className="footer__btns flex-center">
              <Button colorScheme="gradient" size="md" link="/create">
                Create
              </Button>
            </div>
          ) : (
            <div className="footer__btns ">
              <Button colorScheme="gradient" size="md" link="/create">
                Create
              </Button>
              <Button
                colorScheme="purple"
                size="md"
                onClick={connectWallet}
                className="header__btn"
              >
                Connect wallet
              </Button>
            </div>
          )}
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
        </section>
      </div>
    </div>
  );
});
export default BurgerMenu;
