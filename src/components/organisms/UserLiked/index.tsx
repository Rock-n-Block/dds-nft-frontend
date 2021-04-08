import React from 'react';

import { NoItemsFound } from '../../atoms';

const hotBids = [];
const UserLiked: React.FC = () => {
  if (hotBids.length === 0) {
    return <NoItemsFound />;
  }
  return <div>UserLiked works</div>;
};

export default UserLiked;
