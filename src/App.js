import * as React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Story from './pages/Story';

import Header from './components/layout/Header';

import './App.css';

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
      <Header />
      <div className="max-w-full mx-auto grid grid-cols-12">
        <Outlet />
      </div>
    </div>
  );
}

export default App;