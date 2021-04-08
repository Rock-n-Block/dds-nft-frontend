import React from 'react';
import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';

import { UserMini } from '../../atoms';

import './HotCollectionCard.scss';

export interface IHotCollectionCard {
  tokens: string[];
  user: {
    img: string;
    name: string;
  };
}

const HotCollectionCard: React.FC<IHotCollectionCard> = ({ tokens, user }) => {
  return (
    <div className="hot-col-card">
      <Link to="/" className="hot-col-card__box">
        {new Array(6).fill(0).map((item, index) => {
          if (tokens[index]) {
            return (
              <div key={nextId()} className="hot-col-card__box-img">
                <img src={tokens[index]} alt="token" />
              </div>
            );
          }
          return <div key={nextId()} className="hot-col-card__box-img-empty" />;
        })}
      </Link>
      <UserMini
        img={user.img}
        topText={<span className="text-upper text-gray text-sm">By</span>}
        bottomText={<span className="text-purple-l">{user.name}</span>}
      />
    </div>
  );
};

export default HotCollectionCard;