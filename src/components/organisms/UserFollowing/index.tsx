import React from 'react';
import nextId from 'react-id-generator';

import { NoItemsFound } from '../../atoms';
import FollowCard, { IFollowCard } from '../../molecules/FollowCard';

import './UserFollowing.scss';

interface UserFollowingProps {
  followingUsers: Array<IFollowCard>;
}

const UserFollowing: React.FC<UserFollowingProps> = ({ followingUsers }) => {
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
};

export default UserFollowing;
