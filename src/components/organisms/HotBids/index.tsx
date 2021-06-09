import React, { useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowImg from '../../../assets/img/icons/swiper-arrow.svg';
import { NFTCard } from '../../molecules';

import './HotBids.scss';
import { storeApi } from '../../../services/api';
import HotImg from '../../../assets/img/mock/hot.jpg';

SwiperCore.use([Navigation]);

const HotBids: React.FC = () => {
  const [hotBids, setHotBids] = useState<any>([]);
  const prevRef = React.useRef<HTMLDivElement>(null);
  const nextRef = React.useRef<HTMLDivElement>(null);

  const renderCard = (data: any) => {
    if (data === undefined) return <></>;
    return (
      <NFTCard
        img={data.media ? `https://${data.media}` : HotImg}
        name={data.name}
        id={data.id}
        artist={{
          name: data.creator.name,
          id: data.creator.id,
          avatar: data.creator.avatar,
        }}
        owners={data.owners}
        available={data.available}
        selling={data.selling}
        price={data.price}
        service_fee={data.service_fee}
        minimal_bid={data.minimal_bid}
        highest_bid={data.highest_bid}
        total_supply={data.total_supply}
      />
    );
  };
  const loadHotBids = () => {
    storeApi
      .getHotBids()
      .then(({ data }) => {
        setHotBids(data);
        console.log(data, 'get hot bids');
      })
      .catch((err) => {
        console.log(err, 'get hot bids');
      });
  };
  useEffect(() => {
    loadHotBids();
  }, []);
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
            breakpoints={{
              550: {
                slidesPerView: 1,
              },
              761: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1360: {
                slidesPerView: 4,
              },
            }}
          >
            {hotBids.map((card: any) => (
              <SwiperSlide key={nextId()} className="h-bids__slide">
                {renderCard(card)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HotBids;
