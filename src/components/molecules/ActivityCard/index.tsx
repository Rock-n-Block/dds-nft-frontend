import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as ShareLinkSvg } from '../../../assets/img/icons/share-link.svg';
import { UserMini } from '../../atoms';

import './ActivityCard.scss';
import moment from 'moment';

export interface IActivityCard {
  tokenId: string | number;
  tokenImg: string;
  tokenName: string;
  method: 'like' | 'follow' | 'listing' | 'purchase' | 'sale' | 'transfer' | 'burn' | 'bid';
  firstUser: IUser;
  secondUser?: IUser | null;
  date: string | Date;
  price?: string | number;
}
enum activityType {
  like = 'Likes',
  follow = 'Followings',
  listing = 'Listings',
  purchase = 'Purchases',
  sale = 'Sales',
  transfer = 'Transfers',
  burn = 'Burns',
  bid = 'Bids',
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
              {price} ETH
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
    case 'purchase':
      firstText = <span className="text-gray text text-bold">purchased by</span>;
      secondText = <span className="text-gray text text-bold">from</span>;
      break;
    case 'sale':
      firstText = <span className="text-gray text text-bold">purchased by</span>;
      secondText = <span className="text-gray text text-bold">from</span>;
      break;
    case 'transfer':
      firstText = <span className="text-gray text text-bold">transferred from</span>;
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
        {method === 'follow' && (
          <>
            <UserMini
              id={firstUser?.id}
              imgSize="lg"
              img={firstUser?.img}
              topText={<span className="text-gray text text-bold">user</span>}
              bottomText={
                <span className="text-black text-bold">{firstUser?.name || firstUser.address}</span>
              }
            />
            <UserMini
              id={secondUser?.id}
              imgSize="lg"
              img={secondUser?.img}
              topText={<span className="text-gray text text-bold">followed to</span>}
              bottomText={
                <span className="text-black text-bold">
                  {secondUser?.name || secondUser?.address}
                </span>
              }
            />
          </>
        )}
        {method !== 'follow' && (
          <UserMini
            id={firstUser?.id}
            img={firstUser?.img}
            topText={firstText}
            bottomText={
              <span className="text-black text-bold text-bold">
                {firstUser?.name || firstUser.address}
              </span>
            }
          />
        )}
        {method !== 'follow' && secondUser?.id && (
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
