import React from 'react';

import PreviewOwnerImg from '../../assets/img/mock/home-preview-owner.jpg';
import PreviewImg from '../../assets/img/mock/home-preview.jpg';
import ShadowImg from '../../assets/img/shadow.png';
import { Button, HotBids, TopUsers, UserMini } from '../../components';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import './Home.scss';

const Home: React.FC = () => {
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
        <HotBids />
      </div>
      <div className="home__top">
        <TopUsers />
      </div>
    </main>
  );
};

export default Home;
