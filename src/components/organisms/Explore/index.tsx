import React from 'react';
import { Masonry, useInfiniteLoader } from 'masonic';

import HotImg from '../../../assets/img/mock/hot.jpg';
import { storeApi } from '../../../services/api';
import { NFTCard } from '../../molecules';
import Filter from '../Filter';

import './Explore.scss';

const Explore: React.FC = () => {
  const [explore, setExplore] = React.useState<any>({});
  const filters = ['Photography', 'Games', 'Metaverse', 'Music', 'Domains', 'DeFi', 'Memes'];

  const sortItems = ['Recommended', 'Most Recent', 'Popular', 'Price High', 'Price Low'];

  const [activeFilter, setActiveFilter] = React.useState(filters[0]);

  const renderCard = ({ data }: any) => {
    return (
      <NFTCard
        img={data.media ? `https://${data.media}` : HotImg}
        name={data.name}
        id={data.id}
        bid={{
          price: data.price,
          sold: data.total_supply - data.available,
          count: data.total_supply,
        }}
        artist={{
          name: data.creator.name,
          id: data.creator.id,
          avatar: data.creator.avatar,
        }}
        owner={{
          name: data.owner.name,
          id: data.owner.id,
          avatar: data.owner.avatar,
        }}
      />
    );
  };
  const loadExplore = React.useCallback(async (page = 1) => {
    return storeApi
      .getExplore(page)
      .then(({ data }) => {
        setExplore((prevExplore: any) => {
          if (prevExplore.tokens) {
            return {
              ...prevExplore,
              tokens: [...prevExplore.tokens, ...data.tokens],
              length: data.length,
            };
          }
          return { ...prevExplore, ...data };
        });
      })
      .catch((err: any) => {
        console.log(err, 'get tokens');
      });
  }, []);
  let prevPage = 1;
  const maybeLoadMore = useInfiniteLoader(
    async () => {
      const page = (explore.tokens.length + 50) / 50;
      if (prevPage !== page) {
        prevPage = page;
        await loadExplore(page);
      }
    },
    {
      isItemLoaded: () => {
        if (explore.tokens.length >= explore.length) {
          return true;
        }
        return false;
      },
    },
  );

  React.useEffect(() => {
    loadExplore();
  }, [loadExplore]);
  const handleFilterChange = (value: string[]): void => {
    console.log(value);
    setActiveFilter(value[0]);
  };
  const handleSortChage = (value: string): void => {
    console.log(value);
  };
  return (
    <div className="explore">
      <div className="row">
        <h2 className="explore__title h1-md text-bold">Explore</h2>
        <Filter
          isAllFilterItem
          filters={filters}
          onChange={handleFilterChange}
          onChangeSort={handleSortChage}
          sortItems={sortItems}
        />
        <div className="explore__content">
          {explore.tokens && explore.tokens.length ? (
            <Masonry
              key={activeFilter}
              items={explore.tokens}
              columnGutter={10}
              columnWidth={320}
              overscanBy={5}
              render={renderCard}
              onRender={maybeLoadMore}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
