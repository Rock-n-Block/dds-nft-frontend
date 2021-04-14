import React, { useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { Masonry } from 'masonic';

import { NoItemsFound } from '../../atoms';
import { ActivityCard } from '../../molecules';
import { IActivityCard } from '../../molecules/ActivityCard';
import Filter from '../Filter';

import './UserActivity.scss';

// import nextId from "react-id-generator";

export interface UserActivityProps {
  filters: string[];
  showPickedSort?: boolean;
  withSort?: boolean;
  isAllFilterItem?: boolean;
  isMultipleFilterValues?: boolean;
  activityCards: Array<IActivityCard>;
}

const renderCard = ({ data }: any) => {
  return <ActivityCard {...data} />;
};
const UserActivity: React.FC<UserActivityProps> = ({
  filters,
  showPickedSort = false,
  withSort = false,
  isAllFilterItem = false,
  isMultipleFilterValues = false,
  activityCards,
}) => {
  const [activeFilters, setActiveFilters] = useState<string[]>(
    isAllFilterItem ? ['all'] : [filters[0]],
  );
  const [filteredCards, setFilteredCards] = useState(activityCards);
  const sortTypes = ['Recommended', 'Most Recent', 'Popular', 'Price High', 'Price Low', 'text'];

  const handleFilterChange = (value: string[]): void => {
    setActiveFilters(isMultipleFilterValues ? [...value] : [value[0]]);
  };
  useEffect(() => {
    setFilteredCards(
      activeFilters.includes('all')
        ? activityCards
        : activityCards.filter((card) => activeFilters.includes(card.activityType)),
    );
  }, [activityCards, activeFilters]);

  if (activityCards === undefined || activityCards?.length === 0) {
    return <NoItemsFound />;
  }
  return (
    <div className="activity">
      <div className="row">
        <div className="activity-badges">
          {withSort ? (
            <Filter
              filters={filters}
              onChange={handleFilterChange}
              sortItems={sortTypes}
              onChangeSort={() => {}}
              showPickedSort={showPickedSort}
              isMultipleValues={isMultipleFilterValues}
              isAllFilterItem={isAllFilterItem}
            />
          ) : (
            <Filter
              isAllFilterItem={isAllFilterItem}
              isMultipleValues={isMultipleFilterValues}
              filters={filters}
              onChange={handleFilterChange}
            />
          )}
        </div>
        <div className="activity-cards">
          <Masonry
            items={filteredCards}
            columnGutter={20}
            columnWidth={300}
            overscanBy={3}
            render={renderCard}
            key={nextId()}
          />
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
