import React from 'react';

export interface IFollowing {
  name: string;
  followers: number;
  img: string;
  tokens: Array<string>;
}

interface UserFollowingProps {
  followingUsers: Array<IFollowing>;
}

const UserFollowing: React.FC<UserFollowingProps> = ({ followingUsers }) => {
  return <div>{followingUsers[0]?.name}</div>;
};

export default UserFollowing;
