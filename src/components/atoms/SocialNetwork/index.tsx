import React, { useEffect, useState } from 'react';

import { ReactComponent as Instagram } from '../../../assets/img/icons/social/user/instagram.svg';
import { ReactComponent as Twitter } from '../../../assets/img/icons/social/user/twitter.svg';

export interface SocialNetworkProps {
  networkType: 'Twitter' | 'Instagram';
  name: string;
  className?: string;
}

const SocialNetwork: React.FC<SocialNetworkProps> = ({ networkType, name, className }) => {
  const [userName, setUserName] = useState(name);
  useEffect(() => {
    if (name.slice(0, 1) === '@') {
      setUserName(name.slice(1));
    }
  }, [name]);
  // TODO: uncomment all when icons rdy
  switch (networkType) {
    case 'Twitter':
      return (
        <a
          href={`https://twitter.com/${userName}`}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          <Twitter />
          {userName}
        </a>
      );
    case 'Instagram':
      return (
        <a
          href={`https://www.instagram.com/${userName}`}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          <Instagram />
          {userName}
        </a>
      );
    default:
      return <></>;
  }
};

export default SocialNetwork;
