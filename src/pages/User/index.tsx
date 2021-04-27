import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { observer } from 'mobx-react-lite';

import followingUserAvatar from '../../assets/img/mock/following-user.png';
import PreviewImg from '../../assets/img/mock/home-preview.jpg';
import firstCard from '../../assets/img/mock/user-activity-card.png';
import userAvatar from '../../assets/img/mock/user-avatar.png';
import ShadowImg from '../../assets/img/shadow.png';
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
import { userApi } from '../../services/api';
import { useMst } from '../../store/store';

import './User.scss';

interface IUser {
  avatarSrc?: string;
  name: string;
  wallet: string;
  description?: string;
  socialNetworks?: Array<ISocialNetwork>;
  activityCards: { filters: Array<string>; activities: Array<IActivityCard> };
  followingUsers: Array<IFollowCard>;
}
interface INewUser {
  id: number | string | null;
  address: string;
  displayName: string | null;
  avatar: string | null;
  bio: string | null;
  customUrl: string | null;
  twitter: string | null;
  site: string | null;
  follows: any;
  followers: any;
}

const mockUser: IUser = {
  avatarSrc: userAvatar,
  name: "Satoshi's Mom",
  wallet: '0x3d6a89c8751a462363563723776193',
  description: `T3 "Skelly" Series, 1 off a kind numbered skulls will drop and none will ever be repeated, each Skelly will either have a new colorway, or animation, sometimes both. Which Skelly will be the Chosen one. `,
  socialNetworks: [
    { networkType: 'Instagram', link: 'https://www.instagram.com/thejuze/', name: 'thejuze' },
    { networkType: 'Twitter', link: 'https://www.instagram.com/thejuze/', name: 'theJuze' },
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
const sort = <Sort items={sortTypes} isSortShown onChange={() => {}} />;

const User: React.FC = observer(() => {
  const [currentUser, setCurrentUser] = useState<INewUser>();
  const { user } = useMst();

  const { userId } = useParams<{ userId: string | undefined }>();

  // const follows = !!user.follows.find((followsUser) => followsUser.id === userId);// TODO:uncomment when id in the model
  const follows = true;

  const self = user.id === +(userId ?? '0');

  const params = new URLSearchParams(useLocation().search);
  const activeTab: string = params.get('tab') ?? 'on-sale';

  const loadUser = () => {
    userApi
      .getUser({ id: userId ?? '0' })
      .then(({ data }) => {
        setCurrentUser({
          id: data.id,
          address: data.address,
          displayName: data.display_name,
          avatar: data.avatar,
          bio: data.bio,
          customUrl: data.custom_url,
          twitter: data.twitter,
          site: data.site,
          follows: data.follows,
          followers: data.followers,
        });
      })
      .catch((err) => {
        console.log(err, 'get user');
      });
  };
  React.useEffect(() => {
    if (!self) {
      loadUser();
    } else {
      setCurrentUser({
        id: user.id,
        address: user.address,
        displayName: user.display_name,
        avatar: user.avatar,
        bio: user.bio,
        customUrl: user.custom_url,
        twitter: user.twitter,
        site: user.site,
        follows: user.follows,
        followers: user.followers,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    // TODO:autogenerated key
    <div className="user">
      <div
        className="user__cap"
        style={{ backgroundImage: `url(${ShadowImg}), url(${PreviewImg})` }}
      />
      <div className="row">
        <UserOverview
          id={userId}
          name={currentUser?.displayName ?? 'UserName'}
          wallet={currentUser?.address ?? 'wallet address'}
          avatarSrc={currentUser?.avatar ? `https://${currentUser?.avatar}` : userAvatar}
          description={currentUser?.bio ?? ''}
          self={self}
          follows={follows}
          socialNetworks={mockUser.socialNetworks} // TODO: split social networks
        />
      </div>
      <Tabs tabBarExtraContent={sort} className="tabs" defaultActiveKey={activeTab}>
        <TabPane tab="On sale" key="on-sale">
          <UserOnSale />
        </TabPane>
        <TabPane tab="Collectibles" key="collectibles">
          <UserCollectibles address={currentUser?.address ?? ''} />
        </TabPane>
        <TabPane tab="Created" key="created">
          <UserCreated address={currentUser?.address ?? ''} />
        </TabPane>
        <TabPane tab="Liked" key="liked">
          <UserLiked address={currentUser?.address ?? ''} />
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
});

export default User;
