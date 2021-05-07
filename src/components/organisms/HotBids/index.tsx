import React from 'react';
import nextId from 'react-id-generator';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowImg from '../../../assets/img/icons/swiper-arrow.svg';
import { NFTCard } from '../../molecules';
import { INFTCard } from '../../molecules/NFTCard';

import './HotBids.scss';

SwiperCore.use([Navigation]);

interface IHotBids {
  cards: INFTCard[];
}

const HotBids: React.FC<IHotBids> = ({ cards }) => {
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
            slidesPerGroup={1}
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
            {cards.map((card) => (
              <SwiperSlide key={nextId()} className="h-bids__slide">
                <NFTCard {...card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HotBids;
