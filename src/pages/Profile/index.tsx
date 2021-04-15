import React from 'react';

import { ProfileForm } from '../../forms';

import './Profile.scss';

const Profile: React.FC = () => {
  return (
    <div className="profile">
      <div className="row">
        <h1 className="text-xl text-bold profile__title">Edit profile</h1>
        <div className="profile__subtitle text-gray-l text-bold text-smd">
          You can set preferred display name, create your branded profile URL and manage other
          personal settings
        </div>
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
