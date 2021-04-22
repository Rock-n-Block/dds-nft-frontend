import React, { useEffect } from 'react';
import { Masonry } from 'masonic';

import { storeApi } from '../../../services/api';
import { NoItemsFound } from '../../atoms';
import { NFTCard } from '../../molecules';

interface UserLikedProps {
  address: string;
}
const hotBids: any[] = [];

const UserLiked: React.FC<UserLikedProps> = ({ address }) => {
  const renderCard = ({ data }: any) => {
    return <NFTCard {...data} />;
  };

  const loadLiked = () => {
    storeApi
      .getLiked(address)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err, 'get liked');
      });
  };
  useEffect(() => {
    loadLiked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (hotBids.length === 0) {
    return <NoItemsFound />;
  }
  return (
    <div>
      <div className="row">
        <div className="liked__content">
          <Masonry
            items={hotBids}
            columnGutter={10}
            columnWidth={320}
            overscanBy={5}
            render={renderCard}
          />
        </div>
      </div>
    </div>
  );
};

export default UserLiked;
