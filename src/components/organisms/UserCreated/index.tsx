import React, { useCallback, useEffect, useState } from 'react';

import { NoItemsFound } from '../../atoms';
import { Masonry, useInfiniteLoader } from 'masonic';
import { NFTCard } from '../../molecules';
import { storeApi } from '../../../services/api';
import HotImg from '../../../assets/img/mock/hot.jpg';
import './UserCreated.scss';

interface UserCreatedProps {
  address: string;
}
const UserCreated: React.FC<UserCreatedProps> = ({ address }) => {
  const [createdCards, setCreatedCards] = useState<any>({});
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
  const loadUserCreated = useCallback(
    async (page = 1) => {
      return storeApi
        .getCreated(address, page)
        .then(({ data }) => {
          setCreatedCards((prevCreated: any) => {
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
      const page = (createdCards.tokens.length + 50) / 50;
      if (prevPage !== page) {
        prevPage = page;
        await loadUserCreated(page);
      }
    },
    {
      isItemLoaded: () => {
        if (createdCards.tokens.length >= createdCards.length) {
          return true;
        }
        return false;
      },
    },
  );
  useEffect(() => {
    loadUserCreated();
  }, [loadUserCreated]);
  return (
    <div className="user-created">
      <div className="row">
        <div className="user-created__content">
          {createdCards.tokens && createdCards.tokens.length ? (
            <Masonry
              items={createdCards.tokens}
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
};

export default UserCreated;
