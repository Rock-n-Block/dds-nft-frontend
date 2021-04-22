import React from 'react';
import { Masonry } from 'masonic';
import { observer } from 'mobx-react-lite';

import HotImg from '../../../assets/img/mock/hot.jpg';
import { NoItemsFound } from '../../atoms';
import { NFTCard } from '../../molecules';

import './UserCollectibles.scss';

const hotBids = [
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    bid: {
      count: 100,
      sold: 1,
      price: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
];

const UserCollectibles: React.FC = observer(() => {
  // const [test, setTest] = React.useState(hotBids);

  const renderCard = ({ data }: any) => {
    return <NFTCard {...data} />;
  };
  if (hotBids.length === 0) {
    return <NoItemsFound />;
  }
  return (
    <div className="user-collectibles">
      <div className="row">
        <div className="user-collectibles__content">
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
});

export default UserCollectibles;
