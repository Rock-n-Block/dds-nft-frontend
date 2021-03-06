import React, { useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { Link, useParams, useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js/bignumber';
import { observer } from 'mobx-react-lite';

import ShareImg from '../../assets/img/icons/share.svg';
import { Button, Like, UserMini } from '../../components/atoms';
import { IHistoryItem } from '../../components/molecules/TokenHistory';
import {
  PutOnSaleModal,
  TokenTabs,
  CheckoutModal,
  MultiBuyModal,
  CheckAvailability,
} from '../../components/organisms';
import { TimedAuctionModal, FixedPriceModal } from '../../components/molecules';
import { storeApi, userApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';
import web3Config from '../../services/web3/config';
import { useMst } from '../../store/store';
import metamaskService from '../../services/web3';

import './Token.scss';
import { Popover } from 'antd';
import PopoverUserLinks, {
  PopoverUserLinksProps,
} from '../../components/molecules/PopoverUserLinks';

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
  collection: ICollection;
  creator: IUser;
  currency: string;
  description?: string;
  details?: string;
  id: number;
  media: string;
  name: string;
  owners: IOwner[];
  likeCount: number;
  tags: Array<string>;
  price: number;
  royalty: number;
  selling: true;
  standart: 'ERC721' | 'ERC1155';
  totalSupply: number;
  serviceFee: number;
  bids: IBid[];
  history: Array<IHistoryItem>;
  sellers: ISeller[];
  minimalBid: number;
  ownerAuction: IAucOwner[];
}
interface IUser {
  id: number;
  avatar: string;
  name: string;
}
export interface ICollection extends IUser {
  address: string;
}
export interface ISeller extends IUser {
  quantity: number;
  price: number;
}
export interface IAucOwner extends IUser {
  address: string;
}
export interface IOwner extends IUser {
  quantity: number;
  price?: number;
  auction?: boolean;
}
const Token: React.FC = observer(() => {
  const history = useHistory();
  const connector = useWalletConnectorContext();
  const { user, modals } = useMst();
  const { token } = useParams<ITokenId>();
  const mockData = {
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
  };

  const [tokenData, setTokenData] = React.useState<IToken>({} as IToken);
  const [isApproved, setApproved] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isMyToken, setMyToken] = React.useState<boolean>(false);

  const [isLike, setIsLike] = useState<boolean>(false);

  const shareContent = (props: PopoverUserLinksProps) => {
    return <PopoverUserLinks {...props} />;
  };
  const createBuyTransaction = async (buyTokenData: any) => {
    try {
      await connector.metamaskService.createTransaction(
        buyTokenData.initial_tx.method,
        [
          buyTokenData.initial_tx.data.idOrder,
          buyTokenData.initial_tx.data.SellerBuyer,
          buyTokenData.initial_tx.data.tokenToBuy,
          buyTokenData.initial_tx.data.tokenToSell,
          buyTokenData.initial_tx.data.fee.feeAddresses,
          [
            buyTokenData.initial_tx.data.fee.feeAmounts[0].toString(),
            buyTokenData.initial_tx.data.fee.feeAmounts[1].toString(),
          ],
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
      modals.closeAll();
      modals.info.setMsg('Congratulations', 'success');
    } catch (err) {
      console.log(err);
      setLoading(false);
      modals.info.setMsg('Something went wrong', 'error');
    }
  };

  const handleEndAuction = async () => {
    try {
      setLoading(true);
      const { data: buyTokenData }: any = await storeApi.endAuction(tokenData.id);

      await createBuyTransaction(buyTokenData);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      modals.checkAvailability.close();
    } catch (err) {
      console.log(err);
      setLoading(false);
      modals.info.setMsg('Something went wrong', 'error');
    }
  };

  const handleBuy = async (quantity = 1) => {
    if (+user.balance.weth < +tokenData.price) {
      modals.info.setMsg("You don't have enough weth", 'error');
      return;
    }
    setLoading(true);

    try {
      const { data: buyTokenData }: any = await storeApi.buyToken(
        token,
        tokenData.standart === 'ERC721' ? 0 : quantity,
        web3Config.WETH.ADDRESS,
        modals.checkout.sellerId,
      );

      await createBuyTransaction(buyTokenData);
      setLoading(false);
    } catch ({ response }) {
      if (response.data) {
        modals.info.setMsg(response.data, 'error');
      } else {
        modals.info.setMsg('Something went wrong', 'error');
      }
      setLoading(false);
    }
  };

  const handleOpenCheckout = (): void => {
    modals.multibuy.open();
  };

  const handlePutOnSale = (): void => {
    modals.putOnSale.open();
    modals.fixedPrice.setProps(tokenData.serviceFee, tokenData.totalSupply);
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
        modals.info.setMsg('Something went wrong', 'error');
      });
  };

  const handleBid = (): void => {
    let avai = 1;
    if (tokenData.standart === 'ERC1155') {
      if (tokenData.selling) {
        avai = tokenData.available || 1;
      } else {
        avai = tokenData.totalSupply;
      }
    }
    modals.auction.open({
      token: {
        id: tokenData.id.toString(),
        name: tokenData.name || '',
      },
      artist: {
        id: tokenData.creator.id,
        name: tokenData.creator.name || '',
      },
      available: avai,
      fee: tokenData.serviceFee,
      isRefreshPage: true,
      minimalBid: tokenData.minimalBid || 0,
    });
  };

  const handleLike = (): void => {
    userApi
      .like({ id: tokenData.id })
      .then(({ data }) => {
        if (data === 'liked') {
          setIsLike(true);
          user.addLike(tokenData.id);
          setTokenData((prevState) => {
            return { ...prevState, likeCount: prevState.likeCount + 1 };
          });
        } else {
          setIsLike(false);
          user.removeLike(tokenData.id);
          setTokenData((prevState) => {
            return { ...prevState, likeCount: prevState.likeCount - 1 };
          });
        }
      })
      .catch((err) => {
        console.log(err, 'handle like');
        modals.info.setMsg('Something went wrong', 'error');
      });
  };

  const handleSetTokenData = (data: any): void => {
    let owners = [];
    if (data.standart === 'ERC1155') {
      owners = data.owners.map((owner: any) => {
        const sellerObj = data.sellers.find((seller: any) => seller.id === owner.id);
        const aucOwner = data.owner_auction.find((seller: any) => seller.id === owner.id);
        if (sellerObj) {
          return {
            ...owner,
            price: sellerObj ? sellerObj.price : null,
            quantity: sellerObj.quantity,
          };
        }
        if (aucOwner) {
          return {
            ...owner,
            auction: true,
            quantity: aucOwner.quantity,
          };
        }
        return {
          ...owner,
          price: null,
          auction: false,
        };
      });
    } else {
      const singleOwner = data.owners[0];
      if (data.price && data.selling) {
        owners.push({
          ...singleOwner,
          price: metamaskService.calcTransactionAmount(+data.price, 18),
          auction: false,
        });
      } else if (!data.price && data.selling) {
        owners.push({
          ...singleOwner,
          price: null,
          auction: true,
        });
      } else {
        owners.push({
          ...singleOwner,
          price: null,
          auction: false,
        });
      }
    }
    setTokenData({
      USDPrice: data.USD_price,
      available: data.available,
      collection: data.collection,
      creator: data.creator,
      currency: data.currency,
      description: data.description,
      details: data.details,
      id: data.id,
      media: data.media,
      name: data.name,
      tags: data.tags,
      owners,
      likeCount: data.like_count,
      price: data.price,
      royalty: data.royalty,
      selling: data.selling,
      standart: data.standart,
      history: data.history,
      totalSupply: data.total_supply,
      serviceFee: data.service_fee,
      bids: data.bids,
      sellers: data.sellers,
      minimalBid: data.minimal_bid,
      ownerAuction: data.owner_auction,
    });
  };
  const handleRemoveFromSale = (): void => {
    setLoading(true);
    storeApi
      .putOnSale(+token, null, null, true)
      .then(({ data }) => {
        handleSetTokenData(data);
        modals.info.setMsg('Congratulations you succefully removed token from sale', 'success');
      })
      .catch((err) => {
        modals.info.setMsg('Something went wrong', 'error');
        console.log(err, 'put on sale fixed price');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheckApproveNft = async () => {
    try {
      const result = await connector.metamaskService.checkNftTokenAllowance(
        tokenData.collection.address,
      );
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleApproveNft = async () => {
    try {
      const isAppr = await handleCheckApproveNft();
      if (!isAppr) {
        await connector.metamaskService.createTransaction(
          'setApprovalForAll',
          [web3Config.EXCHANGE.ADDRESS, true],
          'NFT',
          false,
          tokenData.collection.address,
        );
      }
    } catch (err) {
      throw Error;
    }
  };

  const handleGetTokenData = React.useCallback((): void => {
    storeApi
      .getToken(token)
      .then(({ data: tokendata }: any) => {
        handleSetTokenData(tokendata);
      })
      .catch((err: any) => {
        console.log(err, 'get token');
        history.push('/');
        modals.info.setMsg('Something went wrong', 'error');
      });
  }, [token, history, modals.info]);

  const handleCheckBidAvailability = (): void => {
    setLoading(true);
    storeApi
      .verificateBet(tokenData.id)
      .then(({ data }: any) => {
        setLoading(false);
        let info: any = {};

        if (data.invalid_bet && Object.keys(data.invalid_bet).length) {
          info = {
            isAvailable: false,
            user: {
              name: data.invalid_bet.user.name || data.user.address,
              id: data.invalid_bet.user.id,
              avatar: data.invalid_bet.user.avatar,
            },
            amount: +new BigNumber(data.invalid_bet.amount)
              .dividedBy(new BigNumber(10).pow(18))
              .toFixed(),
          };
          handleGetTokenData();
        } else {
          info = {
            isAvailable: true,
            user: {
              name: data.user.name || data.user.address,
              id: data.user.id,
              avatar: data.user.avatar,
            },
            amount: +new BigNumber(data.amount).dividedBy(new BigNumber(10).pow(18)).toFixed(),
          };
        }
        setTokenData({
          ...tokenData,
        });
        modals.checkAvailability.open(info);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, 'verificate bet');
        modals.info.setMsg('Something went wrong', 'error');
      });
  };

  useEffect(() => {
    handleGetTokenData();
  }, [handleGetTokenData, token]);

  useEffect(() => {
    if (Object.keys(tokenData).length && user.id) {
      if (tokenData.owners.find((owner: IUser) => owner.id === user.id)) {
        setMyToken(true);
      }
    } else {
      setMyToken(false);
    }
  }, [tokenData, user.id, user.address, user]);

  useEffect(() => {
    if (user.address) {
      connector.metamaskService
        .checkTokenAllowance('WETH', 18, web3Config.EXCHANGE.ADDRESS)
        .then((res: boolean) => {
          setApproved(res);
        })
        .catch((err: any) => {
          setApproved(false);
          console.log(err, 'check');
        });
    }
  }, [connector.metamaskService, user.address]);

  useEffect(() => {
    if (user.likes.length) {
      setIsLike(user.isLiked(tokenData.id));
    }
  }, [tokenData.id, user, user.id]);

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
                  <Popover
                    content={shareContent({ name: tokenData.name })}
                    trigger="click"
                    placement="top"
                  >
                    <Button
                      size="sm"
                      colorScheme="clear"
                      className="page-overview__content__buttons_share"
                    >
                      <img src={ShareImg} alt="" />
                    </Button>
                  </Popover>
                </div>
              </div>
            </div>
            <div className="token__wrapper">
              <div className="token__price">
                {tokenData.price && tokenData.selling ? (
                  <>
                    <div className="text-bold text-purple-l text-xl">{tokenData.price} WETH</div>
                    <div className="token__price-gray text-gray text-md">
                      <span>${tokenData.USDPrice / 100}</span>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {!tokenData.price && !tokenData.selling ? (
                  <div className="text-bold text-purple-l text-xl">Not for sale</div>
                ) : (
                  ''
                )}
                {!tokenData.price && tokenData.selling ? (
                  <div className="text-bold text-purple-l text-xl">Auction</div>
                ) : (
                  ''
                )}
                {tokenData.standart === 'ERC1155' ? (
                  <div className="token__price-gray text-gray text-md">
                    <span>{`${tokenData.available} of ${tokenData.totalSupply}`}</span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            {Object.keys(tokenData?.bids ?? '').length ? (
              <div className="token__bids">
                <UserMini
                  imgSize="lg"
                  img={tokenData.bids[0].bidderavatar}
                  hideOverflowBottom={false}
                  hideOverflowTop={false}
                  id={tokenData.bids[0].bidderid}
                  topText={
                    <p className="text-bold text-sm text-upper text-black">
                      Highest bid,{' '}
                      {`${tokenData.bids[0].quantity} ${
                        tokenData.bids[0].quantity > 1 ? 'tokens' : 'token'
                      }`}
                    </p>
                  }
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
            {user.address &&
            isMyToken &&
            tokenData.bids.length &&
            tokenData.bids[0].bidderid !== user.id ? (
              <div className="token__bids">
                <Button
                  colorScheme="gradient"
                  shadow
                  size="md"
                  loading={isLoading}
                  className="token__btns-item"
                  onClick={handleCheckBidAvailability}
                >
                  <span className="text-bold">Check top bid</span>
                </Button>
              </div>
            ) : (
              ''
            )}
            {(tokenData.standart === 'ERC721' &&
              !tokenData.price &&
              !tokenData.selling &&
              isMyToken) ||
            (tokenData.standart === 'ERC1155' &&
              !tokenData.sellers.find((seller) => seller.id === user.id) &&
              !tokenData.ownerAuction.find((seller) => seller.id === user.id) &&
              isMyToken) ? (
              <div className="token__btns">
                <Button
                  className="token__btns-item"
                  colorScheme="white"
                  shadow
                  size="md"
                  onClick={handlePutOnSale}
                >
                  Put on sale
                </Button>
              </div>
            ) : (
              ''
            )}
            {(tokenData.standart === 'ERC721' &&
              tokenData.price &&
              tokenData.selling &&
              isMyToken) ||
            (tokenData.standart === 'ERC1155' &&
              tokenData.sellers.find((seller) => seller.id === user.id) &&
              isMyToken) ? (
              <div className="token__btns">
                <Button
                  className="token__btns-item"
                  colorScheme="white"
                  shadow
                  size="md"
                  onClick={handleRemoveFromSale}
                  loading={isLoading}
                >
                  Remove From Sale
                </Button>
              </div>
            ) : (
              ''
            )}
            {(tokenData.standart === 'ERC721' &&
              tokenData.price === null &&
              tokenData.selling &&
              isMyToken) ||
            (tokenData.standart === 'ERC1155' &&
              isMyToken &&
              tokenData.ownerAuction.find((seller) => seller.id === user.id)) ? (
              <div className="token__btns">
                <Button
                  className="token__btns-item"
                  colorScheme="white"
                  shadow
                  size="md"
                  onClick={handleRemoveFromSale}
                  loading={isLoading}
                >
                  Remove From Auction
                </Button>
              </div>
            ) : (
              ''
            )}

            {user.address ? (
              <div className="token__btns">
                {(tokenData.standart === 'ERC721' && !isMyToken) ||
                (tokenData.standart === 'ERC1155' && !isMyToken) ||
                (tokenData.standart === 'ERC1155' &&
                  isMyToken &&
                  (tokenData.selling ? tokenData.available !== 0 : true) &&
                  (tokenData.selling
                    ? (tokenData.sellers.length === 1 && tokenData.sellers[0].id !== user.id) ||
                      tokenData.sellers.length > 1 ||
                      tokenData.ownerAuction.length > 1 ||
                      (tokenData.ownerAuction.length === 1 &&
                        tokenData.ownerAuction[0].id !== user.id) ||
                      tokenData.owners.length > 1
                    : tokenData.owners.length > 1)) ? (
                  <div className="token__btns-container">
                    {isApproved ? (
                      <>
                        {(tokenData.standart === 'ERC721' &&
                          tokenData.price &&
                          tokenData.selling) ||
                        (tokenData.standart === 'ERC1155' &&
                          tokenData.sellers.length === 1 &&
                          tokenData.sellers[0].id !== user.id) ||
                        tokenData.sellers.length > 1 ? (
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
                          ''
                        )}

                        <Button
                          colorScheme="gradient"
                          shadow
                          loading={isLoading}
                          size="md"
                          className="token__btns-item"
                          onClick={handleBid}
                        >
                          <span className="text-white text-bold">Place a bid</span>
                        </Button>
                      </>
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

                {tokenData.price ? (
                  <div className="token__btns-container">
                    <div className="token__btns-text text-gray">{`Service fee ${tokenData.serviceFee} %.`}</div>
                    <div className="token__btns-text text-gray">{`${+new BigNumber(tokenData.price)
                      .plus(
                        new BigNumber(tokenData.price)
                          .dividedBy(100)
                          .times(new BigNumber(tokenData.serviceFee)),
                      )
                      .toFixed(3)} WETH`}</div>
                    <div className="token__btns-text text-gray">{`$ ${+new BigNumber(
                      tokenData.USDPrice,
                    )
                      .dividedBy(100)
                      .plus(
                        new BigNumber(tokenData.USDPrice).times(
                          new BigNumber(tokenData.serviceFee).dividedBy(100).dividedBy(100),
                        ),
                      )
                      .toFixed(2)}`}</div>
                  </div>
                ) : (
                  ''
                )}
                {!Object.keys(tokenData?.bids ?? '').length && isMyToken ? (
                  <div className="token__btns-container">
                    <div className="token__btns-text text-gray">
                      There???s no bids yet. You can put your NFT on marketplace
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
            <div className="token__info">
              <div className="token__info-text text-md">{tokenData.collection?.name}</div>
              <div className="token__info-text text-md">{`Name: ${tokenData.name}`}</div>
              <br />
              {tokenData.description ? (
                <div className="token__info-text text-md">{tokenData.description}</div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="token__content-right">
            <TokenTabs
              artist={tokenData.creator}
              collection={{ col: tokenData.collection, standart: tokenData.standart }}
              owners={tokenData.owners}
              royalty={tokenData.royalty}
              history={tokenData.history}
              details={mockData.details}
              bids={tokenData.bids}
            />
          </div>
        </div>
      </div>
      {(tokenData.standart === 'ERC721' && isMyToken && !tokenData.selling) ||
      (tokenData.standart === 'ERC1155' &&
        !tokenData.sellers.find((seller) => seller.id === user.id) &&
        isMyToken) ? (
        <>
          <PutOnSaleModal />
          <TimedAuctionModal
            tokenId={tokenData.id}
            handleSetTokenData={handleSetTokenData}
            handleApproveNft={handleApproveNft}
          />
          <FixedPriceModal
            tokenId={tokenData.id}
            handleSetTokenData={handleSetTokenData}
            handleApproveNft={handleApproveNft}
          />
        </>
      ) : (
        ''
      )}
      <CheckoutModal handleBuy={handleBuy} isLoading={isLoading} />
      {tokenData.standart === 'ERC1155' ? (
        <MultiBuyModal
          sellers={tokenData.sellers.filter((seller) => seller.id !== user.id)}
          token={{
            name: tokenData.name || '',
            available: tokenData.available || 1,
          }}
          collection={{
            name: tokenData.collection ? tokenData.collection.name : '',
          }}
        />
      ) : (
        ''
      )}
      <CheckAvailability
        isLoading={isLoading}
        handleEndAuction={handleEndAuction}
        handleGetTokenData={handleGetTokenData}
      />
    </div>
  );
});

export default Token;
