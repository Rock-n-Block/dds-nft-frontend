import React from 'react';
import classNames from 'classnames';

import Sort from '../Sort';

import './Filter.scss';

interface IFilter {
  filters: string[];
  isAllFilterItem?: boolean;
  isMultipleValues?: boolean;
  onChange: (activeFilters: string[]) => void;
  sortItems: string[];
  onChangeSort: (sort: string) => void;
}

const Filter: React.FC<IFilter> = ({
  filters,
  isAllFilterItem = false,
  isMultipleValues = false,
  onChange,
  sortItems,
  onChangeSort,
}) => {
  const [activeFilter, setActiveFilter] = React.useState<string[]>([filters[0]]);

  const handleFilterItemClick = (filter: string) => {
    let newFilters = [...activeFilter];
    if (isMultipleValues) {
      if (activeFilter.includes(filter)) {
        newFilters = activeFilter.filter((item) => item !== filter);
        if (!newFilters.length && isAllFilterItem) {
          newFilters = ['all'];
          setActiveFilter(['all']);
        } else {
          setActiveFilter(newFilters);
        }
      } else {
        newFilters.push(filter);
        setActiveFilter([...newFilters, filter]);
      }
    } else {
      newFilters = [filter];
      setActiveFilter([filter]);
    }
    onChange(newFilters);
  };
  return (
    <div className="filter">
      <div className="filter__box">
        {isAllFilterItem ? (
          <div
            onClick={() => handleFilterItemClick('all')}
            onKeyDown={() => handleFilterItemClick('all')}
            tabIndex={0}
            role="button"
            className={classNames('filter__item text-bold text-purple', {
              active: activeFilter.includes('all'),
            })}
          >
            All
          </div>
        ) : (
          ''
        )}
        {filters.map((item) => (
          <div
            key={item}
            role="button"
            onClick={() => handleFilterItemClick(item)}
            onKeyDown={() => handleFilterItemClick(item)}
            tabIndex={0}
            className={classNames('filter__item text-bold text-purple', {
              active: activeFilter.includes(item),
            })}
          >
            {item}
          </div>
        ))}
      </div>
      <Sort items={sortItems} onChange={onChangeSort} />
    </div>
  );
};

export default Filter;
