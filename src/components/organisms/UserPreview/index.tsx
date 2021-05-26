import React from 'react';
import { Popover } from 'antd';
import { observer } from 'mobx-react-lite';

import { useMst } from '../../../store/store';
import UserPopover from '../UserPopover';

import './UserPreview.scss';

interface UserPreviewProps {
  onClick?: (e: any) => void;
}
const UserPreview: React.FC<UserPreviewProps> = observer(({ onClick }) => {
  const { user } = useMst();
  const blockRef = React.useRef<any>();
  return (
    <div
      role="button"
      className="u-preview"
      id="user-preview"
      ref={blockRef}
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={0}
    >
      {onClick ? (
        <>
          <p className="u-preview__text text-bold text-purple">
            {user.display_name ? user.display_name : user.address}
          </p>
          <div className="u-preview__img">
            <img src={user.avatar ? `https://${user.avatar}` : ''} alt="" />
          </div>
        </>
      ) : (
        <Popover
          trigger="click"
          content={<UserPopover />}
          getPopupContainer={() => blockRef.current}
          autoAdjustOverflow
          placement="bottomRight"
          className="u-preview__container"
        >
          <p className="u-preview__text text-bold text-purple">
            {user.display_name ? user.display_name : user.address}
          </p>
          <div className="u-preview__img">
            <img src={user.avatar ? `https://${user.avatar}` : ''} alt="" />
          </div>
        </Popover>
      )}
    </div>
  );
});

export default UserPreview;
