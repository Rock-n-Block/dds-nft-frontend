import React from 'react';
import nextId from 'react-id-generator';
import { Tabs } from 'antd';

import { IUser } from '../../../pages/Token';
import { TokenBids, TokenDetails, TokenHistory, TokenInfo, TokenOwners } from '../../atoms';
import { IDetail } from '../../atoms/TokenDetails';
import { IUserMini } from '../../atoms/UserMini';

import './TokenTabs.scss';

const { TabPane } = Tabs;

interface TokenTabsProps {
  owner: IUser;
  artist: IUser;
  collection: IUserMini;
  cost?: number;
  history: Array<IUserMini>;
  details: Array<IDetail>;
  bids: Array<IUserMini>;
  owners: Array<IUserMini>;
}

const TokenTabs: React.FC<TokenTabsProps> = ({
  artist,
  owner,
  collection,
  owners,
  history,
  details,
  bids,
}) => {
  return (
    <Tabs className="tabs">
      <TabPane tab="Info" key={nextId()}>
        <TokenInfo artist={artist} owner={owner} collection={collection} />
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
};

export default TokenTabs;
