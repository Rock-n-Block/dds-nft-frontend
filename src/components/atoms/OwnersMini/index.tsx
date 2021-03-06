import React from 'react';
import { Link } from 'react-router-dom';

import Dots from '../../../assets/img/icons/dots.svg';

import './OwnersMini.scss';
import nextId from 'react-id-generator';

interface OwnersMiniProps {
  tokenId?: number | string;
  owners: Array<{
    name: string;
    id?: number | string;
    avatar?: string;
  }>;
  className?: string;
}

const OwnersMini: React.FC<OwnersMiniProps> = ({ tokenId, owners, className }) => {
  return (
    <Link to={`/token/${tokenId}`} className={`${className} owners-mini`}>
      {owners.slice(0, 3).map((owner) => (
        <img
          key={nextId()}
          className="owners-mini__owner"
          src={`https://${owner.avatar}`}
          alt={`${owner.name} avatar`}
        />
      ))}
      <div className="owners-mini__owner">
        <img src={Dots} alt="view more" />
      </div>
    </Link>
  );
};
export default OwnersMini;
