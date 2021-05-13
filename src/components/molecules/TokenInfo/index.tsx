import React from 'react';

import { UserMini } from '../../atoms';

import './TokenInfo.scss';

interface TokenInfoProps {
  owner: IUser;
  artist: IUser;
  collection: { col: IUser; standart: string };
  royalty: string | number;
}

interface IUser {
  id: number;
  avatar: string;
  name: string;
}
const TokenInfo: React.FC<TokenInfoProps> = ({ owner, artist, royalty, collection }) => {
  return (
    <div className="token-tab token-info">
      <UserMini
        img={owner?.avatar}
        id={owner?.id}
        imgSize="lg"
        topText={<span className="text text-gray text-sm text-upper text-regular">owner</span>}
        bottomText={<span className="text text-purple-l text-smd text-bold">{owner?.name}</span>}
      />
      <UserMini
        img={artist?.avatar}
        id={artist?.id}
        imgSize="lg"
        topText={<span className="text text-gray text-sm text-upper text-regular">artist</span>}
        bottomText={<span className="text text-purple-l text-smd text-bold">{artist?.name}</span>}
      />
      <div className="token-info__warning text text-purple-d text-bold ">
        {royalty}% of sales will go to creator
      </div>
      <UserMini
        img={collection.col?.avatar}
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
