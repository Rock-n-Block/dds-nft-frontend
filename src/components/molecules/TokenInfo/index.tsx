import React from 'react';

import { UserMini } from '../../atoms';

import './TokenInfo.scss';

interface TokenInfoProps {
  owners: IUser[];
  artist: IUser;
  collection: { col: IUser; standart: string };
  royalty: string | number;
}

interface IUser {
  id: number;
  avatar: string;
  name: string;
}
const TokenInfo: React.FC<TokenInfoProps> = ({ owners, artist, collection, royalty }) => {
  return (
    <div className="token-tab token-info">
      {owners && owners.length
        ? owners.map((owner) => (
            <UserMini
              img={owner?.avatar}
              key={owner?.id}
              id={owner?.id}
              imgSize="lg"
              topText={
                <span className="text text-gray text-sm text-upper text-regular">owner</span>
              }
              bottomText={
                <span className="text text-purple-l text-smd text-bold">{owner?.name}</span>
              }
            />
          ))
        : ''}
      <UserMini
        img={artist?.avatar}
        id={artist?.id}
        imgSize="lg"
        topText={<span className="text text-gray text-sm text-upper text-regular">artist</span>}
        bottomText={<span className="text text-purple-l text-smd text-bold">{artist?.name}</span>}
      />
      <div className="token-info__warning text text-purple-d text-bold ">
        {royalty ?? 0}% of sales will go to creator
      </div>
      <UserMini
        img={collection.col?.avatar}
        id={collection.col?.id}
        imgSize="lg"
        isCheck
        topText={
          <span className="text text-gray text-sm text-upper text-regular">
            Collection {collection.standart}
          </span>
        }
        bottomText={
          <span className="text text-purple-l text-smd text-bold">{collection.col?.name}</span>
        }
      />
    </div>
  );
};
export default TokenInfo;
