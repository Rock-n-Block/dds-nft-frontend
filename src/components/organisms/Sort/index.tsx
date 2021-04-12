import React from 'react';
import classNames from 'classnames';

import ArrowImg from '../../../assets/img/icons/arrow-purple.svg';
import CheckImg from '../../../assets/img/icons/sort-check.svg';

import './Sort.scss';

interface ISort {
  items: string[];
  isSortShown?: boolean;
  onChange: (sort: string) => void;
}

const Sort: React.FC<ISort> = ({items, isSortShown = false, onChange}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [activeSort, setActiveSort] = React.useState<string>(items[0]);
  const [isPosTop, setPosTop] = React.useState<boolean>(false);

  const sortRef = React.useRef<any>();
  const sortContentRef = React.useRef<any>();

  const outsideClick = (e: any) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(sortRef.current)) {
      setOpen(false);
    }
  };
  const handleToggleOpen = (e: any): void => {
    setOpen(!isOpen);
    if (!isOpen) {
      document.body.addEventListener('click', outsideClick);
      if (window.innerHeight - e.clientY < 170) {
        setPosTop(true);
      } else {
        setPosTop(false);
      }
    } else {
      document.body.removeEventListener('click', outsideClick);
    }
  };

  const handleChangeSort = (sort: string): void => {
    if (sort !== activeSort) {
      onChange(sort);
      setActiveSort(sort);
    }
  };
  return (
    <div
      className={classNames('sort', {
        open: isOpen,
      })}
      ref={sortRef}
    >
      <div
        className="sort__head"
        role="button"
        tabIndex={0}
        onClick={handleToggleOpen}
        onKeyDown={handleToggleOpen}
      >
        <span className="text-bold text-black text">Sort</span>
        {isSortShown ? (<span className="sort__current text text-gray text-bold">{activeSort}</span>) : (<></>)}
        <img src={ArrowImg} alt="arrow"/>
      </div>
      <div
        className={classNames('sort__content', {
          top: isPosTop,
        })}
        ref={sortContentRef}
      >
        {items.map((item) => (
          <div
            key={item}
            className={classNames('sort__item', {
              check: activeSort === item,
            })}
            role="button"
            tabIndex={0}
            onClick={() => handleChangeSort(item)}
            onKeyDown={() => handleChangeSort(item)}
          >
            <span>{item}</span>
            <img src={CheckImg} alt="check"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sort;
