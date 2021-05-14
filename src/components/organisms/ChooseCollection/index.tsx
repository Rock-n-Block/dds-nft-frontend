import React from 'react';
import nextId from 'react-id-generator';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import PlusImg from '../../../assets/img/icons/plus.svg';
import ArrowImg from '../../../assets/img/icons/swiper-arrow.svg';
import { useMst } from '../../../store/store';

import './ChooseCollection.scss';

SwiperCore.use([Navigation]);

interface IChooseCollection {
  items: [
    {
      avatar: string;
      name: string;
      id: string;
    },
  ];
  isSingle?: boolean;
}

const ChooseCollection: React.FC<IChooseCollection> = observer(({ items, isSingle }) => {
  const formik = useFormikContext<any>();
  const { modals } = useMst();
  const prevRef = React.useRef<HTMLDivElement>(null);
  const nextRef = React.useRef<HTMLDivElement>(null);
  const [activeCollection, setActiveCollection] = React.useState('');

  const handleOpenModal = (): void => {
    modals.createCollection.open();
  };

  const changeCollection = React.useCallback(
    (id: string): void => {
      if (formik.values.collectionId !== id) {
        setActiveCollection(id);

        formik.setFieldValue('collectionId', id);
      }
    },
    [formik],
  );

  React.useEffect(() => {
    if (items.length) {
      changeCollection(items[0].id);
    }
  }, [items, changeCollection]);

  return (
    <div className="ch-coll">
      <div className="ch-coll__title text-grad text-lg text-bold">
        <span>Choose collection</span>
        <div
          className={classNames('ch-coll__nav-prev', {
            hidden: !items?.length,
          })}
          ref={prevRef}
        >
          <img src={ArrowImg} alt="" />
        </div>
        <div
          className={classNames('ch-coll__nav-next', {
            hidden: !items?.length,
          })}
          ref={nextRef}
        >
          <img src={ArrowImg} alt="" />
        </div>
      </div>
      <div className="ch-coll__content">
        <Swiper
          className="ch-coll__slider"
          spaceBetween={20}
          slidesPerView={3}
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
          <SwiperSlide className="ch-coll__slide" key={nextId()}>
            <div
              className="ch-coll__item box-shadow"
              onClick={handleOpenModal}
              onKeyDown={handleOpenModal}
              role="button"
              tabIndex={0}
            >
              <div className="ch-coll__item-img">
                <img src={PlusImg} alt="new" />
              </div>
              <div className="ch-coll__item-title text-md text-bold">Create</div>
              <div className="text-bold text-gray-l">{isSingle ? 'ERC-721' : 'ERC-1185'}</div>
            </div>
          </SwiperSlide>
          {items &&
            items.map((item) => (
              <SwiperSlide className="ch-coll__slide" key={nextId()}>
                <div
                  className={classNames('ch-coll__item box-shadow', {
                    active: activeCollection === item.id,
                  })}
                  onClick={() => changeCollection(item.id.toString())}
                  onKeyDown={() => changeCollection(item.id.toString())}
                  role="button"
                  tabIndex={0}
                >
                  <div className="ch-coll__item-img">
                    <img src={`https://${item.avatar}`} alt="dds" />
                  </div>
                  <div className="ch-coll__item-title text-md text-bold">{item.name}</div>
                  <div className="text-bold text-gray-l">{isSingle ? 'ERC-721' : 'ERC-1155'}</div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
});

export default ChooseCollection;
