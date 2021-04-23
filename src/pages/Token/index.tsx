import React from 'react';
import nextId from 'react-id-generator';
import { Link, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js/bignumber';
import { observer } from 'mobx-react-lite';

import ShareImg from '../../assets/img/icons/share.svg';
import userAvatar from '../../assets/img/mock/user-avatar.png';
import { Button, Like } from '../../components/atoms';
import { TokenTabs } from '../../components/organisms';
import { storeApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';
import { useMst } from '../../store/store';

import './Token.scss';

interface IToken {
  token: string;
}

const Token: React.FC = observer(() => {
  const connector = useWalletConnectorContext();
  const { user } = useMst();
  const { token } = useParams<IToken>();
  const data = {
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

  const [tokenData, setTokenData] = React.useState<any>({});

  const handleBuy = async () => {
    const { data: buyTokenData }: any = await storeApi.buyToken(
      token,
      tokenData.standart === 'ERC721' ? 0 : 1,
    );

    await connector.metamaskService.sendTransaction(buyTokenData.initial_tx);

    console.log(buyTokenData, 'data');
  };

  React.useEffect(() => {
    storeApi
      .getToken(token)
      .then(({ data: tokendata }: any) => {
        setTokenData(tokendata);
        console.log(tokendata);
      })
      .catch((err: any) => {
        console.log(err, 'get token');
      });
  }, [token]);

  return (
    <div className="token">
      <div className="token__preview">
        <img src={`https://${tokenData.media}`} alt="" className="token__preview-img" />
      </div>
      <div className="row">
        <div className="token__content">
          <div className="token__content-left">
            <div className="token__tags">
              {data.tags.map((tag) => (
                <Link
                  to="/"
                  key={nextId()}
                  className="token__tags-item box-shadow-border text-bold text-purple-l"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="token__title text-bold text-xl">
              {`${data.collection} - ${tokenData.name}`}
            </div>
            <div className="token__wrapper">
              <div className="token__price">
                <div className="text-bold text-purple-l text-xl">{data.price} ETH</div>
                <div className="token__price-gray text-gray text-md">
                  <span>${tokenData.USD_price}</span>
                </div>
                <div className="token__price-gray text-gray text-md">
                  <span>{`${tokenData.available} of ${tokenData.total_supply}`}</span>
                </div>
              </div>
              <div className="token__wrapper">
                <Like img="bold" like={data.like} likeCount={data.likeCount} />
                <div className="token__share">
                  <img src={ShareImg} alt="" />
                </div>
              </div>
            </div>
            {user.address && (
              <div className="token__btns">
                <div className="token__btns-container">
                  <Button
                    colorScheme="gradient"
                    shadow
                    size="md"
                    className="token__btns-item"
                    onClick={handleBuy}
                  >
                    <span className="text-bold">Buy now</span>
                  </Button>
                  <Button colorScheme="white" shadow size="md" className="token__btns-item">
                    <span className="text-grad text-bold">Bid</span>
                  </Button>
                </div>
                <div className="token__btns-container">
                  <div className="token__btns-text text-gray">{`Service fee ${data.fee} %.`}</div>
                  <div className="token__btns-text text-gray">{`${new BigNumber(
                    tokenData.price,
                  ).times(102.5)}ETH`}</div>
                  <div className="token__btns-text text-gray">{`$${new BigNumber(
                    tokenData.USD_price,
                  ).times(102.5)}`}</div>
                </div>
              </div>
            )}
            <div className="token__info">
              <div className="token__info-text text-md">{data.collection}</div>
              <div className="token__info-text text-md">{`Name: ${data.name}`}</div>
              <div className="token__info-text text-md">{`Series: ${data.series}`}</div>
              <div className="token__info-text text-md">{`Number: ${data.number}`}</div>
            </div>
            <Button colorScheme="white" shadow className="token__info-btn">
              <span className="text-grad text-smd">Read more</span>
            </Button>
          </div>
          <div className="token__content-right">
            <TokenTabs
              artist={data.artist}
              owner={data.owner}
              collection={data.tabCollection}
              owners={data.owners}
              history={data.history}
              details={data.details}
              bids={data.bids}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Token;
