import React from 'react';

import { SocialNetwork } from '../../atoms';
import { ISocialNetwork } from '../../atoms/SocialNetwork';

import './PopoverUserLinks.scss';

export interface PopoverUserLinksProps {
  name: string;
  socialNetworks?: Array<ISocialNetwork>;
}

const PopoverUserLinks: React.FC<PopoverUserLinksProps> = ({ name, socialNetworks }) => {
  return (
    <div className="popover">
      <h3 className="popover__title text-grad">Share {name}</h3>
      {socialNetworks ? (
        <div className="popover__social-links">
          {socialNetworks.map((network) => (
            <div className="popover__social-links__social">
              <SocialNetwork
                socialNetwork={network}
                withTitle={false}
                className="popover__social-links__social-link"
              />
              <p className="popover__social-links__social-name">{network.networkType}</p>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PopoverUserLinks;
