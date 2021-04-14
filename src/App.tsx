import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Footer, Header, MetamaskErrModal, TermsModal, SuccessModal } from './components/organisms';

import {
  ConnectPage,
  CreateChoosePage,
  CreatePage,
  HomePage,
  OverviewPage,
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
        <Route exact path="/overview" component={OverviewPage} />
        <Route exact path="/token/:token" component={TokenPage} />
        <Route exact path="/user/:userId" component={UserPage} />
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
      </Switch>
      <Footer />
      <TermsModal />
      <MetamaskErrModal />
      <SuccessModal />
    </div>
  );
};

export default App;
