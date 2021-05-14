import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { Masonry, useInfiniteLoader } from 'masonic';
import { observer } from 'mobx-react-lite';

import HotImg from '../../assets/img/mock/hot.jpg';
import userAvatar from '../../assets/img/mock/user-avatar.png';
import { NoItemsFound } from '../../components/atoms';
import { NFTCard, PageOverview } from '../../components/molecules';
import PageCover from '../../components/molecules/PageCover';
import { storeApi } from '../../services/api';
import { useMst } from '../../store/store';

import './Collections.scss';

const { TabPane } = Tabs;
const Collections: React.FC = observer(() => {
  const [collection, setCollection] = React.useState<any>({});
  const [collectionForSale, setCollectionForSale] = React.useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, modals } = useMst();
  const { collectionId } = useParams<{ collectionId: string | undefined }>();
  const [self, setSelf] = useState<boolean>(false);

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
      />
    );
  };
  const loadCollection = useCallback(
    async (page = 1) => {
      return storeApi
        .getCollectionById(collectionId ?? 0, page)
        .then(({ data }) => {
          setSelf(user.id === data.creator.id);
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
    [user.id, collectionId],
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

  const handleUpload = (file: any) => {
    setIsLoading(true);
    storeApi
      .setCollectionCover(file, collectionId ?? '0')
      .then(({ data }) => {
        setIsLoading(false);
        modals.uploadCover.close();
        modals.success.setSuccessMsg('Congrats you changed collection cover!');
        setCollection((prevState: any) => {
          return {
            ...prevState,
            cover: data,
          };
        });
      })
      .catch((err) => {
        console.log(err, 'set cover');
      });
  };
  React.useEffect(() => {
    loadCollection();
  }, [loadCollection]);
  return (
    <div className="collections">
      <PageCover
        self={self}
        img={collection?.cover ?? ''}
        handleUpload={handleUpload}
        isLoading={isLoading}
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
});
export default Collections;
