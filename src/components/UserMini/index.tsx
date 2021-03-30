import React from 'react';
import classNames from 'classnames';

import './UserMini.scss';

interface IUserMini {
  img: string;
  topText: React.ReactElement;
  bottomText: React.ReactElement;
  className?: string;
  shadow?: boolean;
}

const UserMini: React.FC<IUserMini> = ({ img, topText, bottomText, className, shadow }) => {
  return (
    <div
      className={classNames('u-mini', className, {
        'u-mini__no-shadow': !shadow,
      })}
    >
      <div className="u-mini__box-img">
        <img src={img} alt="owner name" className="u-mini__img" />
      </div>

      <div className="u-mini__box">
        <div className="u-mini__text">{topText}</div>
        <div className="u-mini__text">{bottomText}</div>
      </div>
    </div>
  );
};

export default UserMini;
