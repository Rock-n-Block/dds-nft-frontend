import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Header } from './components';
import { HomePage } from './pages';

import './styles/index.scss';

const App: React.FC = () => {
  return (
    <div className="dds">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
