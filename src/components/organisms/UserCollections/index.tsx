import React, { useCallback, useEffect, useState } from 'react';
import { Masonry, useInfiniteLoader } from 'masonic';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../../services/api';
import { NoItemsFound } from '../../atoms';
import HotCollectionCard from '../../molecules/HotCollectionCard';

interface UserCollectionsProps {
  address: string;
}

const UserCollections: React.FC<UserCollectionsProps> = observer(({ address }) => {
  const [collectionsCards, setCollectionsCards] = useState<any>({});
  const renderCard = ({ data }: any) => {
    return (
      <HotCollectionCard
        name={data.name}
        id={data.id}
        tokens={data.tokens}
        notDisplayUser
        user={{
          id: data.creator.id,
          avatar: data.creator.avatar,
          name: data.creator.name,
        }}
      />
    );
  };
  const loadUserCollections = useCallback(
    async (page = 1) => {
      return storeApi
        .getUserCollections(address, page)
        .then(({ data }) => {
          setCollectionsCards((prevCreated: any) => {
            if (prevCreated.collections) {
              return {
                ...prevCreated,
                collections: [...prevCreated.collections, ...data],
                length: data.length,
              };
            }
            return {
              collections: [...data],
              length: data.length,
            };
          });
          console.log('success get created', data);
        })
        .catch((err: any) => {
          console.log(err, 'get created');
        });
    },
    [address],
  );
  let prevPage = 1;
  const maybeLoadMore = useInfiniteLoader(
    async () => {
      const page = (collectionsCards.collections.length + 50) / 50;
      if (prevPage !== page) {
        prevPage = page;
        await loadUserCollections(page);
      }
    },
    {
      isItemLoaded: () => {
        if (collectionsCards.collections.length >= collectionsCards.length) {
          return true;
        }
        return false;
      },
    },
  );
  useEffect(() => {
    loadUserCollections();
  }, [loadUserCollections]);
  return (
    <div className="user-collectibles">
      <div className="row">
        <div className="user-collectibles__content">
          {collectionsCards.collections && collectionsCards.collections.length ? (
            <Masonry
              items={collectionsCards.collections}
              columnGutter={20}
              columnWidth={320}
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
});

export default UserCollections;
