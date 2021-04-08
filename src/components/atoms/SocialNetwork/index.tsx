import React from 'react';

export interface SocialNetworkProps {
  networkType: 'Twitter' | 'Facebook' | 'Telegram' | 'Email';
  name: string;
  link: string;
}

const SocialNetwork: React.FC<SocialNetworkProps> = ({ networkType, name, link }) => {
  switch (networkType) {
    case 'Twitter':
      return <div>{name}</div>;
    case 'Facebook':
      return <div>{link}</div>;
    case 'Telegram':
      return <div>tg</div>;
    case 'Email':
      return <div>email</div>;
    default:
      return <></>;
  }
};

export default SocialNetwork;
