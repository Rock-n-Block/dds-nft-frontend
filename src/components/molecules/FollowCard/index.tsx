import React, { useState } from 'react';
import nextId from 'react-id-generator';

import { Button } from '../../atoms';

import './FollowCard.scss';
import { Link } from 'react-router-dom';
import { userApi } from '../../../services/api';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../../store/store';

export interface IFollowCard {
  name: string;
  id: string | number;
  followersCount: number;
  avatar: string;
  follows: Array<any>;
  tokens?: Array<IToken>;
}
interface IToken {
  id: string | number;
  media: string;
}
const FollowCard: React.FC<IFollowCard> = observer(
  ({ tokens, avatar, follows, followersCount, name, id }) => {
    const { user } = useMst();
    const self = user.id === id;
    const [isFollows, setIsFollows] = useState<boolean>(
      !!follows.find((follower: any) => follower.id === id),
    );

    const handleUnfollow = () => {
      userApi
        .unfollow({ id: +(id ?? 0) })
        .then(() => {
          setIsFollows(false);
        })
        .catch((err) => {
          console.log(err, 'unfollow user');
        });
    };
    const handleFollow = () => {
      userApi
        .follow({ id: +(id ?? 0) })
        .then(() => {
          setIsFollows(true);
        })
        .catch((err) => {
          console.log(err, 'follow user');
        });
    };
    return (
      <div className="follow-card ">
        <Link to={`/user/${id}`}>
          <img src={`https://${avatar}`} className="follow-card__avatar" alt={`${name} avatar`} />
        </Link>
        <div className="follow-card__info">
          <div className="follow-card__info-text">
            <Link to={`/user/${id}?tab=follower`}>
              <p className="follow-card__info-followers text text-gray text-sm text-bold text-upper">
                {followersCount} followers
              </p>
            </Link>
            <Link to={`/user/${id}`}>
              <h3 className="follow-card__info-name text-purple-l text-md text-bold">{name}</h3>
            </Link>
          </div>
          {isFollows && !self ? (
            <Button
              colorScheme="outline"
              className="follow-card__info__follow-btn"
              onClick={handleUnfollow}
            >
              Unfollow
            </Button>
          ) : (
            <></>
          )}
          {!isFollows && !self ? (
            <Button
              colorScheme="purple"
              className="follow-card__info__follow-btn"
              onClick={handleFollow}
            >
              <span className="text text-bold">Follow</span>
            </Button>
          ) : (
            <></>
          )}
        </div>
        <div className="follow-card__tokens">
          {tokens ? (
            tokens.map((token) => (
              <Link
                to={`/token/${token.id}`}
                className="follow-card__token-container"
                key={nextId()}
              >
                <img
                  className="follow-card__token"
                  src={`https://${token.media}`}
                  alt="token"
                  key={nextId()}
                />
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  },
);
export default FollowCard;
