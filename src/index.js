import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MoralisProvider } from 'react-moralis';
import { BrowserRouter } from 'react-router-dom';

// TODO: Extract into config file
const moralisConfig = {
  hardhat: {
    serverUrl: 'https://xsty5vsxh3wr.usemoralis.com:2053/server',
    appId: 'FMa48srGU8WBnvEDSdPVq19EzJilpf3zetM4Gpi1',
  },
  rinkeby: {
    serverUrl: 'https://hejknhfi7e6d.usemoralis.com:2053/server',
    appId: 'FuDzzNJqepkfhrBdsfYLYdy9RvsCYVBfgpriWdVs',
  },
  mainnet: {
    serverUrl: '://hejknhfi7e6d.usemoralis.com:2053/server',
    appId: '',
  }
}

let currentMoralisConfig = null
switch(process.env.REACT_APP_NODE_ENV) {
  case 'development':
    currentMoralisConfig = moralisConfig.hardhat;
  break;
  case 'production':
    currentMoralisConfig = moralisConfig.mainnet;
  break;
  case 'staging':
    currentMoralisConfig = moralisConfig.rinkeby;
  break;
  default:
    currentMoralisConfig = moralisConfig.hardhat;
  break;
}

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={currentMoralisConfig.serverUrl} appId={currentMoralisConfig.appId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
