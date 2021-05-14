import React, { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { Link, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js/bignumber';
import { observer } from 'mobx-react-lite';

import ShareImg from '../../assets/img/icons/share.svg';
import userAvatar from '../../assets/img/mock/user-avatar.png';
import { Button, Like, UserMini } from '../../components/atoms';
import { PutOnSaleModal, TokenTabs, CheckoutModal } from '../../components/organisms';
import { storeApi, userApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';
import web3Config from '../../services/web3/config';
import { useMst } from '../../store/store';

import './Token.scss';

interface ITokenId {
  token: string;
}

export interface IBid {
  amount: number;
  bidder: string;
  bidderavatar: string;
  bidderid: number;
  quantity: number;
}
interface IToken {
  // TODO: check optional labels
  USDPrice: number;
  available: number;
  collection: IUser;
  creator: IUser;
  currency: string;
  description?: string;
  details?: string;
  id: number;
  media: string;
  name: string;
  owners: IUser[]; // TODO: array of owners
  likeCount: number;
  tags: Array<string>;
  price: number;
  royalty: number;
  selling: true;
  standart: 'ERC721';
  totalSupply: number;
  serviceFee: number;
  bids: IBid[];
}
interface IUser {
  id: number;
  avatar: string;
  name: string;
}
const Token: React.FC = observer(() => {
  const connector = useWalletConnectorContext();
  const { user, modals } = useMst();
  const { token } = useParams<ITokenId>();
  const mockData = {
    tags: ['Art', 'Games', 'Test'],
    name: 'Skweebo',
    collection: 'CryptoCrawlerz',
    series: '01',
    number: '002',
    Strengths: ['Body Length', 'Attack', 'Grip', 'Burrowing'],
    price_eth: 0.4,
    price: 713.6,
    sold: 1,
    count: 30,
    like: true,
    likeCount: 24,
    fee: 2.5,
    price_fee_eth: 348.5,
    price_fee_dol: 621721.7,
    owner: {
      img: userAvatar,
      topText: <span className="text text-gray text-sm text-upper text-regular">owner</span>,
      bottomText: <span className="text text-purple-l text-smd text-bold">MT_004am...</span>,
    },
    artist: {
      img: userAvatar,
      topText: <span className="text text-gray text-sm text-upper text-regular">artist</span>,
      bottomText: <span className="text text-purple-l text-smd text-bold">DicraKiller</span>,
    },
    tabCollection: {
      img: userAvatar,
      topText: 'Collection (ERC1155)',
      bottomText: 'Quan Selection',
    },
    owners: [
      {
        img: userAvatar,
        topText: React.createElement('b', { className: 'text-bold text-black' }, '2 ETH'),
        bottomText: React.createElement('b', { className: 'text-bold text-purple-l' }, 'MT_004am'),
      },
      {
        img: userAvatar,
        topText: React.createElement('b', { className: 'text-bold text-black' }, '2 ETH'),
        bottomText: React.createElement('b', { className: 'text-bold text-purple-l' }, 'MT_004am'),
      },
      {
        img: userAvatar,
        topText: React.createElement('b', { className: 'text-bold text-black' }, '2 ETH'),
        bottomText: React.createElement('b', { className: 'text-bold text-purple-l' }, 'MT_004am'),
      },
    ],
    history: [
      {
        img: userAvatar,
        topText: (
          <span className="text text-gray text-sm text-upper text-regular">Minted 1 hours ago</span>
        ),
        bottomText: (
          <span className="text text-gray text-sm text-regular">
            BY <b className="text-bold text-purple-d text-smd">MT_004am</b>
          </span>
        ),
      },
      {
        img: userAvatar,
        topText: (
          <span className="text text-gray text-sm text-upper">
            Put on sale for <b className="text-bold text-black"> 2 ETH </b> 6 hours ago
          </span>
        ),
        bottomText: (
          <span className="text text-gray text-sm ">
            BY <b className="text-bold text-purple-d text-smd">MT_004am</b>
          </span>
        ),
      },
    ],
    details: [
      {
        topText: 'StyleGAN II',
        bottomText: 'Image Synthesis',
      },
      {
        topText: 'Resolution',
        bottomText: '1024px x 1024px',
      },
      {
        topText: 'Machine Learning',
        bottomText: 'Generative Adversarial Network',
      },
    ],
    bids: [
      {
        img: userAvatar,
        topText: <span className="text-sm text-bold text-black">1.1 WETH</span>,
        bottomText: (
          <span className="text-sm text-gray text-regular">
            BY <b className="text-bold text-purple-l text-smd">Lance</b>
          </span>
        ),
      },
      {
        img: userAvatar,
        topText: (
          <span className="text-sm text-bold text-gray">
            <span className="text-line-through">1.0 WETH</span> Expired
          </span>
        ),
        bottomText: (
          <span className="text-sm text-gray ">
            BY <b className="text-bold text-purple-l text-smd">Lance</b>
          </span>
        ),
      },
    ],
  };

  const [tokenData, setTokenData] = React.useState<IToken>({} as IToken);
  const [isApproved, setApproved] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isMyToken, setMyToken] = React.useState<boolean>(false);

  const [isLike, setIsLike] = useState<boolean>(
    !!user.likes.find((likedTokenId) => likedTokenId === tokenData.id),
  );
  const checkLike = useCallback(() => {
    return !!user.likes.find((likedTokenId) => likedTokenId === tokenData.id);
  }, [user, tokenData]);

  const handleBuy = async (quantity = 1) => {
    setLoading(true);
    try {
      const { data: buyTokenData }: any = await storeApi.buyToken(
        token,
        tokenData.standart === 'ERC721' ? 0 : quantity,
        web3Config.WETH.ADDRESS,
      );

      console.log(buyTokenData.initial_tx, 'data');
      await connector.metamaskService.createTransaction(
        buyTokenData.initial_tx.method,
        [
          buyTokenData.initial_tx.data.idOrder,
          buyTokenData.initial_tx.data.SellerBuyer,
          buyTokenData.initial_tx.data.tokenToBuy,
          buyTokenData.initial_tx.data.tokenToSell,
          buyTokenData.initial_tx.data.fee.feeAddresses,
          buyTokenData.initial_tx.data.fee.feeAmounts,
          buyTokenData.initial_tx.data.signature,
        ],
        'BEP20',
        {
          gas: buyTokenData.initial_tx.gas,
          gasPrice: buyTokenData.initial_tx.gasPrice,
          nonce: buyTokenData.initial_tx.nonce,
          to: buyTokenData.initial_tx.to,
          value: buyTokenData.initial_tx.value,
        },
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleOpenCheckout = (): void => {
    modals.checkout.open();
  };

  const handleApprove = (): void => {
    setLoading(true);
    connector.metamaskService
      .approveToken('WETH', 18, web3Config.EXCHANGE.ADDRESS)
      .then(() => {
        setLoading(false);
        setApproved(true);
      })
      .catch((err: any) => {
        console.log(err, 'err approve');
        setLoading(false);
        setApproved(false);
      });
  };

  const handleBid = (): void => {
    modals.auction.open({
      token: {
        id: tokenData.id.toString(),
        name: tokenData.name || '',
      },
      artist: {
        id: tokenData.creator.id,
        name: tokenData.creator.name || '',
      },
      available: tokenData.available,
      fee: tokenData.serviceFee,
    });
  };

  const handleLike = (): void => {
    userApi
      .like({ id: tokenData.id })
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
    storeApi
      .getToken(token)
      .then(({ data: tokendata }: any) => {
        setTokenData({
          USDPrice: tokendata.USD_price,
          available: tokendata.available,
          collection: tokendata.collection,
          creator: tokendata.creator,
          currency: tokendata.currency,
          description: tokendata.description,
          details: tokendata.details,
          id: tokendata.id,
          media: tokendata.media,
          name: tokendata.name,
          tags: tokendata.tags,
          owners: tokendata.owners, // TODO: array of owners
          likeCount: tokendata.like_count,
          price: tokendata.price,
          royalty: tokendata.royalty,
          selling: tokendata.selling,
          standart: tokendata.standart,
          totalSupply: tokendata.total_supply,
          serviceFee: tokendata.service_fee,
          bids: tokendata.bids,
        });
      })
      .catch((err: any) => {
        console.log(err, 'get token');
      });
  }, [token]);

  useEffect(() => {
    if (Object.keys(tokenData).length) {
      if (tokenData.owners.find((owner: IUser) => owner.id === user.id)) {
        setMyToken(true);
      } else {
        setMyToken(false);
      }
    }
  }, [tokenData, user.id]);

  useEffect(() => {
    if (user.address) {
      connector.metamaskService
        .checkTokenAllowance('WETH', 18, web3Config.EXCHANGE.ADDRESS)
        .then((res: boolean) => {
          setApproved(res);
        })
        .catch((err: any) => {
          console.log(err, 'check');
        });
    }
  }, [connector.metamaskService, user.address]);

  useEffect(() => {
    setIsLike(checkLike());
  }, [checkLike]);
  return (
    <div className="token">
      <div className="token__preview">
        <img src={`https://${tokenData.media}`} alt="" className="token__preview-img" />
      </div>
      <div className="row">
        <div className="token__content">
          <div className="token__content-left">
            <div className="token__tags">
              {tokenData.tags?.map((tag) => (
                <Link
                  to="/"
                  key={nextId()}
                  className="token__tags-item box-shadow-border text-bold text-purple-l"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="token__title ">
              <p className="text-bold text-xl">{`${tokenData?.collection?.name} - ${tokenData?.name}`}</p>

              <div className="token__wrapper">
                <Like
                  img="bold"
                  onClick={handleLike}
                  like={isLike}
                  likeCount={tokenData.likeCount}
                />
                <div className="token__share">
                  <img src={ShareImg} alt="" />
                </div>
              </div>
            </div>
            <div className="token__wrapper">
              <div className="token__price">
                {tokenData.price && tokenData.selling ? (
                  <>
                    <div className="text-bold text-purple-l text-xl">{tokenData.price} ETH</div>
                    <div className="token__price-gray text-gray text-md">
                      <span>${tokenData.USDPrice}</span>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {tokenData.price && !tokenData.selling ? (
                  <div className="text-bold text-purple-l text-xl">Not for sale</div>
                ) : (
                  ''
                )}
                {!tokenData.price && !tokenData.selling ? (
                  <div className="text-bold text-purple-l text-xl">Not in auction</div>
                ) : (
                  ''
                )}
                {!tokenData.price && tokenData.selling ? (
                  <div className="text-bold text-purple-l text-xl">Auction</div>
                ) : (
                  ''
                )}
                <div className="token__price-gray text-gray text-md">
                  <span>{`${tokenData.available} of ${tokenData.totalSupply}`}</span>
                </div>
              </div>
            </div>
            {Object.keys(tokenData?.bids ?? '').length ? (
              <div className="token__bids">
                <UserMini
                  imgSize="lg"
                  img={tokenData.bids[0].bidderavatar}
                  id={tokenData.bids[0].bidderid}
                  topText={<p className="text-bold text-sm text-upper text-black">Highest bid</p>}
                  bottomText={
                    <p className="text-gray text-regular text-sm">
                      BY{' '}
                      <span className="text text-bold text-purple-l">
                        {tokenData.bids[0].bidder}
                      </span>
                    </p>
                  }
                />
                <p className="token__bids-amount text-purple text-upper text-xl text-bold">
                  {tokenData.bids[0].amount} WETH
                </p>
              </div>
            ) : (
              <></>
            )}
            {user.address && !isMyToken && (
              <div className="token__btns">
                <div className="token__btns-container">
                  {tokenData.price && tokenData.selling ? (
                    <div className="token__btns-wrapper">
                      {isApproved ? (
                        <Button
                          colorScheme="gradient"
                          shadow
                          loading={isLoading}
                          size="md"
                          className="token__btns-item"
                          onClick={() => {
                            return tokenData.standart === 'ERC721'
                              ? handleBuy()
                              : handleOpenCheckout();
                          }}
                        >
                          <span className="text-bold">Buy now</span>
                        </Button>
                      ) : (
                        <Button
                          colorScheme="gradient"
                          shadow
                          size="md"
                          loading={isLoading}
                          className="token__btns-item"
                          onClick={handleApprove}
                        >
                          <span className="text-bold">Approve Token</span>
                        </Button>
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                  {!tokenData.price && tokenData.selling ? (
                    <div className="token__btns-wrapper">
                      {isApproved ? (
                        <Button
                          colorScheme="gradient"
                          shadow
                          size="md"
                          className="token__btns-item"
                          onClick={handleBid}
                        >
                          <span className="text-white text-bold">Place a bid</span>
                        </Button>
                      ) : (
                        <Button
                          colorScheme="gradient"
                          shadow
                          size="md"
                          loading={isLoading}
                          className="token__btns-item"
                          onClick={handleApprove}
                        >
                          <span className="text-bold">Approve Token</span>
                        </Button>
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                  {!tokenData.price && !tokenData.selling && isMyToken ? (
                    <Button
                      className="token__btns-item"
                      colorScheme="white"
                      shadow
                      size="md"
                      onClick={modals.putOnSale.open}
                    >
                      Put on sale
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
                {tokenData.price ? (
                  <div className="token__btns-container">
                    <div className="token__btns-text text-gray">{`Service fee ${tokenData.serviceFee} %.`}</div>
                    <div className="token__btns-text text-gray">{`${new BigNumber(tokenData.price)
                      .times(tokenData.serviceFee)
                      .dividedBy(100)
                      .toFixed(5)} ETH`}</div>
                    <div className="token__btns-text text-gray">{`$ ${new BigNumber(
                      tokenData.USDPrice,
                    )
                      .times(tokenData.serviceFee)
                      .dividedBy(100)
                      .toFixed(2)}`}</div>
                  </div>
                ) : (
                  ''
                )}
                {!Object.keys(tokenData?.bids ?? '').length && isMyToken ? (
                  <div className="token__btns-container">
                    <div className="token__btns-text text-gray">
                      There’s no bids yet. You can put your NFT on marketplace
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
            <div className="token__info">
              {tokenData.description ? (
                <div className="token__info-text text-md">{tokenData.description}</div>
              ) : (
                <>
                  <div className="token__info-text text-md">{tokenData.collection?.name}</div>
                  <div className="token__info-text text-md">{`Name: ${tokenData.name}`}</div>
                  <div className="token__info-text text-md">{`Series: ${mockData.series}`}</div>
                  <div className="token__info-text text-md">{`Number: ${mockData.number}`}</div>
                </>
              )}
            </div>
            <Button colorScheme="white" shadow className="token__info-btn">
              <span className="text-grad text-smd">Read more</span>
            </Button>
          </div>
          <div className="token__content-right">
            <TokenTabs
              artist={tokenData.creator}
              collection={{ col: tokenData.collection, standart: tokenData.standart }}
              owners={tokenData.owners}
              royalty={tokenData.royalty}
              history={mockData.history}
              details={mockData.details}
              bids={tokenData.bids}
              isMyToken={isMyToken}
            />
          </div>
        </div>
      </div>
      <PutOnSaleModal />
      <CheckoutModal
        token={{
          name: tokenData.name || '',
          available: tokenData.available || 1,
        }}
        collection={{
          name: tokenData.collection ? tokenData.collection.name : '',
        }}
        handleBuy={handleBuy}
      />
    </div>
  );
});

export default Token;
