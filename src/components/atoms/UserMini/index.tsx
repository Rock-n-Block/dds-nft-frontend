import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import CheckImg from '../../../assets/img/icons/user-check.svg';

import './UserMini.scss';

export interface IUserMini {
  img?: string | null;
  topText: React.ReactElement | string;
  bottomText: React.ReactElement | string;
  centerText?: React.ReactElement | string;
  className?: string;
  shadow?: boolean;
  id?: number | string | null;
  imgSize?: 'lg';
  isCheck?: boolean;
  hideOverflowTop?: boolean;
  hideOverflowCenter?: boolean;
  hideOverflowBottom?: boolean;
}

const UserMini: React.FC<IUserMini> = ({
  img,
  topText,
  bottomText,
  className,
  id,
  shadow,
  imgSize,
  isCheck,
  centerText,
  hideOverflowTop = true,
  hideOverflowCenter = true,
  hideOverflowBottom = true,
}) => {
  return (
    <Link
      className={classNames('u-mini', className, {
        'u-mini__no-shadow': !shadow,
      })}
      to={`/user/${id}`}
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
          <img src={`https://${img}`} alt="owner name" className="u-mini__img" />
        </div>
        {isCheck ? <img src={CheckImg} alt="" className="u-mini__img-check" /> : ''}
      </div>

      <div className="u-mini__box">
        <div
          className={classNames('u-mini__text', {
            'u-mini__text-overflow-hide': hideOverflowTop,
          })}
        >
          {topText}
        </div>
        <div
          className={classNames('u-mini__text', {
            'u-mini__text-overflow-hide': hideOverflowCenter,
          })}
        >
          {centerText}
        </div>
        <div
          className={classNames('u-mini__text', {
            'u-mini__text-overflow-hide': hideOverflowBottom,
          })}
        >
          {bottomText}
        </div>
      </div>
    </Link>
  );
};

export default UserMini;
