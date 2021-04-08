import React from 'react';
import {UserMini} from "../../atoms";

export interface IActivityCard {
  img: string;
  title: string;
  mintedUser?: IUser;
  purchasedUser?: IUser;
  soldUser?: IUser;
  currency: number;
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
                                                 mintedUser,
                                                 purchasedUser,
                                                 soldUser,
                                                 currency,
                                                 activityType
                                               }) => {
  return (
    <div className="activity-card">
      <div className="activity-card__badge">{activityType}</div>
      <div className="activity-card__picture">
        <img src={img} alt="token"/>
        <h3>{title}</h3>
      </div>
      <div className="activity-card__by">
        {mintedUser ? (
          <UserMini
            img={mintedUser.img}
            topText={<span className="text-upper text-gray text-sm">minted by</span>}
            bottomText={<span className="text-black">{mintedUser.name}</span>}
          />
        ) : (
          purchasedUser && soldUser ? (
            <>
              <UserMini
                img={purchasedUser?.img}
                topText={<span className="text-upper text-gray text-sm">minted by</span>}
                bottomText={<span className="text-black">{purchasedUser.name}</span>}
              />
              <UserMini
                img={soldUser.img}
                topText={<span className="text-upper text-gray text-sm">minted by</span>}
                bottomText={<span className="text-black">{soldUser.name}</span>}
              />
            </>) : (<></>)
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
