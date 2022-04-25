import './App.css';
import api from './api/api'
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";


import Home from './container/Home';
import Products from './container/Product';
import Transactions from './container/Transaction';

function App() {

  return (
    <div className="App">
      <div>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/transactions" element={<Transactions />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
