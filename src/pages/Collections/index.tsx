import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Masonry, useInfiniteLoader } from 'masonic';

import PreviewImg from '../../assets/img/mock/home-preview.jpg';
import HotImg from '../../assets/img/mock/hot.jpg';
import userAvatar from '../../assets/img/mock/user-avatar.png';
import ShadowImg from '../../assets/img/shadow.png';
import { NFTCard, PageOverview } from '../../components/molecules';
import { storeApi } from '../../services/api';
import { Tabs } from 'antd';
import { NoItemsFound } from '../../components/atoms';
import './Collections.scss';

const { TabPane } = Tabs;
const Collections: React.FC = () => {
  const [collection, setCollection] = React.useState<any>({});
  const [collectionForSale, setCollectionForSale] = React.useState<any>({});

  const { collectionId } = useParams<{ collectionId: string | undefined }>();

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
  const loadCollection = useCallback(
    async (page = 1) => {
      return storeApi
        .getCollectionById(collectionId ?? 0, page)
        .then(({ data }) => {
          setCollection((prevCards: any) => {
            if (prevCards.tokens) {
              return {
                ...prevCards,
                tokens: [...prevCards.tokens, ...data.tokens],
                length: data.tokens.length,
              };
            }
            return { ...prevCards, ...data, length: data.tokens.length };
          });
          setCollectionForSale((prevCards: any) => {
            const saleTokens = data?.tokens.filter((token: any) => token.selling);
            if (prevCards.tokens) {
              return {
                ...prevCards,
                tokens: [...prevCards.tokens, ...saleTokens],
                length: saleTokens.length,
              };
            }
            return { ...prevCards, tokens: saleTokens, length: saleTokens.length };
          });
        })
        .catch((err: any) => {
          console.log(err, 'get tokens');
        });
    },
    [collectionId],
  );
  let prevPage = 1;
  const maybeLoadMore = useInfiniteLoader(
    async () => {
      const page = (collection.tokens.length + 50) / 50;
      if (prevPage !== page) {
        prevPage = page;
        await loadCollection(page);
      }
    },
    {
      isItemLoaded: () => {
        if (collection.tokens.length >= collection.length) {
          return true;
        }
        return false;
      },
    },
  );

  React.useEffect(() => {
    loadCollection();
  }, [loadCollection]);
  return (
    <div className="collections">
      <div
        className="user__cap"
        style={{ backgroundImage: `url(${ShadowImg}), url(${PreviewImg})` }}
      />
      <div className="row">
        <PageOverview
          id={collection?.id}
          name={collection?.name ?? 'CollectionName'}
          wallet={collection?.address ?? 'wallet address'}
          avatarSrc={collection?.avatar ? `https://${collection?.avatar}` : userAvatar}
          description={collection?.description}
          parentComponent="Collections"
        />
        <Tabs className="tabs">
          <TabPane tab="On sale" key="on-sale">
            <div className="collections__content">
              {collectionForSale.tokens ? (
                <Masonry
                  items={collectionForSale.tokens}
                  columnGutter={10}
                  columnWidth={320}
                  overscanBy={5}
                  render={renderCard}
                />
              ) : (
                <NoItemsFound />
              )}
            </div>
          </TabPane>
          <TabPane tab="Collectibles" key="collectibles">
            <div className="collections__content">
              {collection.tokens && collection.tokens.length ? (
                <Masonry
                  items={collection.tokens}
                  columnGutter={10}
                  columnWidth={320}
                  overscanBy={5}
                  render={renderCard}
                  onRender={maybeLoadMore}
                />
              ) : (
                <NoItemsFound />
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default Collections;
