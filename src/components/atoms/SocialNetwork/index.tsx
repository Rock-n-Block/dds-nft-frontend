import React from 'react';

// import {ReactComponent as Twitter} from '../../../assets/img/icons/social/user/'
import { ReactComponent as Facebook } from '../../../assets/img/icons/social/user/facebook.svg';
// import {ReactComponent as Telegram} from '../../../assets/img/icons/social/user/'
// import {ReactComponent as Email} from '../../../assets/img/icons/social/user/'
import { ReactComponent as Instagram } from '../../../assets/img/icons/social/user/instagram.svg';
// import {ReactComponent as Discord} from '../../../assets/img/icons/social/user/'
// import {ReactComponent as Youtube} from '../../../assets/img/icons/social/user/'

export interface ISocialNetwork {
  networkType: 'Twitter' | 'Facebook' | 'Telegram' | 'Email' | 'Instagram' | 'Discord' | 'Youtube';
  name: string;
  link: string;
}
interface SocialNetworkProps {
  socialNetwork: ISocialNetwork;
  className: string;
}

const SocialNetwork: React.FC<SocialNetworkProps> = ({ socialNetwork, className }) => {
  switch (socialNetwork.networkType) {
    // case 'Twitter':
    //   return <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}><Twitter/>{socialNetwork.name}</a>;
    case 'Facebook':
      return (
        <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}>
          <Facebook />
          {socialNetwork.name}
        </a>
      );
    // case 'Telegram':
    //   return <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}><Telegram/>{socialNetwork.name}</a>;
    // case 'Email':
    //   return <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}><Email/>{socialNetwork.name}</a>;
    case 'Instagram':
      return (
        <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}>
          <Instagram />
          {socialNetwork.name}
        </a>
      );
    // case 'Discord':
    //   return <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}><Discord/>{socialNetwork.name}</a>;
    // case 'Youtube':
    //   return <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}><Youtube/>{socialNetwork.name}</a>;
    default:
      return <></>;
  }
};

export default SocialNetwork;
