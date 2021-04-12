import React from 'react';
import { Masonry } from 'masonic';

import HotImg from '../../../assets/img/mock/hot.jpg';
import { NoItemsFound } from '../../atoms';
import { NFTCard } from '../../molecules';

import './UserOnSale.scss';

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
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
  {
    img: HotImg,
    name: 'SuperPunks #21 Gamora',
    auction: {
      count: 200,
      sold: 1,
      bid: 3.33,
    },
    artist: {
      name: 'DicraKiller',
    },
    owner: {
      name: 'DicraKiller',
    },
  },
];

const UserOnSale: React.FC = () => {
  // const [test, setTest] = React.useState(hotBids);

  const renderCard = ({ data }: any) => {
    return <NFTCard {...data} />;
  };

  if (hotBids.length === 0) {
    return <NoItemsFound />;
  }
  return (
    <div className="on-sale">
      <div className="row">
        <div className="on-sale__content">
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

export default UserOnSale;
