import React from 'react';

import './Search.scss';
import { useLocation } from 'react-router-dom';
import { Sort } from '../../components/organisms';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const sortTypes = ['Recommended', 'Most Recent', 'Popular', 'Price High', 'Price Low', 'text'];
const sort = <Sort items={sortTypes} isSortShown onChange={() => {}} />;

const Search: React.FC = () => {
  const params = new URLSearchParams(useLocation().search);
  const searchQuery: string = params.get('query') ?? '';

  return (
    <div className="search-page">
      <div className="row">
        <h2 className="text-xxl text-bold">
          Search results for <span className="text-purple">{searchQuery}</span>
        </h2>
        <Tabs tabBarExtraContent={sort} className="search-page__tabs tabs">
          <TabPane tab="Items" key="items">
            <div>items</div>
          </TabPane>
          <TabPane tab="Users" key="users">
            <div>users</div>
          </TabPane>
          <TabPane tab="Collection" key="collection">
            <div>collection</div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default Search;
