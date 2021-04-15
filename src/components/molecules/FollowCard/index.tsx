import React from 'react';
import nextId from 'react-id-generator';

import { Button } from '../../atoms';

import './FollowCard.scss';

export interface IFollowCard {
  name: string;
  followers: number;
  img: string;
  tokens?: Array<string>;
}

const FollowCard: React.FC<IFollowCard> = ({ tokens, img, followers, name }) => {
  return (
    <div className="follow-card ">
      <img src={img} className="follow-card__avatar" alt={`${name} avatar`} />
      <div className="follow-card__info">
        <div className="follow-card__info-text">
          <p className="follow-card__info-followers text text-gray text-sm text-bold text-upper">
            {followers} followers
          </p>
          <h3 className="follow-card__info-name text-purple-l text-md text-bold">{name}</h3>
        </div>
        <Button colorScheme="purple" className="follow-card__info__follow-btn">
          <span className="text text-bold">Follow</span>
        </Button>
      </div>
      <div className="follow-card__tokens">
        {tokens ? (
          tokens.map((token) => (
            <img className="follow-card__tokens__token" src={token} alt="token" key={nextId()} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default FollowCard;
