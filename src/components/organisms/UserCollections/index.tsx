import React, { useCallback, useEffect, useState } from 'react';
import { Masonry } from 'masonic';
import { observer } from 'mobx-react-lite';

import { userApi } from '../../../services/api';
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
  const loadUserCollections = useCallback(() => {
    userApi
      .getSingleCollections(address)
      .then(({ data }) => {
        setCollectionsCards(data);
      })
      .catch((err: any) => {
        console.log(err, 'get created');
      });
  }, [address]);
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
