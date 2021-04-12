import React from 'react';

import { IUser } from '../../../pages/Token';
import { UserMini } from '../index';
import { IUserMini } from '../UserMini';

import './TokenInfo.scss';

interface TokenInfoProps {
  owner: IUser;
  artist: IUser;
  collection: IUserMini;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ owner, artist, collection }) => {
  return (
    <div className="token-tab token-info">
      <UserMini
        img={owner.img}
        imgSize="lg"
        topText={<span className="text text-gray text-sm text-upper">owner</span>}
        bottomText={<span className="text text-purple-l text-smd text-bold">{owner.name}</span>}
      />
      <UserMini
        img={artist.img}
        imgSize="lg"
        topText={<span className="text text-gray text-sm text-upper">artist</span>}
        bottomText={<span className="text text-purple-l text-smd text-bold">{artist.name}</span>}
      />
      <div className="token-info__warning text text-purple-d text-bold ">
        15% of sales will go to creator
      </div>
      <UserMini
        img={collection.img}
        imgSize="lg"
        isCheck
        topText={<span className="text text-gray text-sm text-upper">{collection.topText}</span>}
        bottomText={
          <span className="text text-purple-l text-smd text-bold">{collection.bottomText}</span>
        }
      />
    </div>
  );
};
export default TokenInfo;
