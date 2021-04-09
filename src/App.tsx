import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Footer, Header, TermsModal } from './components/organisms';
import { ConnectPage, CreateChoosePage, CreatePage, HomePage, TokenPage, UserPage } from './pages';

import './styles/index.scss';

const App: React.FC = () => {
  return (
    <div className="dds">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/connect" component={ConnectPage} />
        <Route exact path="/token/:token" component={TokenPage} />
        <Route exact path="/create" component={CreateChoosePage} />
        <Route exact path="/create/single" render={() => <CreatePage isSingle />} />
        <Route exact path="/create/multi" component={CreatePage} />
        <Route exact path="/user" component={UserPage} />
      </Switch>
      <Footer />
      <TermsModal />
    </div>
  );
};

export default App;
