import React from 'react';
import nextId from 'react-id-generator';

import { UserMini } from '../../atoms';

import './TokenOwners.scss';

interface IUser {
  id: number;
  avatar: string;
  name: string;
}
interface TokenOwnersProps {
  owners: Array<IUser>;
}

const TokenOwners: React.FC<TokenOwnersProps> = ({ owners }) => {
  return (
    <div className="token-owners">
      {owners ? (
        owners.map((owner) => (
          <UserMini
            className="token-owners__owner"
            key={nextId()}
            img={owner.avatar}
            imgSize="lg"
            topText={
              <span className="text text-gray text-sm text-upper text-regular">
                {/* is selling for {owner.topText} */}
                is selling for 2
              </span>
            }
            bottomText={
              <span className="text text-gray text-smd text-regular">BY {owner.name}</span>
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
