import React from 'react';

import { UserMini } from '../index';
import { IUserMini } from '../UserMini';

import './TokenHistory.scss';

interface TokenHistoryProps {
  history: Array<IUserMini>;
}

const TokenHistory: React.FC<TokenHistoryProps> = ({ history }) => {
  return (
    <div className="token-history">
      {history ? (
        history.map((event) => (
          <UserMini
            className="token-history__event"
            img={event.img}
            imgSize="lg"
            topText={event.topText}
            bottomText={event.bottomText}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default TokenHistory;
