import React from 'react';

import { UserMini } from '../index';
import { IUserMini } from '../UserMini';

import './TokenOwners.scss';

interface TokenOwnersProps {
  owners: Array<IUserMini>;
}

const TokenOwners: React.FC<TokenOwnersProps> = ({ owners }) => {
  return (
    <div className="token-owners">
      {owners ? (
        owners.map((owner) => (
          <UserMini
            className="token-owners__owner"
            img={owner.img}
            imgSize="lg"
            topText={
              <span className="text text-gray text-sm text-upper">
                is selling for {owner.topText}
              </span>
            }
            bottomText={<span className="text text-gray text-smd">BY {owner.bottomText}</span>}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default TokenOwners;
