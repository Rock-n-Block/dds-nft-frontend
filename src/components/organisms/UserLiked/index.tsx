import React, { useCallback, useEffect, useState } from 'react';
import { Masonry, useInfiniteLoader } from 'masonic';

import HotImg from '../../../assets/img/mock/hot.jpg';
import { storeApi } from '../../../services/api';
import { NoItemsFound } from '../../atoms';
import { NFTCard } from '../../molecules';

interface UserLikedProps {
  address: string;
}

const UserLiked: React.FC<UserLikedProps> = ({ address }) => {
  const [likedCards, setLikedCards] = useState<any>({});
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

  const loadUserLiked = useCallback(
    async (page = 1) => {
      return storeApi
        .getLiked(address, page)
        .then(({ data }) => {
          setLikedCards((prevCreated: any) => {
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
      const page = (likedCards.tokens.length + 50) / 50;
      if (prevPage !== page) {
        prevPage = page;
        await loadUserLiked(page);
      }
    },
    {
      isItemLoaded: () => {
        if (likedCards.tokens.length >= likedCards.length) {
          return true;
        }
        return false;
      },
    },
  );
  useEffect(() => {
    loadUserLiked();
  }, [loadUserLiked]);
  return (
    <div>
      <div className="row">
        <div className="liked__content">
          {likedCards.tokens && likedCards.tokens.length ? (
            <Masonry
              items={likedCards.tokens}
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

export default UserLiked;
