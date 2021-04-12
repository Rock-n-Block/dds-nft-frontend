import React from 'react';
import nextId from 'react-id-generator';

import UserMini, { IUserMini } from '../../atoms/UserMini';

interface TokenBidsProps {
  bids: Array<IUserMini>;
}

const TokenBids: React.FC<TokenBidsProps> = ({ bids }) => {
  return (
    <div className="token-tab token-info">
      {bids ? (
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
        <></>
      )}
    </div>
  );
};
export default TokenBids;
