import React from 'react';

import './NoItemsFound.scss';

const NoItemsFound: React.FC = () => {
  return (
    <div className="no-items-found">
      <h2 className="no-items-found__title text-grad text-bold">No items found</h2>
      <p className="no-items-found__description text text-bold text-gray">
        Come back soon! Or try browse
      </p>
    </div>
  );
};

export default NoItemsFound;
