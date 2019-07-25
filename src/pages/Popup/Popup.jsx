import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CreateWallet from '../../containers/CreateWallet';
import { connect } from 'react-redux';

import './Popup.css';

class Popup extends Component {
  render() {
    return (
      <div>
        <NavBar />
        Click Count: {this.props.count}
        <CreateWallet></CreateWallet>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps)(Popup);
