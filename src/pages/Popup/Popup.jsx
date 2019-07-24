import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CreateWallet from '../../containers/CreateWallet';

import './Popup.css';

class Popup extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CreateWallet></CreateWallet>
      </div>
    );
  }
}

export default Popup;
