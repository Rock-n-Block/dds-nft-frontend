import React from 'react';
import { Tabs } from 'antd';

import followingUserAvatar from '../../assets/img/mock/following-user.png';
import firstCard from '../../assets/img/mock/user-activity-card.png';
import userAvatar from '../../assets/img/mock/user-avatar.png';
import { ISocialNetwork } from '../../components/atoms/SocialNetwork';
import { UserOverview } from '../../components/molecules';
import { IActivityCard } from '../../components/molecules/ActivityCard';
import { IFollowCard } from '../../components/molecules/FollowCard';
import {
  Sort,
  UserActivity,
  UserCollectibles,
  UserCreated,
  UserFollower,
  UserFollowing,
  UserLiked,
  UserOnSale,
} from '../../components/organisms';

import './User.scss';
import { useParams, useLocation } from 'react-router-dom';

interface IUser {
  avatarSrc?: string;
  name: string;
  wallet: string;
  description?: string;
  socialNetworks?: Array<ISocialNetwork>;
  activityCards: { filters: Array<string>; activities: Array<IActivityCard> };
  followingUsers: Array<IFollowCard>;
}

const mockUser: IUser = {
  avatarSrc: userAvatar,
  name: "Satoshi's Mom",
  wallet: '0x3d6a89c8751a462363563723776193',
  description: `T3 "Skelly" Series, 1 off a kind numbered skulls will drop and none will ever be repeated, each Skelly will either have a new colorway, or animation, sometimes both. Which Skelly will be the Chosen one. `,
  socialNetworks: [
    { networkType: 'Instagram', link: 'https://www.instagram.com/thejuze/', name: 'thejuze' },
    { networkType: 'Twitter', link: 'https://www.instagram.com/thejuze/', name: 'theJuze' },
    { networkType: 'Facebook', link: 'https://www.instagram.com/thejuze/', name: 'theJuze' },
    { networkType: 'Telegram', link: 'https://www.instagram.com/thejuze/', name: 'theJuze' },
    { networkType: 'Email', link: 'https://www.instagram.com/thejuze/', name: 'theJuze' },
    { networkType: 'Discord', link: 'https://www.instagram.com/thejuze/', name: 'theJuze' },
    { networkType: 'Youtube', link: 'https://www.youtube.com/', name: 'zeJuze' },
  ],
  activityCards: {
    filters: ['Listing', 'Purchases', 'Sales', 'Transfers', 'Burns', 'Bids', 'Likes', 'Followings'],
    activities: [
      {
        img: firstCard,
        title: 'The son of a LEGO(man)',
        firstUser: {
          img: userAvatar,
          name: 'Herold Art',
        },
        activityType: 'Listing',
        time: 9,
      },
      {
        img: firstCard,
        title: 'The son of a LEGO(man)',
        firstUser: {
          img: userAvatar,
          name: '0x869ce...5422',
        },
        secondUser: {
          img: userAvatar,
          name: '0x73640...d624',
        },
        activityType: 'Purchases',
        time: 9,
        cost: 0.08,
      },
      {
        img: firstCard,
        title: 'The son of a LEGO(man)',
        firstUser: {
          img: userAvatar,
          name: '0x869ce...5422',
        },
        secondUser: {
          img: userAvatar,
          name: '0x73640...d624',
        },
        activityType: 'Sales',
        time: 9,
        cost: 0.08,
      },
    ],
  },
  followingUsers: [
    {
      img: followingUserAvatar,
      followers: 10,
      name: 'MT_004am',
      tokens: [
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
        firstCard,
      ],
    },
    {
      img: followingUserAvatar,
      followers: 10,
      name: 'MT_004am',
      tokens: [firstCard, firstCard, firstCard, firstCard, firstCard, firstCard],
    },
    {
      img: followingUserAvatar,
      followers: 10,
      name: 'MT_004am',
      tokens: [firstCard, firstCard, firstCard, firstCard, firstCard, firstCard],
    },
    {
      img: followingUserAvatar,
      followers: 10,
      name: 'MT_004am',
      tokens: [firstCard, firstCard, firstCard, firstCard, firstCard, firstCard],
    },
    {
      img: followingUserAvatar,
      followers: 10,
      name: 'MT_004am',
      tokens: [firstCard, firstCard, firstCard, firstCard, firstCard, firstCard],
    },
    {
      img: followingUserAvatar,
      followers: 10,
      name: 'MT_004am',
      tokens: [firstCard, firstCard, firstCard, firstCard, firstCard, firstCard],
    },
    {
      img: followingUserAvatar,
      followers: 10,
      name: 'MT_004am',
      tokens: [firstCard, firstCard, firstCard, firstCard, firstCard, firstCard],
    },
    {
      img: followingUserAvatar,
      followers: 10,
      name: 'MT_004am',
      tokens: [firstCard, firstCard, firstCard, firstCard, firstCard, firstCard],
    },
  ],
};
const { TabPane } = Tabs;
const sortTypes = ['Recommended', 'Most Recent', 'Popular', 'Price High', 'Price Low', 'text'];
const sort = <Sort items={sortTypes} onChange={() => {}} />;

const User: React.FC = () => {
  const { userId } = useParams<{ userId: string | undefined }>();
  console.log(userId);

  const params = new URLSearchParams(useLocation().search);
  const activeTab: string = params.get('tab') ?? 'on-sale';

  return (
    // TODO:autogenerated key
    <div className="user">
      <div className="user__cap">Img</div>
      <div className="row">
        <UserOverview
          name={mockUser.name}
          wallet={mockUser.wallet}
          avatarSrc={mockUser.avatarSrc}
          description={mockUser.description}
          socialNetworks={mockUser.socialNetworks}
        />
      </div>
      <Tabs tabBarExtraContent={sort} className="tabs" defaultActiveKey={activeTab}>
        <TabPane tab="On sale" key="on-sale">
          <UserOnSale />
        </TabPane>
        <TabPane tab="Collectibles" key="collectibles">
          <UserCollectibles />
        </TabPane>
        <TabPane tab="Created" key="created">
          <UserCreated />
        </TabPane>
        <TabPane tab="Liked" key="liked">
          <UserLiked />
        </TabPane>
        <TabPane tab="Activity" key="activity">
          <UserActivity
            filters={mockUser.activityCards.filters}
            activityCards={mockUser.activityCards.activities}
            isAllFilterItem
            isMultipleFilterValues
          />
        </TabPane>
        <TabPane tab={`Following ${mockUser.followingUsers.length}`} key="following">
          <UserFollowing followingUsers={mockUser.followingUsers} />
        </TabPane>
        <TabPane tab="Follower" key="follower">
          <UserFollower />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default User;
