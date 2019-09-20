import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createClaim } from './seraphUtils';

function App() {
  function getSera() {
    const claim = createClaim();
    const address = window.seraphID.getAddress();
    console.log('address', address);
    window.seraphID.sendClaim(claim);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <button onClick={getSera}>SEND CLAIM </button>
      </header>
    </div>
  );
}

export default App;
