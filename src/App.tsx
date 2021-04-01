import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Footer, Header } from './components/organisms';
import { HomePage } from './pages';

import './styles/index.scss';

const App: React.FC = () => {
  return (
    <div className="dds">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
