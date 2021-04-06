import React from 'react';
import nextId from 'react-id-generator';
import { Link, useParams } from 'react-router-dom';

import ShareImg from '../../assets/img/icons/share.svg';
import TokenImg from '../../assets/img/mock/token.jpg';
import { Button, Like } from '../../components/atoms';

import './Token.scss';

interface IToken {
  token: string;
}

const Token: React.FC = () => {
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
  };
  console.log(token);
  return (
    <div className="token">
      <div className="token__preview">
        <div className="row">
          <img src={TokenImg} alt="" className="token__preview-img" />
        </div>
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
              {`${data.collection} - Series ${data.series} - #${data.number} - ${data.name}`}
            </div>
            <div className="token__wrapper">
              <div className="token__price">
                <div className="text-bold text-purple-l text-xl">${data.price_eth} ETH</div>
                <div className="token__price-gray text-gray text-md">
                  <span>${data.price}</span>
                </div>
                <div className="token__price-gray text-gray text-md">
                  <span>{`${data.sold} of ${data.count}`}</span>
                </div>
              </div>
              <div className="token__wrapper">
                <Like img="bold" like={data.like} likeCount={data.likeCount} />
                <div className="token__share">
                  <img src={ShareImg} alt="" />
                </div>
              </div>
            </div>
            <div className="token__btns">
              <Button colorScheme="gradient" shadow size="md" className="token__btns-item">
                <span className="text-bold">Buy now</span>
              </Button>
              <Button colorScheme="white" shadow size="md" className="token__btns-item">
                <span className="text-grad text-bold">Bid</span>
              </Button>
              <div className="token__btns-text text-gray">{`Service fee ${data.fee}%.`}</div>
              <div className="token__btns-text text-gray">{`${data.price_fee_eth}ETH`}</div>
              <div className="token__btns-text text-gray">{`$${data.price_fee_dol}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
