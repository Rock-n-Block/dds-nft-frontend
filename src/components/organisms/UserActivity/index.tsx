import React, { useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { Masonry } from 'masonic';

import { NoItemsFound } from '../../atoms';
import { ActivityCard } from '../../molecules';
import { IActivityCard } from '../../molecules/ActivityCard';
import Filter from '../Filter';

import './UserActivity.scss';

// import nextId from "react-id-generator";

interface UserActivityProps {
  filters: string[];
  activityCards: Array<IActivityCard>;
}

const renderCard = ({ data }: any) => {
  return <ActivityCard {...data} />;
};
const UserActivity: React.FC<UserActivityProps> = ({ filters, activityCards }) => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [filteredCards, setFilteredCards] = useState(activityCards);

  /*  const setActiveCards = (filter: string) => {
      setFilteredCards(activityCards.filter((card) => card.activityType === filter))
    } */

  const handleFilterChange = (value: string[]): void => {
    console.log(value);
    setActiveFilter(value[0]);
  };
  useEffect(() => {
    setFilteredCards(
      activeFilter === 'All'
        ? activityCards
        : activityCards.filter((card) => card.activityType === activeFilter),
    );
  }, [activityCards, activeFilter]);

  if (activityCards?.length === 0) {
    return <NoItemsFound />;
  }
  return (
    <div className="activity">
      <div className="row">
        <div className="activity-badges">
          {/* {filters.map((filter)=>
            (<div className="activity-badge">{filter}</div>)
          )} */}
          <Filter filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="activity-cards">
          <Masonry
            items={filteredCards}
            columnGutter={20}
            columnWidth={320}
            overscanBy={5}
            render={renderCard}
            key={nextId()}
          />
          {/* {activityCards ? (
            activityCards.map((card) => (
              <ActivityCard
                img={card.img}
                activityType={card.activityType}
                title={card.title}
                firstUser={card.firstUser}
                time={card.time}
                key={nextId()}
              />
            ))
          ) : (
            <NoItemsFound/>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
