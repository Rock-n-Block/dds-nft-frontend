import React from 'react';
import nextId from 'react-id-generator';
import BigNumber from 'bignumber.js/bignumber';

import { UserMini } from '../../atoms';

import './TokenOwners.scss';

interface IUser {
  id: number;
  avatar: string;
  name: string;
  price?: number;
  quantity?: number;
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
            id={owner.id}
            topText={
              <span className="text text-gray text-sm text-upper text-regular">
                {/* is selling for {owner.topText} */}
                {owner.price
                  ? `${owner.quantity || ''} is selling for ${+new BigNumber(owner.price)
                      .dividedBy(new BigNumber(10).pow(18))
                      .toFixed()}`
                  : `${owner.quantity || ''} not for sale`}
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
