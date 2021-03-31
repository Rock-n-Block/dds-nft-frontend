import React from 'react';

import PreviewOwnerImg from '../../assets/img/mock/home-preview-owner.jpg';
import PreviewImg from '../../assets/img/mock/home-preview.jpg';
import HotImg from '../../assets/img/mock/hot.jpg';
import ShadowImg from '../../assets/img/shadow.png';
import { Button, UserMini } from '../../components/atoms';
import { Explore, HotBids, HotCollections, TopUsers } from '../../components/organisms';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import './Home.scss';

const Home: React.FC = () => {
  const hotBids = [
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
  const topUsers = [
    {
      img: PreviewOwnerImg,
      id: 1,
      topText: 'DicraKiller',
      bottomText: '355 EHT',
    },
    {
      img: PreviewOwnerImg,
      id: 2,
      topText: 'DicraKiller',
      bottomText: '355 EHT',
    },
    {
      img: PreviewOwnerImg,
      id: 3,
      topText: 'DicraKiller',
      bottomText: '355 EHT',
    },
    {
      img: PreviewOwnerImg,
      id: 4,
      topText: 'DicraKiller',
      bottomText: '355 EHT',
    },
  ];
  const hotCollections = [
    {
      tokens: [HotImg, HotImg, HotImg],
      user: {
        img: PreviewOwnerImg,
        name: 'DicraKiller',
      },
    },
    {
      tokens: [HotImg, HotImg, HotImg, HotImg, HotImg, HotImg],
      user: {
        img: PreviewOwnerImg,
        name: 'DicraKiller',
      },
    },
    {
      tokens: [HotImg, HotImg, HotImg, HotImg, HotImg, HotImg],
      user: {
        img: PreviewOwnerImg,
        name: 'DicraKiller',
      },
    },
    {
      tokens: [HotImg, HotImg, HotImg, HotImg, HotImg, HotImg],
      user: {
        img: PreviewOwnerImg,
        name: 'DicraKiller',
      },
    },
    {
      tokens: [HotImg, HotImg, HotImg, HotImg, HotImg, HotImg],
      user: {
        img: PreviewOwnerImg,
        name: 'DicraKiller',
      },
    },
    {
      tokens: [HotImg, HotImg, HotImg, HotImg, HotImg, HotImg],
      user: {
        img: PreviewOwnerImg,
        name: 'DicraKiller',
      },
    },
    {
      tokens: [HotImg, HotImg, HotImg, HotImg, HotImg, HotImg],
      user: {
        img: PreviewOwnerImg,
        name: 'DicraKiller',
      },
    },
  ];
  return (
    <main className="home">
      <div
        className="home__preview"
        style={{ backgroundImage: `url(${ShadowImg}), url(${PreviewImg})` }}
      >
        <div className="home__preview-owner">
          <UserMini
            img={PreviewOwnerImg}
            topText={<span className="text-gray text-mm text-upper">Owner</span>}
            bottomText={<span className="text-purple-l">DicraKiller</span>}
          />
        </div>
        <div className="row">
          <h1 className="home__preview-title h1 text-white text-center text-bold">
            NFT marketplace
          </h1>
          <p className="home__preview-text text-xl text-white text-center">
            Buy, sell, and discover rare digital items
          </p>
          <Button size="lg" colorScheme="white" link="/create" linkClassName="home__preview-btn">
            Create
          </Button>
        </div>
      </div>
      <div className="home__hot">
        <HotBids cards={hotBids} />
      </div>
      <div className="home__top">
        <TopUsers users={topUsers} />
      </div>
      <div className="home__collections">
        <HotCollections items={hotCollections} />
      </div>
      <div className="home__explore">
        <Explore />
      </div>
    </main>
  );
};

export default Home;
