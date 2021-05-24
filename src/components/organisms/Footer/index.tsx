import React from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

import ArrowImg from '../../../assets/img/icons/form-arrow.svg';
import LogoImg from '../../../assets/img/icons/logo-mini.svg';
import { ReactComponent as DiskImg } from '../../../assets/img/icons/social/disk.svg';
import { ReactComponent as FbImg } from '../../../assets/img/icons/social/fb.svg';
import { ReactComponent as InstImg } from '../../../assets/img/icons/social/inst.svg';
import { ReactComponent as TwImg } from '../../../assets/img/icons/social/tw.svg';
import { ReactComponent as YoutubeImg } from '../../../assets/img/icons/social/youtube.svg';
// import { SubscribeNews } from '../../../forms';

import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="footer__box">
          {/*
          <div className="footer__sub">
            <div className="footer__sub-title text-bold text-lg">Subscribe to our news</div>
            <SubscribeNews />
          </div> */}
          <div className="footer__nav">
            <NavHashLink
              to="/#explore"
              smooth
              className="text-smd text-bold text-black footer__nav-item"
            >
              Explore
            </NavHashLink>
            {/* <Link to="/" className="text-smd text-bold text-black footer__nav-item">
                How it works
              </Link> */}
            <Link to="/create" className="text-smd text-bold text-black footer__nav-item">
              Create
            </Link>
            <Link to="/feedback" className="text-smd text-bold text-black footer__nav-item">
              Support
            </Link>
            {/* <div className="footer__nav-box">
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
            </div> */}
          </div>
          <div className="footer__wrapper">
            <NavHashLink to="#top" smooth>
              <div className="footer__top">
                <img src={ArrowImg} alt="" />
              </div>
            </NavHashLink>
          </div>
        </div>
        <div className="footer__box footer__box-bottom">
          <div className="footer__logo">
            <img src={LogoImg} alt="" />
            <div className="footer__copyright text-bold">
              Copyright © 2021. DDS. All rights reserved.
            </div>
          </div>
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
      </div>
    </footer>
  );
};

export default Footer;
