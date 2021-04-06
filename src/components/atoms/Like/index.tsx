import React from 'react';
import classNames from 'classnames';

import { ReactComponent as LikeBoldImg } from '../../../assets/img/icons/like-b.svg';
import { ReactComponent as LikeImg } from '../../../assets/img/icons/like.svg';

import './Like.scss';

interface ILike {
  like?: boolean;
  likeCount?: number | string;
  onClick?: () => void;
  img?: 'bold';
}

const Like: React.FC<ILike & React.HTMLAttributes<HTMLElement>> = ({
  like,
  onClick,
  likeCount,
  img,
}) => {
  return (
    <div className="like">
      <div
        onClick={onClick}
        onKeyDown={onClick}
        tabIndex={0}
        role="button"
        className={classNames('like__item', {
          'active': like,
          'like__item-big': img === 'bold',
        })}
      >
        {img === 'bold' ? <LikeBoldImg /> : <LikeImg />}
      </div>
      {likeCount ? <div className="like__count text-md text-gray">{likeCount}</div> : ''}
    </div>
  );
};

export default Like;
