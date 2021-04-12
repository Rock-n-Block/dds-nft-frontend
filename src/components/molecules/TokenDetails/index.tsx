import React from 'react';
import nextId from 'react-id-generator';

import './TokenDetails.scss';

interface TokenDetailsProps {
  details: Array<IDetail>;
}
export interface IDetail {
  topText: string;
  bottomText: string;
}

const TokenDetails: React.FC<TokenDetailsProps> = ({ details }) => {
  return (
    <div className="token-details">
      {details ? (
        details.map((detail) => (
          <div className="token-details__detail" key={nextId()}>
            <h3 className="text-black text-upper text-sm">{detail.topText}</h3>
            <p className="text-smd text-bold text-pink-l">{detail.bottomText}</p>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default TokenDetails;
