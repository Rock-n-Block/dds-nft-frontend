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
        <p className="text text-gray text-sm text-bold follow-card__info-followers text-upper">
          {followers} followers
        </p>
        <h3 className="text text-purple-l text-md text-bold follow-card__info-name">{name}</h3>
        <Button colorScheme="purple" className="follow-card__info__follow-btn">
          Follow
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
