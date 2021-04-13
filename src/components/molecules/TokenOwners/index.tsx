import React from 'react';
import nextId from 'react-id-generator';

import { UserMini } from '../../atoms';
import { IUserMini } from '../../atoms/UserMini';

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
            key={nextId()}
            img={owner.img}
            imgSize="lg"
            topText={
              <span className="text text-gray text-sm text-upper text-regular">
                is selling for {owner.topText}
              </span>
            }
            bottomText={
              <span className="text text-gray text-smd text-regular">BY {owner.bottomText}</span>
            }
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default TokenOwners;
