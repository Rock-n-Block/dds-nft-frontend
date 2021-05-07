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
        bid={{
          price: data.price,
          sold: data.total_supply - data.available,
          count: data.total_supply,
        }}
        artist={{
          name: data.creator.name,
          id: data.creator.id,
          avatar: data.creator.avatar,
        }}
        owner={{
          name: data.owner.name,
          id: data.owner.id,
          avatar: data.owner.avatar,
        }}
      />
    );
  };

  const containerRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [windowWidth, windowHeight]);

  const positioner = usePositioner(
    { width: width || windowWidth, columnWidth: 320, columnGutter: 10 },
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
