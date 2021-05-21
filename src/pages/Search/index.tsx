import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import { Masonry } from 'masonic';

import HotImg from '../../assets/img/mock/hot.jpg';
import { NoItemsFound } from '../../components/atoms';
import { NFTCard } from '../../components/molecules';
import HotCollectionCard from '../../components/molecules/HotCollectionCard';
import { storeApi } from '../../services/api';

import './Search.scss';
import nextId from 'react-id-generator';
import FollowCard from '../../components/molecules/FollowCard';
import { useMst } from '../../store/store';

const { TabPane } = Tabs;

const Search: React.FC = () => {
  const { user } = useMst();
  const params = new URLSearchParams(useLocation().search);
  const searchQuery: string = params.get('to_search') ?? '';

  const [searchResults, setSearchResults] = useState<any>({
    tokens: [],
    users: [],
    collections: [],
  });

  const [searchTab, setSearchTab] = useState<string>('items');

  const handleTabChange = (tab: string) => {
    console.log(searchResults);
    setSearchTab(tab);
  };
  const renderTokenCard = ({ data }: any) => {
    return (
      <NFTCard
        img={data.media ? `https://${data.media}` : HotImg}
        name={data.name}
        id={data.id}
        artist={{
          name: data.creator.name,
          id: data.creator.id,
          avatar: data.creator.avatar,
        }}
        owners={data.owners}
        available={data.available}
        selling={data.selling}
        price={data.price}
        service_fee={data.service_fee}
      />
    );
  };
  const renderCollectionCard = ({ data }: any) => {
    return <HotCollectionCard name={data.name} id={data.id} tokens={data.tokens} notDisplayUser />;
  };
  const loadSearchResults = useCallback(
    async (page = 1) => {
      return storeApi
        .getSearchResults({ text: searchQuery, page }, searchTab)
        .then(({ data }) => {
          setSearchResults((prevSearchResults: any) => {
            const tokenItems: Array<any> = searchTab === 'items' ? data : prevSearchResults.tokens;
            const userItems: Array<any> = searchTab === 'users' ? data : prevSearchResults.users;
            const collectionItems: Array<any> =
              searchTab === 'collections' ? data : prevSearchResults.collections;
            return {
              tokens: tokenItems,
              users: userItems,
              collections: collectionItems,
            };
          });
        })
        .catch((err: any) => {
          console.log(err, 'get search results');
        });
    },
    [searchTab, searchQuery],
  ); // TODO: lazy loading

  useEffect(() => {
    loadSearchResults();
  }, [loadSearchResults]);

  return (
    <div className="search-page">
      <div className="row">
        <h2 className="text-xxl text-bold">
          Search results for <span className="text-purple">{searchQuery}</span>
        </h2>
        <Tabs className="search-page__tabs tabs" onChange={(tab) => handleTabChange(tab)}>
          <TabPane tab="Items" key="items">
            <div className="search-page__content">
              {searchResults.tokens && Object.keys(searchResults.tokens).length ? (
                <Masonry
                  items={searchResults.tokens}
                  columnGutter={10}
                  columnWidth={320}
                  overscanBy={5}
                  render={renderTokenCard}
                />
              ) : (
                <NoItemsFound />
              )}
            </div>
          </TabPane>
          <TabPane tab="Users" key="users">
            <div className="search-page__content">
              {searchResults.users && Object.keys(searchResults.users).length ? (
                searchResults.users.map((currentUser: any) => (
                  <FollowCard
                    tokens={currentUser.tokens}
                    id={currentUser.id}
                    followersCount={currentUser.followers_count}
                    name={currentUser.name}
                    avatar={currentUser.avatar}
                    follows={user.follows}
                    key={nextId()}
                  />
                ))
              ) : (
                <NoItemsFound />
              )}
            </div>
          </TabPane>
          <TabPane tab="Collections" key="collections">
            <div className="search-page__content">
              {searchResults.collections && Object.keys(searchResults.collections).length ? (
                <Masonry
                  items={searchResults.collections}
                  columnGutter={10}
                  columnWidth={320}
                  overscanBy={5}
                  render={renderCollectionCard}
                  // onRender={maybeLoadMoreTokens}
                />
              ) : (
                <NoItemsFound />
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default Search;
