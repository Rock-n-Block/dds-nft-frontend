import React from 'react';
import nextId from 'react-id-generator';
import { Tabs } from 'antd';

import { IBid } from '../../../pages/Token';
import { TokenBids, TokenDetails, TokenHistory, TokenInfo, TokenOwners } from '../../molecules';
import { IDetail } from '../../molecules/TokenDetails';

import './TokenTabs.scss';
import { IHistoryItem } from '../../molecules/TokenHistory';

const { TabPane } = Tabs;

interface TokenTabsProps {
  artist: IUser;
  collection: { col: IUser; standart: string };
  cost?: number;
  royalty: string | number;
  details: Array<IDetail>;
  bids: Array<IBid>;
  owners: Array<IUser>;
  history: Array<IHistoryItem>;
  isMyToken: boolean;
  handleCheckBidAvailability: (
    username: string,
    userId: number,
    avatar: string,
    amount: number,
  ) => void;
}
interface IUser {
  id: number;
  avatar: string;
  name: string;
}

const TokenTabs: React.FC<TokenTabsProps> = React.memo(
  ({
    artist,
    collection,
    owners,
    history,
    details,
    bids,
    royalty,
    isMyToken = false,
    handleCheckBidAvailability,
  }) => {
    return (
      <Tabs className="tabs">
        <TabPane tab="Info" key={nextId()}>
          <TokenInfo artist={artist} owners={owners} collection={collection} royalty={royalty} />
        </TabPane>
        <TabPane tab="Owners" key={nextId()}>
          <TokenOwners owners={owners} />
        </TabPane>
        <TabPane tab="History" key={nextId()}>
          <TokenHistory history={history} />
        </TabPane>
        <TabPane tab="Details" key={nextId()}>
          <TokenDetails details={details} />
        </TabPane>
        <TabPane tab="Bids" key={nextId()}>
          <TokenBids
            bids={bids}
            isMyToken={isMyToken}
            handleCheckBidAvailability={handleCheckBidAvailability}
          />
        </TabPane>
      </Tabs>
    );
  },
);

export default TokenTabs;
