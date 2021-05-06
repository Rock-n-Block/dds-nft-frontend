import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { observer } from 'mobx-react-lite';

import followingUserAvatar from '../../assets/img/mock/following-user.png';
import PreviewImg from '../../assets/img/mock/home-preview.jpg';
import firstCard from '../../assets/img/mock/user-activity-card.png';
import userAvatar from '../../assets/img/mock/user-avatar.png';
import ShadowImg from '../../assets/img/shadow.png';
import { PageOverview } from '../../components/molecules';
import {
  Sort,
  UserActivity,
  UserCollectibles,
  UserCollections,
  UserCreated,
  UserFollow,
  UserLiked,
  UserOnSale,
} from '../../components/organisms';
import { userApi } from '../../services/api';
import { useMst } from '../../store/store';

import './User.scss';

interface INewUser {
  id: number | string | null;
  address: string;
  displayName: string | null;
  avatar: string | null;
  bio: string | null;
  customUrl: string | null;
  twitter: string | null;
  site: string | null;
  follows: any[];
  followsCount: number | null;
  followers: any[];
  followersCount: number | null;
}

const mockUser: any = {
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
      avatar: followingUserAvatar,
      id: 0,
      followersCount: 10,
      name: 'MT_004am',
    },
    {
      avatar: followingUserAvatar,
      id: 1,
      followersCount: 10,
      name: 'MT_004am',
    },
    {
      avatar: followingUserAvatar,
      id: 2,
      followersCount: 10,
      name: 'MT_004am',
    },
    {
      avatar: followingUserAvatar,
      followersCount: 10,
      name: 'MT_004am',
      id: 3,
    },
    {
      avatar: followingUserAvatar,
      followersCount: 10,
      name: 'MT_004am',
      id: 4,
    },
    {
      avatar: followingUserAvatar,
      followersCount: 10,
      name: 'MT_004am',
      id: 5,
    },
    {
      avatar: followingUserAvatar,
      followersCount: 10,
      name: 'MT_004am',
      id: 6,
    },
    {
      avatar: followingUserAvatar,
      followersCount: 10,
      name: 'MT_004am',
      id: 7,
    },
  ],
};
const { TabPane } = Tabs;
const sortTypes = ['Recommended', 'Most Recent', 'Popular', 'Price High', 'Price Low', 'text'];
const sort = <Sort items={sortTypes} isSortShown onChange={() => {}} />;

const User: React.FC = observer(() => {
  const [currentUser, setCurrentUser] = useState<INewUser>();
  const [follows, setFollows] = useState<boolean>(false);
  const { user } = useMst();

  const { userId } = useParams<{ userId: string | undefined }>();

  // const follows = !!user.follows.find((followsUser) => followsUser.id === userId); // TODO:uncomment when id in the model
  // const follows = true;

  const self = user.id === +(userId ?? '0');
  const params = new URLSearchParams(useLocation().search);
  const [query, setQuery] = useState(params.get('tab') ?? 'on-sale');
  const history = useHistory();
  const onTabChange = (tab: string) => {
    setQuery(tab);
  };
  const loadUser = useCallback(() => {
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
          followsCount: data.follows_count,
          followers: data.followers,
          followersCount: data.followers_count,
        });
        setFollows(!!data.followers.find((follower: any) => follower.id === user.id));
      })
      .catch((err) => {
        console.log(err, 'get user');
      });
  }, [userId, user.id]);
  useEffect(() => {
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
        followsCount: user.follows_count,
        followers: user.followers,
        followersCount: user.followers_count,
      });
    }
  }, [self, loadUser, user]);

  useEffect(() => {
    setFollows(!!currentUser?.followers.find((follower: any) => follower.id === user.id));
  }, [currentUser, user.id]);
  useEffect(() => {
    const urlParams = new URLSearchParams();
    if (query) {
      urlParams.append('tab', query);
    } else {
      urlParams.delete('tab');
    }
    history.push({ search: urlParams.toString() });
  }, [query, history]);
  return (
    // TODO:autogenerated key
    <div className="user">
      <div
        className="user__cap"
        style={{ backgroundImage: `url(${ShadowImg}), url(${PreviewImg})` }}
      />
      <div className="row">
        <PageOverview
          id={userId}
          name={currentUser?.displayName ?? 'UserName'}
          wallet={currentUser?.address ?? 'wallet address'}
          avatarSrc={currentUser?.avatar ? `https://${currentUser?.avatar}` : userAvatar}
          description={currentUser?.bio ?? ''}
          self={self}
          follows={follows}
          socialNetworks={mockUser.socialNetworks} // TODO: split social networks
          parentComponent="User"
        />
      </div>
      <Tabs
        tabBarExtraContent={sort}
        className="tabs"
        activeKey={params.get('tab') ?? 'on-sale'}
        onTabClick={(tab: string) => onTabChange(tab)}
      >
        <TabPane tab="On sale" key="on-sale">
          <UserOnSale />
        </TabPane>
        <TabPane tab="Collectibles" key="collectibles">
          <UserCollectibles address={currentUser?.address ?? ''} />
        </TabPane>
        <TabPane tab="Collections" key="collections">
          <UserCollections address={currentUser?.address ?? ''} />
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
        <TabPane
          tab={
            <p>
              Following <span className="text-gray-l">{currentUser?.followsCount}</span>
            </p>
          }
          key="following"
        >
          <UserFollow
            address={currentUser?.address ?? ''}
            follows={currentUser?.follows ?? []}
            followType="Following"
          />
        </TabPane>
        <TabPane
          tab={
            <p>
              Follower <span className="text-gray-l">{currentUser?.followersCount}</span>
            </p>
          }
          key="follower"
        >
          <UserFollow
            address={currentUser?.address ?? ''}
            follows={currentUser?.follows ?? []}
            followType="Follower"
          />
        </TabPane>
      </Tabs>
    </div>
  );
});

export default User;
