import React from 'react';

import './NoPageFound.scss';

const NoPageFound: React.FC = () => {
  return (
    <div className="page-not-found">
      <div className="row">
        <h2 className="h1-xl text-center text-bold">404</h2>
        <p className="h1 text-center text-bold text-grad">Page not found</p>
      </div>
    </div>
  );
};
export default NoPageFound;
