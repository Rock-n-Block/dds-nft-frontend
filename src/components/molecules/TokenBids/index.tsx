import React from 'react';
import nextId from 'react-id-generator';

import BellImg from '../../../assets/img/icons/bell-p.svg';
import { IBid } from '../../../pages/Token';
import UserMini from '../../atoms/UserMini';

import './TokenBids.scss';

interface TokenBidsProps {
  bids: Array<IBid>;
}

const TokenBids: React.FC<TokenBidsProps> = ({ bids }) => {
  return (
    <div className="token-tab token-info token-bids">
      {bids.length ? (
        bids.map((bid) => (
          <UserMini
            img={bid.bidderavatar}
            key={nextId()}
            imgSize="lg"
            id={bid.bidderid}
            topText={<span className="text-bold text-black">{`${bid.amount} WETH`}</span>}
            bottomText={
              <span className="">
                <span className="text-gray">BY</span>
                <span className="text-purple-l text-smd text-bold">{` ${bid.bidder}`}</span>
              </span>
            }
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
