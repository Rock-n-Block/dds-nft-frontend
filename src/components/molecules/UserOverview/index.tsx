import React, { useState } from 'react';
import nextId from 'react-id-generator';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';

import { ReactComponent as ShareLinkSvg } from '../../../assets/img/icons/share-link.svg';
import { userApi } from '../../../services/api';
import { Button, SocialNetwork, UserWallet } from '../../atoms';
import { ISocialNetwork } from '../../atoms/SocialNetwork';
import PopoverUserLinks, { PopoverUserLinksProps } from '../PopoverUserLinks';

import './UserOverview.scss';

export interface UserOverviewProps {
  id: string | undefined;
  avatarSrc?: string;
  name: string;
  wallet: string;
  description?: string;
  self?: boolean;
  follows?: boolean;
  socialNetworks?: Array<ISocialNetwork>;
}

const content = (props: PopoverUserLinksProps) => {
  return <PopoverUserLinks {...props} />;
};
const UserOverview: React.FC<UserOverviewProps> = ({
  id,
  avatarSrc,
  name,
  wallet,
  description,
  self = false,
  follows = false,
  socialNetworks,
}) => {
  let followBtn;
  const [follow, setFollow] = useState<boolean>(follows);

  const handleUnfollow = () => {
    userApi
      .unfollow({ id: +(id ?? 0) })
      .then(() => {
        setFollow(false);
      })
      .catch((err) => {
        console.log(err, 'unfollow user');
      });
  };
  const handleFollow = () => {
    userApi
      .follow({ id: +(id ?? 0) })
      .then(() => {
        setFollow(true);
      })
      .catch((err) => {
        console.log(err, 'follow user');
      });
  };

  if (follow) {
    followBtn = (
      <Button colorScheme="outline" onClick={handleUnfollow}>
        Unfollow
      </Button>
    );
  } else {
    followBtn = <Button onClick={handleFollow}>Follow </Button>;
  }
  // useEffect(() => {}, [follow]);
  return (
    <div className="user-overview">
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
      {self ? (
        <Button size="sm" colorScheme="white" className="user-overview__edit-cover">
          Edit cover
        </Button>
      ) : (
        <></>
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
                  withTitle
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
          {self ? (
            <Button link="/profile" className="user-overview__content__buttons-edit">
              Edit Profile
            </Button>
          ) : (
            followBtn
          )}
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
          {self ? (
            <></>
          ) : (
            <Button size="sm" colorScheme="white">
              Report User
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
