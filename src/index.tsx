// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { BrowserRouter as Router } from 'react-router-dom';

import Connector from './services/walletConnect';
import { Provider, rootStore } from './store/store';
import ScollToTop from './utils/ScollToTop';
import App from './App';

ReactDOM.render(
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.RECAPTCHA_KEY}
    useRecaptchaNet
    language="en"
    scriptProps={{ async: true, defer: true, appendTo: 'body' }}
  >
    <Provider value={rootStore}>
      <Router>
        <ScollToTop>
          <Connector>
            <App />
          </Connector>
        </ScollToTop>
      </Router>
    </Provider>
  </GoogleReCaptchaProvider>,
  document.getElementById('root'),
);
