import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  AuctionModal,
  Footer,
  Header,
  MetamaskErrModal,
  InfoModal,
  TermsModal,
} from './components/organisms';
import {
  ActivityPage,
  CollectionsPage,
  ConnectPage,
  CreateChoosePage,
  CreatePage,
  HomePage,
  NoPageFound,
  // OverviewPage,
  ProfilePage,
  SearchPage,
  TokenPage,
  UserPage,
} from './pages';

import './styles/index.scss';

const App: React.FC = () => {
  return (
    <div className="dds">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/connect" component={ConnectPage} />
        {/* <Route exact path="/overview" component={OverviewPage} /> */}
        <Route exact path="/token/:token" component={TokenPage} />
        <Route exact path="/user/:userId" component={UserPage} />
        <Route exact path="/collections/:collectionId" component={CollectionsPage} />
        <Route exact path="/activity" component={ActivityPage} />
        <Route exact path="/search" component={SearchPage} />
        <Route
          exact
          path="/create"
          render={() => {
            return localStorage.dds_token ? <CreateChoosePage /> : <Redirect to="/" />;
          }}
        />
        <Route
          exact
          path="/create/single"
          render={() => {
            return localStorage.dds_token ? <CreatePage isSingle /> : <Redirect to="/" />;
          }}
        />
        <Route
          exact
          path="/create/multi"
          render={() => {
            return localStorage.dds_token ? <CreatePage /> : <Redirect to="/" />;
          }}
        />
        <Route
          exact
          path="/profile"
          render={() => {
            return localStorage.dds_token ? <ProfilePage /> : <Redirect to="/" />;
          }}
        />
        <Route component={NoPageFound} />
      </Switch>
      <Footer />
      <TermsModal />
      <MetamaskErrModal />
      <AuctionModal />
      <InfoModal />
    </div>
  );
};

export default App;
