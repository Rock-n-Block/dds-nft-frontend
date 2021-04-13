import React from 'react';
import nextId from 'react-id-generator';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';

import { ReactComponent as ShareLinkSvg } from '../../../assets/img/icons/share-link.svg';
import { Button, SocialNetwork, UserWallet } from '../../atoms';
import { ISocialNetwork } from '../../atoms/SocialNetwork';
import PopoverUserLinks, { PopoverUserLinksProps } from '../PopoverUserLinks';

import './UserOverview.scss';

export interface UserOverviewProps {
  avatarSrc?: string;
  name: string;
  wallet: string;
  description?: string;
  socialNetworks?: Array<ISocialNetwork>;
}

const content = (props: PopoverUserLinksProps) => {
  return <PopoverUserLinks {...props} />;
};
const UserOverview: React.FC<UserOverviewProps> = ({
  avatarSrc,
  name,
  wallet,
  description,
  socialNetworks,
}) => {
  return (
    <div className="User__user-overview user-overview">
      {avatarSrc ? (
        <Avatar src={avatarSrc} className="user-overview__avatar" size={150} alt="User avatar" />
      ) : (
        <Avatar
          icon={<UserOutlined />}
          className="user-overview__avatar"
          size={150}
          alt="User avatar"
        />
      )}
      <div className="user-overview__content">
        <h3 className="user-overview__content__name text-bold text-xl">{name}</h3>
        <div className="user-overview__content_container">
          <UserWallet address={wallet} className="user-overview__content__wallet" />
          <div className="user-overview__content__social-networks social-networks">
            {socialNetworks ? (
              socialNetworks.map((network) => (
                <SocialNetwork
                  socialNetwork={network}
                  className="social-networks__network text text-purple text-bold"
                  key={nextId()}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <p className="user-overview__content__description text text-regular">{description}</p>
        <div className="user-overview__content__buttons">
          <Button size="sm">Follow </Button>
          <Popover
            content={content({ name, socialNetworks })}
            trigger="click"
            placement="bottomLeft"
          >
            <Button size="sm" colorScheme="white" className="user-overview__content__buttons_share">
              <ShareLinkSvg />
              Share link
            </Button>
          </Popover>
          <Button size="sm" colorScheme="white">
            Report User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
