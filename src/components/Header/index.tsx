import React from 'react';
import { NavLink } from 'react-router-dom';

import LogoImg from '../../assets/img/icons/logo.svg';
import Button from '../Button/index';

import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="row">
        <div className="header__content">
          <div className="header__box">
            <img src={LogoImg} alt="dds" className="header__logo" />
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
            <Button colorScheme="outline" link="/connect" linkClassName="header__btn">
              Connect wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
