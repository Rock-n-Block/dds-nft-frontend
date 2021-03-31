import React from 'react';
import { Masonry } from 'masonic';

import HotImg from '../../../assets/img/mock/hot.jpg';
import { NFTCard } from '../../molecules';
import Filter from '../Filter';

import './Explore.scss';

const Explore: React.FC = () => {
  const hotBids = [
    {
      img: HotImg,
      name: 'SuperPunks #21 Gamora',
      auction: {
        count: 100,
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
  const filters = ['Photography', 'Games', 'Metaverse', 'Music', 'Domains', 'DeFi', 'Memes'];

  const [test, setTest] = React.useState(hotBids);
  const [activeFilter, setActiveFilter] = React.useState(filters[0]);

  const renderCard = ({ data }: any) => {
    return <NFTCard {...data} />;
  };
  const handleFilterChange = (value: string[]): void => {
    console.log(value);
    setActiveFilter(value[0]);
    setTest(test.filter((item) => item.auction.count === 100));
  };
  return (
    <div className="explore">
      <div className="row">
        <h2 className="explore__title h1-md text-bold">Explore</h2>
        <Filter isAllFilterItem filters={filters} onChange={handleFilterChange} />
        <div className="explore__content">
          <Masonry
            key={activeFilter}
            items={test}
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

export default Explore;
