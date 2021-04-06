import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Footer, Header } from './components/organisms';
import { ConnectPage, HomePage, TokenPage } from './pages';

import './styles/index.scss';

const App: React.FC = () => {
  return (
    <div className="dds">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/connect" component={ConnectPage} />
        <Route exact path="/token/:token" component={TokenPage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
