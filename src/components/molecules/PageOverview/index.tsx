import React, { useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';

import { ReactComponent as ShareLinkSvg } from '../../../assets/img/icons/share-link.svg';
import { userApi } from '../../../services/api';
import { Button, SocialNetwork, UserWallet } from '../../atoms';
import PopoverUserLinks, { PopoverUserLinksProps } from '../PopoverUserLinks';

import './PageOverview.scss';
import ReportModal from '../ReportModal';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../../store/store';

export interface PageOverviewProps {
  id: string | undefined;
  avatarSrc?: string;
  name: string;
  wallet: string;
  description?: string;
  self?: boolean;
  follows?: boolean;
  twitter?: string;
  instagram?: string;
  parentComponent: 'User' | 'Collections';
}

const content = (props: PopoverUserLinksProps) => {
  return <PopoverUserLinks {...props} />;
};
const PageOverview: React.FC<PageOverviewProps> = observer(
  ({
    id,
    avatarSrc,
    name,
    wallet,
    description,
    twitter,
    instagram,
    self = false,
    follows = false,
    parentComponent,
  }) => {
    const { modals } = useMst();
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
    const openReportModal = () => {
      modals.report.open();
    };
    useEffect(() => {
      setFollow(follows);
    }, [follows]);
    return (
      <div className="page-overview">
        {avatarSrc ? (
          <Avatar src={avatarSrc} className="page-overview__avatar" size={150} alt="avatar" />
        ) : (
          <Avatar
            icon={<UserOutlined />}
            className="user-overview__avatar"
            size={150}
            alt="avatar"
          />
        )}
        <div className="page-overview__content">
          <h3 className="page-overview__content__name text-bold text-xl">{name}</h3>
          <div className="page-overview__content_container">
            <UserWallet address={wallet} className="page-overview__content__wallet" />
            <div className="page-overview__content__social-networks social-networks">
              {twitter && parentComponent === 'User' && (
                <SocialNetwork
                  networkType="Twitter"
                  name={twitter}
                  className="social-networks__network text text-purple text-bold"
                  key={nextId()}
                />
              )}
              {instagram && parentComponent === 'User' && (
                <SocialNetwork
                  networkType="Instagram"
                  name={instagram}
                  className="social-networks__network text text-purple text-bold"
                  key={nextId()}
                />
              )}
            </div>
          </div>
          <p className="page-overview__content__description text text-regular">{description}</p>
          <div className="page-overview__content__buttons">
            {self && parentComponent === 'User' ? (
              <Button link="/profile" className="page-overview__content__buttons-edit">
                Edit Profile
              </Button>
            ) : (
              <></>
            )}
            {!self && parentComponent === 'User' && follow ? (
              <Button colorScheme="outline" onClick={handleUnfollow}>
                Unfollow
              </Button>
            ) : (
              <></>
            )}
            {!self && parentComponent === 'User' && !follow ? (
              <Button onClick={handleFollow}>Follow </Button>
            ) : (
              <></>
            )}
            <Popover
              content={content({ name, text: `Share ${parentComponent}` })}
              trigger="click"
              placement="bottomLeft"
            >
              <Button
                size="sm"
                colorScheme="white"
                className="page-overview__content__buttons_share"
              >
                <ShareLinkSvg />
                Share link
              </Button>
            </Popover>
            {!self && parentComponent === 'User' ? (
              <Button size="sm" colorScheme="white" onClick={openReportModal}>
                Report User
              </Button>
            ) : (
              <></>
            )}
            {parentComponent === 'Collections' ? (
              <Button size="sm" colorScheme="white" onClick={openReportModal}>
                Report Collection
              </Button>
            ) : (
              <></>
            )}
            <ReportModal />
          </div>
        </div>
      </div>
    );
  },
);

export default PageOverview;
