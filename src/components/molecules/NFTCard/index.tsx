import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js/bignumber';
import { observer } from 'mobx-react-lite';

import { userApi } from '../../../services/api';
import { useMst } from '../../../store/store';
import { Button, Like, OwnersMini, UserMini } from '../../atoms';

import './NFTCard.scss';

export interface INFTCard {
  img: string;
  name: string;
  id?: number;
  artist: {
    name: string;
    id?: number | string;
    avatar?: string;
  };
  owners?: Array<{
    name: string;
    id?: number | string;
    avatar?: string;
  }>;
  disableLinks?: boolean;

  available?: number;
  selling?: boolean;
  price?: number | null;
  service_fee?: number;
}

const NFTCard: React.FC<INFTCard> = observer(
  ({ img, name, id, artist, owners, disableLinks, available, selling, price, service_fee }) => {
    const { user, modals } = useMst();
    const [isMyToken, setMyToken] = React.useState(false);

    const handleOpenModal = (): void => {
      modals.auction.open({
        token: {
          id,
          name,
        },
        artist: {
          id: artist.id,
          name: artist.name,
        },
        available,
        fee: service_fee,
      });
    };
    const [isLike, setIsLike] = useState<boolean>(false);
    const handleLike = (): void => {
      userApi
        .like({ id })
        .then(({ data }) => {
          if (data === 'liked') {
            setIsLike(true);
            user.addLike(id ?? 0);
          } else {
            setIsLike(false);
            user.removeLike(id ?? 0);
          }
        })
        .catch((err) => {
          console.log(err, 'handle like');
        });
    };
    useEffect(() => {
      if (user.likes.length && id) {
        setIsLike(user.isLiked(id));
      }
    }, [id, user, user.id]);

    useEffect(() => {
      if (user.id && owners?.length) {
        if (owners.find((owner: any) => owner.id === user.id)) {
          setMyToken(true);
        } else {
          setMyToken(false);
        }
      }
    }, [user, user.id, owners]);

    return (
      <div className="nft-card">
        {disableLinks ? (
          <div className="nft-card__box-img">{img ? <img src={img} alt="hot" /> : ''}</div>
        ) : (
          <Link to={`/token/${id}`} className="nft-card__box-img">
            {img ? <img src={img} alt="hot" /> : ''}
          </Link>
        )}
        <div className="nft-card__content">
          <div className="nft-card__box">
            {disableLinks ? (
              <div className="nft-card__name text-bold text-black">{name}</div>
            ) : (
              <Link to={`/token/${id}`} className="nft-card__name text-bold text-black">
                {name}
              </Link>
            )}
            {!price && selling ? (
              <>
                <div className="nft-card__auction">
                  <div className="nft-card__auction-text text-purple-l text-bold">Auction</div>
                  <div className="nft-card__auction-text text-gray text-bold">
                    {available} of {available}
                  </div>
                </div>
                <div className="nft-card__auction nft-card__auction-bid">
                  <div className="nft-card__auction-text text-gray text-bold">Highest bid</div>
                  <div className="nft-card__auction-bid-box box-shadow">
                    <span className="text-grad text-bold">
                      bid WETH
                      {/* {new BigNumber(auction?.bid).toFixed()} ETH */}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              ''
            )}

            {!selling ? (
              <div className="nft-card__auction">
                <div className="nft-card__auction-bid-box box-shadow">
                  <span className="text-grad text-bold">Not for sale</span>
                </div>
              </div>
            ) : (
              ''
            )}

            {price && selling ? (
              <div className="nft-card__auction">
                <div className="nft-card__auction-bid-box box-shadow">
                  <span className="text-grad text-bold">
                    {new BigNumber(price).toFixed(5) === '0.00000'
                      ? '0'
                      : new BigNumber(price).toFixed()}{' '}
                    WETH
                  </span>
                </div>
                <div className="nft-card__auction-text text-gray text-bold">
                  {available} of {available}
                </div>
              </div>
            ) : (
              ''
            )}

            {user.address && !isMyToken && !price && selling ? (
              <div className="nft-card__auction">
                {disableLinks ? (
                  <></>
                ) : (
                  <Button colorScheme="clear" onClick={handleOpenModal}>
                    <span className="text-bold text-purple-l">Place a bid</span>
                  </Button>
                )}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="nft-card__box nft-card__box-users">
            <div className="nft-card__like">
              <Like onClick={handleLike} like={isLike} />
            </div>
            <UserMini
              className="nft-card__user"
              img={`${artist.avatar}`}
              topText={<span className="text-gray text-upper text-sm text-regular">Artist</span>}
              bottomText={<span className="text-purple-l">{artist.name}</span>}
              shadow={false}
              id={artist.id}
            />
            {!!(Object.keys(owners ?? []).length === 1) && owners && (
              <UserMini
                className="nft-card__user"
                img={`${owners[0].avatar}`}
                topText={<span className="text-gray text-upper text-sm text-regular">Owner</span>}
                bottomText={<span className="text-purple-l">{owners[0]?.name}</span>}
                shadow={false}
                id={owners[0]?.id}
              />
            )}
            {!!(Object.keys(owners ?? []).length > 1) && (
              <OwnersMini tokenId={id} owners={owners ?? []} className="nft-card__owners" />
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default NFTCard;
