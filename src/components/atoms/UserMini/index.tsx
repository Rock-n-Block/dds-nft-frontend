import React from 'react';
import classNames from 'classnames';

import './UserMini.scss';

export interface IUserMini {
  img: string;
  topText: React.ReactElement | string;
  bottomText: React.ReactElement | string;
  className?: string;
  shadow?: boolean;
  id?: number;
  imgSize?: 'lg';
}

const UserMini: React.FC<IUserMini> = ({
  img,
  topText,
  bottomText,
  className,
  shadow,
  imgSize,
}) => {
  return (
    <div
      className={classNames('u-mini', className, {
        'u-mini__no-shadow': !shadow,
      })}
    >
      <div
        className={classNames('u-mini__box-img', {
          'u-mini__box-img-lg': imgSize === 'lg',
        })}
      >
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
