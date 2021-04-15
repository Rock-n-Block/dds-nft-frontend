import React from 'react';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';
import { observer } from 'mobx-react-lite';

import UserPopover from '../UserPopover';
import { useMst } from '../../../store/store';

import './UserPreview.scss';

const UserPreview: React.FC = observer(() => {
  const { user } = useMst();
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
          <img src={`https://${user.avatar}`} alt="" />
        </div>
      </Popover>
    </div>
  );
});

export default UserPreview;