import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import {
  MasonryScroller,
  useContainerPosition,
  useInfiniteLoader,
  usePositioner,
  useResizeObserver,
} from 'masonic';

import HotImg from '../../../assets/img/mock/hot.jpg';
import { storeApi } from '../../../services/api';
import { NoItemsFound } from '../../atoms';
import { NFTCard } from '../../molecules';
import Filter from '../Filter';
import { ISortItem } from '../Sort';

import './Explore.scss';

const Explore: React.FC = () => {
  const [explore, setExplore] = useState<any>({});
  const [tags, setTags] = useState<Array<string>>(['all']);
  const sortItems: Array<ISortItem> = [
    // { key: 'recommend', value: 'Recommended' },
    { key: 'recent', value: 'Most Recent' },
    // { key: 'popular', value: 'Popular' },
    { key: 'highest', value: 'Price High' },
    { key: 'cheapest', value: 'Price Low' },
  ];
  const [activeSort, setActiveSort] = useState<ISortItem>(sortItems[0]);
  const [activeFilter, setActiveFilter] = useState(tags[0]);

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
  const loadTags = useCallback(() => {
    storeApi
      .getTags()
      .then(({ data }) => {
        setTags(data.tags);
      })
      .catch((err: any) => {
        console.log(err, 'get tags');
      });
  }, []);
  const loadExplore = useCallback(
    async (page = 1) => {
      storeApi
        .getExplore(page, activeFilter, activeSort.key)
        .then(({ data }) => {
          if (page !== 1) {
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
          } else
            setExplore({
              ...data,
            });
        })
        .catch((err: any) => {
          console.log(err, 'get tokens');
        });
    },
    [activeSort, activeFilter],
  );
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

  const handleFilterChange = (value: string[]): void => {
    setActiveFilter(value[0]);
  };
  const handleSortChange = (value: ISortItem): void => {
    setActiveSort(value);
  };
  const containerRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [windowWidth, windowHeight]);

  const positioner = usePositioner(
    { width: width || windowWidth, columnWidth: 320, columnGutter: 10 },
    [explore.tokens],
  );

  const resizeObserver = useResizeObserver(positioner);

  useEffect(() => {
    loadTags();
  }, [loadTags]);
  useEffect(() => {
    loadExplore();
  }, [loadExplore]);
  return (
    <div className="explore">
      <div className="row">
        <h2 className="explore__title h1-md text-bold">Explore</h2>
        <Filter
          isAllFilterItem
          filters={tags}
          onChange={handleFilterChange}
          onChangeSort={handleSortChange}
          sortItems={sortItems}
        />
        <div className="explore__content">
          {explore.tokens && explore.tokens.length ? (
            <MasonryScroller
              positioner={positioner}
              resizeObserver={resizeObserver}
              containerRef={containerRef}
              items={explore.tokens}
              height={windowHeight}
              offset={offset}
              overscanBy={5}
              render={renderCard}
              onRender={maybeLoadMore}
            />
          ) : (
            <NoItemsFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
