import React from 'react';
import classNames from 'classnames';

import { ReactComponent as LikeImg } from '../../../assets/img/icons/like.svg';

import './Like.scss';

interface ILike {
  like?: boolean;
  onClick?: () => void;
}

const Like: React.FC<ILike & React.HTMLAttributes<HTMLElement>> = ({ like, onClick }) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={0}
      role="button"
      className={classNames('like', {
        active: like,
      })}
    >
      <LikeImg />
    </div>
  );
};

export default Like;
