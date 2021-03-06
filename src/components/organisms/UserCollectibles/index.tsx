import React, { useRef } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import { MasonryScroller, useContainerPosition, usePositioner, useResizeObserver } from 'masonic';
import { observer } from 'mobx-react-lite';

import HotImg from '../../../assets/img/mock/hot.jpg';
import { NoItemsFound } from '../../atoms';
import { NFTCard } from '../../molecules';

import './UserCollectibles.scss';

interface UserCollectiblesProps {
  cards: any;
}
const UserCollectibles: React.FC<UserCollectiblesProps> = observer(({ cards }) => {
  const renderCard = ({ data }: any) => {
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
        total_supply={data.total_supply}
      />
    );
  };

  const containerRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [windowWidth, windowHeight]);
  const boxWidth = window.innerWidth < 1360 ? windowWidth - 40 : 1340;

  const positioner = usePositioner(
    { width: width || boxWidth, columnWidth: 320, columnGutter: 10 },
    [cards.tokens],
  );

  const resizeObserver = useResizeObserver(positioner);
  return (
    <div className="user-collectibles">
      <div className="row">
        <div className="user-collectibles__content">
          {cards.tokens && cards.tokens.length ? (
            <MasonryScroller
              positioner={positioner}
              resizeObserver={resizeObserver}
              containerRef={containerRef}
              items={cards.tokens}
              height={windowHeight}
              offset={offset}
              overscanBy={5}
              render={renderCard}
            />
          ) : (
            <NoItemsFound />
          )}
        </div>
      </div>
    </div>
  );
});

export default UserCollectibles;
