import React from 'react';
import { Link } from 'react-router-dom';

import PreviewOwnerImg from '../../../assets/img/mock/home-preview-owner.jpg';
import { Like, UserMini } from '../../atoms';

import './NFTCard.scss';

export interface INFTCard {
  img: string;
  name: string;
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
  };
  owner?: {
    name: string;
  };
  like?: boolean;
  disableLinks?: boolean;
}

const NFTCard: React.FC<INFTCard> = ({
  img,
  name,
  auction,
  artist,
  owner,
  bid,
  like,
  disableLinks,
}) => {
  const [isLike, setLike] = React.useState(like);

  const handleLike = (): void => {
    console.log(1);
    setLike(!isLike);
  };
  return (
    <div className="nft-card">
      {disableLinks ? (
        <div className="nft-card__box-img">{img ? <img src={img} alt="hot" /> : ''}</div>
      ) : (
        <Link to="/" className="nft-card__box-img">
          {img ? <img src={img} alt="hot" /> : ''}
        </Link>
      )}
      <div className="nft-card__content">
        <div className="nft-card__box">
          {disableLinks ? (
            <div className="nft-card__name text-bold text-black">{name}</div>
          ) : (
            <Link to="/" className="nft-card__name text-bold text-black">
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
                  <span className="text-grad text-bold">{auction?.bid} ETH</span>
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
                  <span className="text-grad text-bold">{bid?.price} ETH</span>
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
            img={PreviewOwnerImg}
            topText={<span className="text-gray text-upper text-sm">Artist</span>}
            bottomText={<span className="text-purple-l">{artist.name}</span>}
            shadow={false}
          />
          {owner ? (
            <UserMini
              className="nft-card__user"
              img={PreviewOwnerImg}
              topText={<span className="text-gray text-upper text-sm">Owner</span>}
              bottomText={<span className="text-purple-l">{owner?.name}</span>}
              shadow={false}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
