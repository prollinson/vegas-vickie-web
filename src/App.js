import * as React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Story from './pages/Story';

import './App.css';
import Helmet from 'react-helmet';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collections" element={<Collections />} />
        <Route path="story" element={<Story />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Meta tags */}
      <Helmet>

        <title>Vegas Vickie NFT</title>
        <meta name="title" content="Vegas Vickie NFT" />
        <meta name="description" content="Own iconic artwork. Access legendary perks at Circa Casino &amp; Resort, Las Vegas." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vegasvickienft.com" />
        <meta property="og:title" content="Vegas Vickie NFT" />
        <meta property="og:description" content="Own iconic artwork. Access legendary perks at Circa Casino &amp; Resort, Las Vegas." />
        <meta property="og:image" content="https://vegasvickienft.com/" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://vegasvickienft.com" />
        <meta property="twitter:title" content="Vegas Vickie NFT" />
        <meta property="twitter:description" content="Own iconic artwork. Access legendary perks at Circa Casino &amp; Resort, Las Vegas." />
        <meta property="twitter:image" content="https://vegasvickienft.com/" />

        <script defer data-domain="vegasvickienft.com" src="https://plausible.io/js/plausible.js"></script>
      </Helmet>

      <div className="max-w-full mx-auto grid grid-cols-12">
        <Outlet />
      </div>
    </div>
  );
}

export default App;