import React from 'react';
import {hydrate, render} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MoralisProvider } from 'react-moralis';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

import { serverUrl, appId } from './moralis.config.js';
    
let rootElement = document.getElementById('root');

// if (rootElement.hasChildNodes()) {
//   hydrate(
//     <React.StrictMode>
//       <MoralisProvider serverUrl={serverUrl} appId={appId}>
//         <BrowserRouter>
//           <ScrollToTop />
//           <App />
//         </BrowserRouter>
//       </MoralisProvider>
//     </React.StrictMode>,
//     rootElement
//   );
// } else {
  render(
    <React.StrictMode>
      <ErrorBoundary>
          <BrowserRouter>
            <ScrollToTop />
              <MoralisProvider serverUrl={serverUrl} appId={appId}>
                <App />
              </MoralisProvider>
          </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>,
    rootElement
  );
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
