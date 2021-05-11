import React, { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { Masonry } from 'masonic';

import { NoItemsFound } from '../../atoms';
import { ActivityCard } from '../../molecules';
import Filter from '../Filter';

import './UserActivity.scss';
import { activityApi } from '../../../services/api';

export interface UserActivityProps {
  address: string;
  isAllFilterItem?: boolean;
  isMultipleFilterValues?: boolean;
}

const UserActivity: React.FC<UserActivityProps> = ({
  address,
  isAllFilterItem = false,
  isMultipleFilterValues = false,
}) => {
  const filters = [
    'Listing',
    'Purchases',
    'Sales',
    'Transfers',
    'Burns',
    'Bids',
    'Likes',
    'Followings',
  ];
  const [activeFilters, setActiveFilters] = useState<string[]>(
    isAllFilterItem ? ['all'] : [filters[0]],
  );
  const [activityCards, setActivityCards] = useState<any>([]);

  const loadActivityCards = useCallback(
    (page = 1) => {
      return activityApi
        .getActivity(address, page)
        .then(({ data }) => {
          setActivityCards(data);
          console.log('success get activity', data);
        })
        .catch((err: any) => {
          console.log(err, 'get created');
        });
    },
    [address],
  );
  useEffect(() => {
    loadActivityCards();
  }, [loadActivityCards]);
  console.log(activeFilters);
  const renderCard = ({ data }: any) => {
    return (
      <ActivityCard
        tokenId={data.token_id}
        tokenImg={data.token_image}
        tokenName={data.token_name}
        method={data.method}
        firstUser={{
          id: data.from_id,
          img: data.from_image,
          address: data.from_address,
          name: data.from_name,
        }}
        secondUser={{
          id: data.to_id,
          img: data.to_image,
          address: data.to_address,
          name: data.to_name,
        }}
        date={data.date}
        price={data.price}
      />
    );
  };

  const handleFilterChange = (value: string[]): void => {
    setActiveFilters(isMultipleFilterValues ? [...value] : [value[0]]);
  };

  return (
    <div className="activity">
      <div className="row">
        <div className="activity-badges">
          <Filter
            isAllFilterItem={isAllFilterItem}
            isMultipleValues={isMultipleFilterValues}
            filters={filters}
            onChange={handleFilterChange}
          />
        </div>
        <div className="activity-cards">
          {activityCards.length ? (
            <Masonry
              items={activityCards}
              columnGutter={20}
              columnWidth={300}
              overscanBy={3}
              render={renderCard}
              key={nextId()}
            />
          ) : (
            <NoItemsFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
