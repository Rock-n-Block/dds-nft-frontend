import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js/bignumber';
import { observer } from 'mobx-react-lite';

import { userApi } from '../../../services/api';
import { useMst } from '../../../store/store';
import { Like, UserMini } from '../../atoms';

import './NFTCard.scss';

export interface INFTCard {
  img: string;
  name: string;
  id?: number;
  auction?: {
    count: number | string;
    sold: number | string;
    bid: number | string;
  } | null;
  bid?: {
    price: number | string;
    sold: number | string;
    count: number | string;
  } | null;
  artist: {
    name: string;
    id?: number | string;
    avatar?: string;
  };
  owner?: {
    name: string;
    id?: number | string;
    avatar?: string;
  };
  disableLinks?: boolean;
}

const NFTCard: React.FC<INFTCard> = observer(
  ({ img, name, id, auction, artist, owner, bid, disableLinks }) => {
    const { user } = useMst();

    const [isLike, setIsLike] = useState<boolean>(
      !!user.likes.find((likedTokenId) => likedTokenId === id),
    );
    const checkLike = useCallback(() => {
      return !!user.likes.find((likedTokenId) => likedTokenId === id);
    }, [user, id]);
    const handleLike = (): void => {
      userApi
        .like({ id })
        .then(({ data }) => {
          if (data === 'liked') {
            setIsLike(true);
          } else {
            setIsLike(false);
          }
        })
        .catch((err) => {
          console.log(err, 'handle like');
        });
    };
    useEffect(() => {
      setIsLike(checkLike());
    }, [checkLike]);

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
            {auction ? (
              <>
                <div className="nft-card__auction">
                  <div className="nft-card__auction-text text-purple-l text-bold">Auction</div>
                  <div className="nft-card__auction-text text-gray text-bold">
                    {auction?.sold} of {auction?.count}
                  </div>
                </div>
                <div className="nft-card__auction nft-card__auction-bid">
                  <div className="nft-card__auction-text text-gray text-bold">Highest bid</div>
                  <div className="nft-card__auction-bid-box box-shadow">
                    <span className="text-grad text-bold">
                      {new BigNumber(auction?.bid).toFixed()} ETH
                    </span>
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
            {bid ? (
              <>
                <div className="nft-card__auction">
                  <div className="nft-card__auction-bid-box box-shadow">
                    {bid.price ? (
                      <span className="text-grad text-bold">
                        {new BigNumber(bid?.price).toFixed()} ETH
                      </span>
                    ) : (
                      <span className="text-grad text-bold">Not for sale</span>
                    )}
                  </div>
                  <div className="nft-card__auction-text text-gray text-bold">
                    {bid?.sold} of {bid?.count}
                  </div>
                </div>
                <div className="nft-card__auction">
                  {disableLinks ? (
                    <div className="text-bold text-purple-l">Place a bid</div>
                  ) : (
                    <Link to="/" className="text-bold text-purple-l">
                      Place a bid
                    </Link>
                  )}
                </div>
              </>
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
            {owner ? (
              <UserMini
                className="nft-card__user"
                img={`${owner.avatar}`}
                topText={<span className="text-gray text-upper text-sm text-regular">Owner</span>}
                bottomText={<span className="text-purple-l">{owner?.name}</span>}
                shadow={false}
                id={owner?.id}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default NFTCard;
