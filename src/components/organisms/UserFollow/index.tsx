import React, { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { observer } from 'mobx-react-lite';

import { userApi } from '../../../services/api';
import { NoItemsFound } from '../../atoms';
import FollowCard from '../../molecules/FollowCard';

import './UserFollowing.scss';

interface UserFollowingProps {
  address: string;
  follows: Array<any>;
  followType: 'Following' | 'Follower';
}

const UserFollow: React.FC<UserFollowingProps> = observer(({ address, follows, followType }) => {
  const [users, setUsers] = useState<any>([]);
  const loadFollowingUsers = useCallback(
    (page = 1) => {
      if (address) {
        userApi
          .getFollowing(address, page)
          .then(({ data }) => {
            setUsers(data);
          })
          .catch((err: any) => {
            console.log(err, 'get following');
          });
      }
    },
    [address],
  );
  const loadFollowerUsers = useCallback(
    (page = 1) => {
      if (address) {
        userApi
          .getFollowers(address, page)
          .then(({ data }) => {
            setUsers(data);
          })
          .catch((err: any) => {
            console.log(err, 'get followers');
          });
      }
    },
    [address],
  );
  useEffect(() => {
    if (followType === 'Following') loadFollowingUsers();
    else loadFollowerUsers();
  }, [followType, loadFollowingUsers, loadFollowerUsers]);

  if (users === undefined || users?.length === 0) {
    return <NoItemsFound />;
  }
  return (
    <div className="user-following row">
      {users.map((user: any) => (
        <FollowCard
          tokens={user.tokens}
          id={user.id}
          followersCount={user.followers_count}
          name={user.name}
          avatar={user.avatar}
          follows={follows}
          key={nextId()}
        />
      ))}
    </div>
  );
});

export default UserFollow;
