import React from 'react';

import { ReactComponent as Teapot } from '../../assets/img/icons/teapot.svg';
import { Button } from '../../components/atoms';

import './Overview.scss';

interface IEligibleParticipates {
  title: string;
  date: string;
  text: string;
}

const eligibleParticipates: Array<IEligibleParticipates> = [
  {
    title: 'Existing DDSble users',
    date: '15/07/2020',
    text:
      'Active users will receive 2% of the total DDS supply according to the Liquidity Mining principle: based on ' +
      'the previous volume on DDSble marketplace. Both buyers and sellers will receive 50%.',
  },
  {
    title: 'Documented NFT holders/buyers',
    date: 'by Monday 20/07/2020',
    text:
      'In this stage, 4% will be distributed amoung Ethereum addresses of all NFTs with documented sales on Dune Analytics.',
  },
  {
    title: 'Remaining NFT owners',
    date: 'to be announced',
    text:
      'As we believe that Dune Analytics might not hold all the data, we introduced the third stage for corrections.' +
      ' If you haven’t found yourself on the list, but you know you have significant NFT holdings — please reach out to us! The second airdrop wave will be announced later.',
  },
];
const getDDS: Array<string> = [
  'Create and sell',
  'Collect NFTs',
  'Create Get airdrop as DDS user sell',
  'Get airdrop as NFT holder',
];
const useDDS: Array<string> = [
  'Hustle in DDSble DAO',
  'Vote for platform upgrades',
  'Choose featured artworks',
  'Participate in moderation',
];

const Overview: React.FC = () => {
  return (
    <div className="dds-overview">
      <h1 className="dds-overview__title text-blue-grad text-bold">
        Meet DDS – Digital dollar store Governance Token{' '}
      </h1>
      <p className="dds-overview__description text-black text-smd">
        We think that the best way to align platform development with customers interests is to
        empower the ones who actively interact with protocol: creators and collectors
      </p>
      <Button size="md" colorScheme="outline" className="dds-overview__learn-more">
        Learn more about DDS token
      </Button>
      <div className="dds-overview__connect-wallet">
        <h3 className="dds-overview__connect-wallet__title text-bold text-black text">
          Connect your wallet to check your eligibility
        </h3>
        <Button colorScheme="gradient" size="md" className="dds-overview__connect-wallet__connect">
          Connect Wallet
        </Button>
      </div>
      <div className="dds-overview__eligibles eligibles">
        <h2 className="eligibles__title text-blue-grad text-xl text-bold">
          Who is eligible to participate in the airdrop?
        </h2>
        <ul className="eligibles__list">
          {eligibleParticipates.map((participate, index) => (
            <li className="eligibles__list_item">
              <div className="eligibles__list_number-wrap">
                <div className="eligibles__list_number text-purple text-bold text-xl">
                  {index + 1}.
                </div>
              </div>
              <div className="eligibles__list__content">
                <h3 className="eligibles__list_title text-bold text-xl">{participate.title}</h3>
                <span className="eligibles__list_date text-gray text-smd">{participate.date}</span>
                <p className="eligibles__list_text text-black text-smd">{participate.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="eligibles__get">
        <h2 className="text-blue-grad text-bold text-xxl">How you can get DDS</h2>
        <p className="eligibles__get__description text-smd">
          DDS is not an investment and should be earned by active participation on the platform.
          75,000 tokens are issued every week, with 50% reserved for buyers, and 50% for sellers
        </p>
        <div className="eligibles__features">
          {getDDS.map((feature) => (
            <div className="eligibles__feature">
              <div className="eligibles__feature-circle">
                <Teapot />
              </div>
              <span className="eligibles__feature-name text-bold text-smd">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="eligibles__use">
        <h2 className="text-blue-grad text-bold text-xxl">How to use DDS</h2>
        <div className="eligibles__features">
          {useDDS.map((feature) => (
            <div className="eligibles__feature">
              <div className="eligibles__feature-circle">
                <Teapot />
              </div>
              <span className="eligibles__feature-name text-bold text-smd">{feature}</span>
            </div>
          ))}
        </div>
        <Button size="md" colorScheme="outline" className="eligibles__more-btn">
          Learn more about DDS token
        </Button>
      </div>
    </div>
  );
};

export default Overview;
