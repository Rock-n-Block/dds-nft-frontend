import React from 'react';
import nextId from 'react-id-generator';

import { UserMini } from '../../atoms';
import { IUserMini } from '../../atoms/UserMini';

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
            key={nextId()}
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
