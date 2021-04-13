import React from 'react';

import { ReactComponent as ShareLinkSvg } from '../../../assets/img/icons/share-link.svg';
import { UserMini } from '../../atoms';

import './ActivityCard.scss';

export interface IActivityCard {
  img: string;
  title: string;
  // users: { mintedUser: IUser } | { purchasedUser: IUser; soldUser: IUser };
  firstUser: IUser;
  secondUser?: IUser;
  cost?: number;
  time: number;
  activityType:
    | 'Listing'
    | 'Purchases'
    | 'Sales'
    | 'Transfers'
    | 'Burns'
    | 'Bids'
    | 'Likes'
    | 'Followings';
}

interface IUser {
  img: string;
  name: string;
}

const ActivityCard: React.FC<IActivityCard> = ({
  img,
  title,
  firstUser,
  secondUser,
  cost,
  time,
  activityType,
}) => {
  return (
    <div className="activity-card">
      <div className="activity-card__badge activity-badge text text-purple text-bold">
        {activityType}
      </div>
      <div className="activity-card__header">
        <img src={img} alt="token" className="activity-card__header-left" />
        <div className="activity-card__header-right">
          <h3 className="activity-card__header__title text-bold text">{title}</h3>
          {cost ? (
            <span className="activity-card__header__cost text text-grad text-bold">{cost} ETH</span>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="activity-card__body">
        {secondUser ? (
          <>
            <UserMini
              img={firstUser?.img}
              topText={<span className="text-gray text text-bold">purchased by</span>}
              bottomText={<span className="text-black text-bold">{firstUser?.name}</span>}
            />
            <UserMini
              img={secondUser?.img}
              topText={<span className="text-gray text text-bold">from</span>}
              bottomText={<span className="text-black text-bold">{secondUser?.name}</span>}
            />
          </>
        ) : (
          <UserMini
            img={firstUser?.img}
            topText={<span className="text-gray text text-bold">minted by</span>}
            bottomText={<span className="text-black text-bold text-bold">{firstUser?.name}</span>}
          />
        )}
      </div>
      <div className="activity-card__footer">
        <p className="activity-card__time text text-gray text-sm text-regular text-upper">
          {time} minutes ago
        </p>
        <a href="/" aria-label="Share" className="activity-card__share">
          <ShareLinkSvg />
        </a>
      </div>
    </div>
  );
};

export default ActivityCard;
