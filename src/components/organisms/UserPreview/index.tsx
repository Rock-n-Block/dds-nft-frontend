import React from 'react';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';

import userAvatar from '../../../assets/img/mock/user-avatar.png';
import UserPopover from '../UserPopover';

import './UserPreview.scss';

const UserPreview: React.FC = () => {
  const blockRef = React.useRef<any>();
  return (
    <div className="u-preview" id="user-preview" ref={blockRef}>
      <Link to="/overview" className="u-preview__text text-bold text-purple">
        0 DDS
      </Link>
      <Popover
        trigger="click"
        content={<UserPopover />}
        getPopupContainer={() => blockRef.current}
        autoAdjustOverflow={false}
        placement="bottomRight"
      >
        <div className="u-preview__img">
          <img src={userAvatar} alt="" />
        </div>
      </Popover>
    </div>
  );
};

export default UserPreview;
