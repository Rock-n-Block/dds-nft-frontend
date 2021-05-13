import React from 'react';
import nextId from 'react-id-generator';
import { Tabs } from 'antd';

import { IUserMini } from '../../atoms/UserMini';
import { TokenBids, TokenDetails, TokenHistory, TokenInfo, TokenOwners } from '../../molecules';
import { IDetail } from '../../molecules/TokenDetails';

import './TokenTabs.scss';

const { TabPane } = Tabs;

interface TokenTabsProps {
  artist: IUser;
  collection: { col: IUser; standart: string };
  cost?: number;
  history: Array<IUserMini>;
  details: Array<IDetail>;
  bids: Array<IUserMini>;
  owners: Array<IUser>;
}
interface IUser {
  id: number;
  avatar: string;
  name: string;
}

const TokenTabs: React.FC<TokenTabsProps> = React.memo(
  ({ artist, collection, owners, history, details, bids }) => {
    return (
      <Tabs className="tabs">
        <TabPane tab="Info" key={nextId()}>
          <TokenInfo artist={artist} owners={owners} collection={collection} />
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
          <TokenBids bids={bids} />
        </TabPane>
      </Tabs>
    );
  },
);

export default TokenTabs;
