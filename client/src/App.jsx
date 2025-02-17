import { useState } from 'react';
import './App.css';
import React from 'react';
import Textbox from './components/Textbox';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='bg-[#FCFAFC] text-center'>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
