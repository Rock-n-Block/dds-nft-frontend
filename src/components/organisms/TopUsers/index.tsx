import React from 'react';
import nextId from 'react-id-generator';
import classNames from 'classnames';

import UserMini, { IUserMini } from '../../atoms/UserMini';

import './TopUsers.scss';

interface ITopUsers {
  users: IUserMini[];
}

const TopUsers: React.FC<ITopUsers> = ({ users }) => {
  const [activeType, setActiveType] = React.useState<string>('sellers');
  const [activeDay, setActiveDay] = React.useState<number>(1);
  const first = ['sellers', 'buyers'];
  const second = [1, 7, 30];

  const handleFilter = (type: string, day: number): void => {
    setActiveDay(day);
    setActiveType(type);
  };
  return (
    <div className="t-users">
      <div className="row">
        <div className="t-users__box">
          <div className="t-users__title h1-md text-bold">Top</div>
          <div className="t-users__filter">
            {first.map((item) => (
              <div
                key={item}
                onClick={() => handleFilter(item, activeDay)}
                onKeyDown={() => handleFilter(item, activeDay)}
                role="button"
                tabIndex={0}
                className={classNames('t-users__filter-item text-bold', {
                  'box-shadow': activeType !== item,
                  'active': activeType === item,
                })}
              >
                <span className="text-grad">{item}</span>
              </div>
            ))}
          </div>
          <div className="t-users__title h1-md text-bold">in</div>
          <div className="t-users__filter">
            {second.map((item) => (
              <div
                key={item}
                onClick={() => handleFilter(activeType, item)}
                onKeyDown={() => handleFilter(activeType, item)}
                role="button"
                tabIndex={0}
                className={classNames('t-users__filter-item text-bold', {
                  'box-shadow': activeDay !== item,
                  'active': activeDay === item,
                })}
              >
                <span className="text-grad">
                  {item} {item === 1 ? 'day' : 'days'}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="t-users__content">
          {users.map((user, index) => (
            <div className="t-users__user" key={nextId()}>
              <div className="t-users__user-index">{index + 1}.</div>
              <UserMini
                key={user.id}
                img={user.img}
                isCheck
                topText={<span className="text-bold t-users__user-name">{user.topText}</span>}
                bottomText={
                  <span className="text-gray text-sm text-regular">{user.bottomText}</span>
                }
                imgSize="lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUsers;
