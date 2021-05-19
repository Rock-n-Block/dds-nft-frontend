import React, { useState } from 'react';

// import PreviewOwnerImg from '../../assets/img/mock/home-preview-owner.jpg';
import HotImg from '../../assets/img/mock/hot.jpg';
import ShadowImg from '../../assets/img/shadow.png';
import { Button, UserMini } from '../../components/atoms';
import { Explore, HotBids, HotCollections, Search } from '../../components/organisms';
import { storeApi, userApi } from '../../services/api';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import './Home.scss';

const Home: React.FC = () => {
  const [collections, setCollections] = useState<any>([]);
  const [cover, setCover] = useState<any>({});
  const hotBids = [
    {
      img: HotImg,
      name: 'SuperPunks #21 Gamora',
      selling: true,
      price: null,
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
      selling: true,
      price: null,
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
      selling: true,
      price: null,
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
      selling: true,
      price: null,
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
      selling: true,
      price: null,
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
      selling: true,
      price: null,
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
      selling: true,
      price: null,
      artist: {
        name: 'DicraKiller',
      },
      owner: {
        name: 'DicraKiller',
      },
    },
  ];
  /* const topUsers = [
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
  ]; */
  const loadCollections = () => {
    storeApi
      .getCollections()
      .then(({ data }) => {
        setCollections((prevCollections: any) => [...prevCollections, ...data]);
      })
      .catch((err) => {
        console.log(err, 'get collections');
      });
  };
  const loadRandomCover = () => {
    userApi
      .getRandomCover()
      .then(({ data }) => {
        setCover(data);
      })
      .catch((err) => {
        console.log(err, 'get collections');
      });
  };
  React.useEffect(() => {
    loadCollections();
    loadRandomCover();
  }, []);
  return (
    <main className="home">
      <div
        className="home__preview"
        style={{ backgroundImage: `url(${ShadowImg}), url(https://${cover.cover})` }}
      >
        <div className="home__preview-owner">
          <UserMini
            id={cover.id}
            img={cover.avatar}
            topText={<span className="text-gray text-mm text-upper">Owner</span>}
            bottomText={<span className="text-purple-l">{cover.owner}</span>}
          />
        </div>
        <div className="home__preview-search">
          <Search placeholder="Search items, collections, and accounts" />
        </div>
        <div className="row">
          <h1 className="home__preview-title h1 text-white text-center text-bolder">
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
      {/*
      <div className="home__top">
        <TopUsers users={topUsers} />
      </div> */}
      {collections.length ? (
        <div className="home__collections">
          <HotCollections items={collections} />
        </div>
      ) : (
        ''
      )}
      <div className="home__explore" id="explore">
        <Explore />
      </div>
    </main>
  );
};

export default Home;
