import React from 'react';
import nextId from 'react-id-generator';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowImg from '../../../assets/img/icons/swiper-arrow.svg';
import HotCollectionCard from '../../molecules/HotCollectionCard';

import './HotCollections.scss';

SwiperCore.use([Navigation]);

interface IHotCollections {
  items: any;
}

const HotCollections: React.FC<IHotCollections> = ({ items }) => {
  const prevRef = React.useRef<HTMLDivElement>(null);
  const nextRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="h-collections">
      <div className="row">
        <h2 className="h-collections__title text-bold h1-md">Hot collections</h2>
        <div className="h-collections__slider">
          <div ref={prevRef} className="swiper-navigation swiper-navigation-prev">
            <img src={ArrowImg} alt="arrow" />
          </div>
          <div ref={nextRef} className="swiper-navigation swiper-navigation-next">
            <img src={ArrowImg} alt="arrow" />
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
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
          >
            {items.map((item: any) => (
              <SwiperSlide className="h-collections__slide" key={nextId()}>
                <HotCollectionCard
                  name={item.name}
                  id={item.id}
                  tokens={item.tokens}
                  user={{
                    id: item.creator.id,
                    avatar: item.creator.avatar,
                    name: item.creator.name,
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

export default HotCollections;
