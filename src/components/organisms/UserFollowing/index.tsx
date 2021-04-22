import React, { useCallback, useEffect } from 'react';
import nextId from 'react-id-generator';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../../services/api';
import { NoItemsFound } from '../../atoms';
import FollowCard, { IFollowCard } from '../../molecules/FollowCard';

import './UserFollowing.scss';

interface UserFollowingProps {
  followingUsers: Array<IFollowCard>;
}

const UserFollowing: React.FC<UserFollowingProps> = observer(({ followingUsers }) => {
  const loadFollowingUsers = useCallback((page = 1) => {
    storeApi
      .getFollowing(page)
      .then((data) => {
        console.log('success get following', data);
      })
      .catch((err: any) => {
        console.log(err, 'get tokens');
      });
  }, []);
  useEffect(() => {
    loadFollowingUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (followingUsers === undefined || followingUsers?.length === 0) {
    return <NoItemsFound />;
  }
  return (
    <div className="user-following row">
      {followingUsers.map((user) => (
        <FollowCard
          tokens={user.tokens}
          followers={user.followers}
          name={user.name}
          img={user.img}
          key={nextId()}
        />
      ))}
    </div>
  );
});

export default UserFollowing;
