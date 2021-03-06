import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { observer } from 'mobx-react-lite';

import userAvatar from '../../assets/img/mock/user-avatar.png';
import { PageOverview } from '../../components/molecules';
import PageCover from '../../components/molecules/PageCover';
import {
  UserActivity,
  UserCollectibles,
  UserCollections,
  UserCreated,
  UserFollow,
  UserLiked,
  UserOnSale,
} from '../../components/organisms';
import { storeApi, userApi } from '../../services/api';
import { useMst } from '../../store/store';

import './User.scss';
import { Button } from '../../components/atoms';
import { useWalletConnectorContext } from '../../services/walletConnect';

interface INewUser {
  id: number | string | null;
  address: string;
  displayName: string | null;
  avatar: string | null;
  bio: string | null;
  customUrl: string | null;
  twitter: string | null;
  instagram: string | null;
  site: string | null;
  cover: string | null;
  follows: any[];
  followsCount: number | null;
  followers: any[];
  followersCount: number | null;
  isVerificated: boolean;
}

const { TabPane } = Tabs;

const User: React.FC = observer(() => {
  const [currentUser, setCurrentUser] = useState<INewUser>();
  const [follows, setFollows] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [collectibles, setCollectibles] = useState<any>({});
  const [collectiblesForSale, setCollectiblesForSale] = React.useState<any>({});

  const { user, modals } = useMst();
  const walletConnector = useWalletConnectorContext();

  const { userId } = useParams<{ userId: string | undefined }>();

  const self = user.id === +(userId ?? '0');
  const params = new URLSearchParams(useLocation().search);
  const [query, setQuery] = useState(params.get('tab') ?? 'on-sale');
  const history = useHistory();
  const connectWallet = (): void => {
    if (!localStorage.ddsTerms) {
      modals.terms.open();
    } else {
      walletConnector.connect().then(history.push('/'));
    }
  };
  const onTabChange = (tab: string) => {
    setQuery(tab);
  };
  const loadCollectibles = useCallback(
    (page = 1) => {
      if (currentUser?.address) {
        storeApi
          .getCollectibles(currentUser?.address ?? '', page)
          .then(({ data }) => {
            setCollectibles({ tokens: [...data], length: data.length });
            setCollectiblesForSale(() => {
              const saleTokens = data?.filter((token: any) => token.selling);
              return {
                tokens: [...saleTokens],
                length: saleTokens.length,
              };
            });
          })
          .catch((err: any) => {
            console.log(err, 'get tokens');
          });
      }
    },
    [currentUser],
  );
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
          instagram: data.instagram,
          site: data.site,
          cover: data.cover,
          follows: data.follows,
          followsCount: data.follows_count,
          followers: data.followers,
          followersCount: data.followers_count,
          isVerificated: data.is_verificated,
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
        instagram: user.instagram,
        site: user.site,
        cover: user.cover,
        follows: user.follows,
        followsCount: user.follows_count,
        followers: user.followers,
        followersCount: user.followers_count,
        isVerificated: user.is_verificated,
      });
    }
  }, [self, loadUser, user]);
  const handleUpload = (file: any) => {
    setIsLoading(true);
    userApi
      .setUserCover(file)
      .then(({ data }) => {
        setIsLoading(false);
        modals.uploadCover.close();
        user.setCover(data);
        modals.info.setMsg('Congrats you changed the cover!', 'success');
        setCurrentUser((prevState: any) => {
          return {
            ...prevState,
            cover: data,
          };
        });
      })
      .catch((err) => {
        console.log(err, 'set cover');
      });
  };
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
  useEffect(() => {
    loadCollectibles();
  }, [loadCollectibles]);
  return (
    // TODO:autogenerated key
    <div className="user">
      {userId !== 'null' ? (
        <>
          <PageCover
            self={self}
            img={currentUser?.cover ?? ''}
            handleUpload={handleUpload}
            isLoading={isLoading}
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
              twitter={currentUser?.twitter ?? ''}
              instagram={currentUser?.instagram ?? ''}
              isVerificated={currentUser?.isVerificated || false}
              parentComponent="User"
            />
          </div>
          <Tabs
            className="tabs"
            activeKey={params.get('tab') ?? 'on-sale'}
            onTabClick={(tab: string) => onTabChange(tab)}
          >
            <TabPane tab="On sale" key="on-sale">
              <UserOnSale cards={collectiblesForSale} />
            </TabPane>
            <TabPane tab="Collectibles" key="collectibles">
              <UserCollectibles cards={collectibles} />
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
                address={currentUser?.address ?? ''}
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
                // follows={currentUser?.follows ?? []}
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
                // follows={currentUser?.follows ?? []}
                followType="Follower"
              />
            </TabPane>
          </Tabs>
        </>
      ) : (
        <div className="user-login">
          <h2 className="user-login__title text-grad text-bold">No user found</h2>
          <p className="user-login__description text text-bold text-gray">
            Please connect your wallet.
          </p>
          <Button
            colorScheme="purple"
            size="md"
            onClick={connectWallet}
            className="user-login__connect-btn"
          >
            Connect
          </Button>
        </div>
      )}
    </div>
  );
});

export default User;
