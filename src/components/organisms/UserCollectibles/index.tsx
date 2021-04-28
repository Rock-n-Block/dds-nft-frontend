import React, { useCallback, useEffect, useState } from 'react';
import { Masonry, useInfiniteLoader } from 'masonic';
import { observer } from 'mobx-react-lite';

import HotImg from '../../../assets/img/mock/hot.jpg';
import { storeApi } from '../../../services/api';
import { NoItemsFound } from '../../atoms';
import { NFTCard } from '../../molecules';

import './UserCollectibles.scss';

interface UserCollectiblesProps {
  address: string;
}
const UserCollectibles: React.FC<UserCollectiblesProps> = observer(({ address }) => {
  const [collectiblesCards, setCollectiblesCards] = useState<any>({});
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

  const loadUserCollectibles = useCallback(
    async (page = 1) => {
      return storeApi
        .getCollectibles(address, page)
        .then(({ data }) => {
          setCollectiblesCards((prevCreated: any) => {
            if (prevCreated.tokens) {
              return {
                ...prevCreated,
                tokens: [...prevCreated.tokens, ...data],
                length: data.length,
              };
            }
            return {
              tokens: [...data],
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
      const page = (collectiblesCards.tokens.length + 50) / 50;
      if (prevPage !== page) {
        prevPage = page;
        await loadUserCollectibles(page);
      }
    },
    {
      isItemLoaded: () => {
        if (collectiblesCards.tokens.length >= collectiblesCards.length) {
          return true;
        }
        return false;
      },
    },
  );
  useEffect(() => {
    loadUserCollectibles();
  }, [loadUserCollectibles]);
  return (
    <div className="user-collectibles">
      <div className="row">
        <div className="user-collectibles__content">
          {collectiblesCards.tokens && collectiblesCards.tokens.length ? (
            <Masonry
              items={collectiblesCards.tokens}
              columnGutter={10}
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

export default UserCollectibles;
