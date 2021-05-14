import React from 'react';
import nextId from 'react-id-generator';

import { UserMini } from '../../atoms';

import './TokenHistory.scss';
import moment from 'moment';

interface TokenHistoryProps {
  history: Array<IHistoryItem>;
}
export interface IHistoryItem {
  avatar: string;
  date: string | Date;
  id: number;
  method: 'Mint'; // TODO: finalize when get events with other methods
  name: string;
  price?: string;
}

const TokenHistory: React.FC<TokenHistoryProps> = ({ history }) => {
  return (
    <div className="token-history">
      {history ? (
        history.map((event) => (
          <UserMini
            className="token-history__event"
            key={nextId()}
            img={event.avatar}
            imgSize="lg"
            topText={
              <span className="text text-gray text-sm text-upper text-regular">
                {event.method}ed {moment(event.date).fromNow()}
              </span>
            }
            bottomText={
              <span className="text text-gray text-sm text-regular">
                BY <b className="text-bold text-purple-d text-smd">{event.name}</b>
              </span>
            }
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default TokenHistory;
