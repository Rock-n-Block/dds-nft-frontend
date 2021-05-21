import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { ReactComponent as ShareLinkSvg } from '../../../assets/img/icons/share-link.svg';
import { UserMini } from '../../atoms';

import './ActivityCard.scss';

export interface IActivityCard {
  tokenId: string | number;
  tokenImg: string;
  tokenName: string;
  method: 'like' | 'follow' | 'listing' | 'buy' | 'sale' | 'transfer' | 'burn' | 'bid' | 'mint';
  firstUser: IUser;
  secondUser?: IUser | null;
  date: string | Date;
  price?: string | number;
}
enum activityType {
  like = 'Likes',
  follow = 'Followings',
  listing = 'Listings',
  buy = 'Purchases',
  sale = 'Sales',
  transfer = 'Transfers',
  burn = 'Burns',
  bid = 'Bids',
  mint = 'Mint',
}

interface IUser {
  id: string | null;
  img: string | null;
  address: string | null;
  name?: string | null;
}

const ActivityCard: React.FC<IActivityCard> = ({
  tokenId,
  tokenImg,
  tokenName,
  method,
  firstUser,
  secondUser,
  date,
  price,
}) => {
  let token;
  let firstText = <></>;
  let secondText = <></>;
  if (method === 'follow') {
    token = <></>;
  } else
    token = (
      <Link to={`/token/${tokenId}`} className="activity-card__header">
        <img src={`https://${tokenImg}`} alt="token" className="activity-card__header-left" />
        <div className="activity-card__header-right">
          <h3 className="activity-card__header__title text-bold text">{tokenName}</h3>
          {price ? (
            <span className="activity-card__header__cost text text-grad text-bold">
              {price} WETH
            </span>
          ) : (
            <></>
          )}
        </div>
      </Link>
    );
  switch (method) {
    case 'listing':
      firstText = <span className="text-gray text text-bold">minted by</span>;
      break;
    case 'mint':
      firstText = <span className="text-gray text text-bold">minted by</span>;
      secondText = <span className="text-gray text text-bold">minted by</span>;
      break;
    case 'buy':
      firstText = <span className="text-gray text text-bold">purchased by</span>;
      secondText = <span className="text-gray text text-bold">from</span>;
      break;
    case 'sale':
      firstText = <span className="text-gray text text-bold">purchased by</span>;
      secondText = <span className="text-gray text text-bold">from</span>;
      break;
    case 'follow':
      firstText = <span className="text-gray text text-bold">User</span>;
      secondText = <span className="text-gray text text-bold">followed to</span>;
      break;
    case 'transfer':
      firstText = <span className="text-gray text text-bold">transfer from</span>;
      secondText = <span className="text-gray text text-bold">to</span>;
      break;
    case 'burn':
      firstText = <span className="text-gray text text-bold">burned by</span>;
      break;
    case 'bid':
      firstText = <span className="text-gray text text-bold">offered</span>;
      break;
    case 'like':
      firstText = <span className="text-gray text text-bold">liked by</span>;
      break;
    default:
      firstText = <></>;
      secondText = <></>;
      break;
  }
  return (
    <div className="activity-card">
      <div className="activity-card__badge activity-badge text text-purple text-bold">
        {activityType[method]}
      </div>
      {token}
      <div className="activity-card__body">
        {firstUser?.id && (
          <UserMini
            id={firstUser.id}
            img={firstUser?.img}
            topText={firstText}
            bottomText={
              <span className="text-black text-bold">{firstUser?.name || firstUser?.address}</span>
            }
          />
        )}
        {secondUser?.id && (
          <UserMini
            id={secondUser.id}
            img={secondUser?.img}
            topText={secondText}
            bottomText={
              <span className="text-black text-bold">
                {secondUser?.name || secondUser?.address}
              </span>
            }
          />
        )}
      </div>
      <div className="activity-card__footer">
        <p className="activity-card__time text text-gray text-sm text-regular text-upper">
          {moment(date).fromNow()}
        </p>
        {method !== 'follow' && (
          <Link to={`/token/${tokenId}`} className="activity-card__share">
            <ShareLinkSvg />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
