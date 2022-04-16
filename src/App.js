import * as React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Collections from './pages/Collections';

import Header from './components/layout/Header';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collections" element={<Collections />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="relative min-h-screen bg-black bg-vegas-scene-dark bg-cover">
      <Header />
      <div className="max-w-7xl mx-auto grid grid-cols-12">
        <Outlet />
      </div>
    </div>
  );
}

export default App;