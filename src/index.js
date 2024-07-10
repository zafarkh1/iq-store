import React from 'react';
import ReactDOM from 'react-dom/client';

import '@iqueue/ui-kit/lib/ui-kit.css'
import '@iqueue/ui-kit/lib/icons.css'
import '@iqueue/ui-kit/lib/roboto.css'

import './index.css';
import App from './App';
import {DataProvider} from "./provider/dataProvider";
import {TokenContext} from "./provider/tokenProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenContext>
    <DataProvider>
      <App/>
    </DataProvider>
  </TokenContext>
);