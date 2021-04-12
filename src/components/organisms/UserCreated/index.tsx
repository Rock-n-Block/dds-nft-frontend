import React from 'react';

import { NoItemsFound } from '../../atoms';
import { INFTCard } from '../../molecules/NFTCard';

interface UserCreatedProps {
  userCards?: Array<INFTCard>;
}

const UserCreated: React.FC<UserCreatedProps> = ({ userCards }) => {
  if (userCards === undefined || userCards?.length === 0) {
    return <NoItemsFound />;
  }
  return <div>UserCreated works</div>;
};

export default UserCreated;
