import React from 'react';
import classNames from 'classnames';

import CheckImg from '../../../assets/img/icons/user-check.svg';

import './UserMini.scss';

export interface IUserMini {
  img: string;
  topText: React.ReactElement | string;
  bottomText: React.ReactElement | string;
  className?: string;
  shadow?: boolean;
  id?: number;
  imgSize?: 'lg';
  isCheck?: boolean;
}

const UserMini: React.FC<IUserMini> = ({
  img,
  topText,
  bottomText,
  className,
  shadow,
  imgSize,
  isCheck,
}) => {
  return (
    <div
      className={classNames('u-mini', className, {
        'u-mini__no-shadow': !shadow,
      })}
    >
      <div
        className={classNames('u-mini__wrapper', {
          'u-mini__wrapper-lg': imgSize === 'lg',
        })}
      >
        <div
          className={classNames('u-mini__box-img', {
            'u-mini__box-img-lg': imgSize === 'lg',
          })}
        >
          <img src={img} alt="owner name" className="u-mini__img" />
        </div>
        {isCheck ? <img src={CheckImg} alt="" className="u-mini__img-check" /> : ''}
      </div>

      <div className="u-mini__box">
        <div className="u-mini__text">{topText}</div>
        <div className="u-mini__text">{bottomText}</div>
      </div>
    </div>
  );
};

export default UserMini;
