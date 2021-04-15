import React, { useState } from 'react';
import './BurgerMenu.scss';
import { Link, NavLink } from 'react-router-dom';
import LogoImg from '../../../assets/img/icons/logo.svg';
import { ReactComponent as Menu } from '../../../assets/img/icons/menu.svg';
import classNames from 'classnames';
import { Button } from '../../atoms';
import { Footer } from '../index';

interface BurgerMenuProps {
  className: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ className }) => {
  const [isMenuItemsVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(!isMenuItemsVisible);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };
  //
  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  return (
    <div className={classNames(className, 'header-mobile')}>
      <Link to="/">
        <img src={LogoImg} alt="dds" className="header-mobile__logo" />
      </Link>
      <Button colorScheme="clear" onClick={showModal} className="header-mobile__menu">
        <Menu />
      </Button>
      <div className={isMenuItemsVisible ? 'header-mobile__menu-items' : 'visually-hidden'}>
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
        <Footer />
      </div>
    </div>
  );
};
/* <nav className="header__nav">
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
        </nav>
        */
export default BurgerMenu;
