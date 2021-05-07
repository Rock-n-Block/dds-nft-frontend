import React from 'react';
import nextId from 'react-id-generator';

import UserMini, { IUserMini } from '../../atoms/UserMini';
import BellImg from '../../../assets/img/icons/bell-p.svg';

import './TokenBids.scss';

interface TokenBidsProps {
  bids: Array<IUserMini>;
}

const TokenBids: React.FC<TokenBidsProps> = ({ bids }) => {
  return (
    <div className="token-tab token-info token-bids">
      {bids.length ? (
        bids.map((bid) => (
          <UserMini
            img={bid.img}
            key={nextId()}
            imgSize="lg"
            topText={bid.topText}
            bottomText={bid.bottomText}
          />
        ))
      ) : (
        <div className="token-bids__empty">
          <div className="token-bids__empty-img">
            <img src={BellImg} alt="bell" />
          </div>
          <div className="token-bids__empty-text">
            You will receive notifications about new bids as they will appear
          </div>
        </div>
      )}
    </div>
  );
};
export default TokenBids;
