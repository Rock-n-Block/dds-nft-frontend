import React from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

import ArrowImg from '../../../assets/img/icons/form-arrow.svg';
import LogoImg from '../../../assets/img/icons/logo-mini.svg';
import TelegramImg from '../../../assets/img/icons/tg-w.svg';

import './Footer.scss';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { useWalletConnectorContext } from '../../../services/walletConnect';

const Footer: React.FC = observer(() => {
  const { user, modals } = useMst();

  const walletConnector = useWalletConnectorContext();

  const connectWallet = (): void => {
    if (!localStorage.ddsTerms) {
      modals.terms.open();
    } else {
      walletConnector.connect();
    }
  };

  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={LogoImg} alt="" />
      </div>
      <NavHashLink to="#top" smooth>
        <div className="footer__top">
          <img src={ArrowImg} alt="" />
        </div>
      </NavHashLink>
      <div className="row footer__row">
        <div className="footer__box">
          <div className="footer__nav">
            <NavHashLink
              to="/#explore"
              smooth
              className="text-smd text-bold text-black footer__nav-item"
            >
              Explore
            </NavHashLink>
            {user.address ? (
              <Link to="/create" className="text-smd text-bold text-black footer__nav-item">
                Create
              </Link>
            ) : (
              <Button colorScheme="clear" onClick={connectWallet} className="footer__nav-item">
                <span className="text-smd text-bold text-black ">Connect wallet</span>
              </Button>
            )}
            <Link to="/feedback" className="text-smd text-bold text-black footer__nav-item">
              Support
            </Link>
          </div>
          <a href="/" target="_blank" className="footer__tg">
            <img src={TelegramImg} alt="" />
          </a>
        </div>
        <div className="footer__box footer__box-bottom">
          <div className="footer__copyright">Copyright © 2021. DDS. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
