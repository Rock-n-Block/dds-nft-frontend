import React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowImg from '../../assets/img/icons/swiper-arrow.svg';
import HotImg from '../../assets/img/mock/hot.jpg';
import NFTCard from '../NFTCard';

import './HotBids.scss';

SwiperCore.use([Navigation]);

const HotBids: React.FC = () => {
  const prevRef = React.useRef<HTMLDivElement>(null);
  const nextRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="h-bids">
      <div className="row">
        <h2 className="h-bids__title h1-md text-bold">Hot bids 🚀</h2>
        <div className="h-bids__box">
          <div ref={prevRef} className="swiper-navigation swiper-navigation-prev">
            <img src={ArrowImg} alt="arrow" />
          </div>
          <div ref={nextRef} className="swiper-navigation swiper-navigation-next">
            <img src={ArrowImg} alt="arrow" />
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            navigation={{
              prevEl: prevRef.current!, // Assert non-null
              nextEl: nextRef.current!, // Assert non-null
            }}
            onInit={(swiper) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = prevRef.current;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.update();
            }}
            className="h-bids__slider"
          >
            {new Array(10).fill(0).map(() => (
              <SwiperSlide className="h-bids__slide">
                <NFTCard
                  img={HotImg}
                  name="SuperPunks #21 Gamora"
                  auction={{
                    count: 200,
                    sold: 1,
                    bid: 3.33,
                  }}
                  artist={{
                    name: 'DicraKiller',
                  }}
                  owner={{
                    name: 'DicraKiller',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HotBids;
