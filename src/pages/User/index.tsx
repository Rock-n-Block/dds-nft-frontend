import React from 'react';

import userAvatar from '../../assets/img/mock/user-avatar.png';
import { UserOverview } from '../../components/molecules';
import { UserOverviewProps } from '../../components/molecules/UserOverview';

import './User.scss';

const mockUser: UserOverviewProps = {
  avatarSrc: userAvatar,
  name: "Satoshi's Mom",
  wallet: '0x3d6a89c8751a462363563723776193',
  description: `T3 "Skelly" Series, 1 off a kind numbered skulls will drop and none will ever be repeated, each Skelly will either have a new colorway, or animation, sometimes both. Which Skelly will be the Chosen one. `,
  socialNetworks:[{networkType:"Email",link:"href",name:"Email"}]
};

const User: React.FC = () => {
  return (
    <div className="user">
      <div className="row">
        <div className="user__cap">Img</div>
      </div>
      <div className="row">
        <UserOverview
          name={mockUser.name}
          wallet={mockUser.wallet}
          avatarSrc={mockUser.avatarSrc}
          description={mockUser.description}
          socialNetworks={mockUser.socialNetworks}
        />
      </div>
    </div>
  );
};

export default User;
