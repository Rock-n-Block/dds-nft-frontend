import React from 'react';
import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';

import { UserMini } from '../../atoms';

import './HotCollectionCard.scss';

export interface IHotCollectionCard {
  tokens: string[];
  name: string;
  id: number;
  user: {
    id: string | number;
    avatar: string;
    name: string;
  };
  notDisplayUser?: boolean;
}

const HotCollectionCard: React.FC<IHotCollectionCard> = ({
  tokens,
  name,
  id,
  user,
  notDisplayUser = false,
}) => {
  return (
    <div className="hot-col-card">
      <Link to={`/collections/${id}`} className="hot-col-card__box">
        {new Array(6).fill(0).map((item, index) => {
          if (tokens[index]) {
            return (
              <div key={nextId()} className="hot-col-card__box-img">
                <img src={`https://${tokens[index]}`} alt="token" />
              </div>
            );
          }
          return <div key={nextId()} className="hot-col-card__box-img-empty" />;
        })}
      </Link>
      <div className="hot-col-card__bot">
        <Link to={`/collections/${id}`}>
          <span className="text-bold text-grad">{name}</span>
        </Link>
        {notDisplayUser ? (
          <></>
        ) : (
          <UserMini
            img={user.avatar}
            id={user?.id}
            topText={<span className="text-upper text-gray text-sm text-regular">By</span>}
            bottomText={<span className="text-purple-l">{user.name}</span>}
          />
        )}
      </div>
    </div>
  );
};

export default HotCollectionCard;
