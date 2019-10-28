// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * <React3DRotationBox />
 * 3D rotation box. It rotates the passed element based on the mouse position.
 */
class React3DRotationBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rotateXDeg: 0,
      rotateYDeg: 0,
    };

    this._moveBox = this._moveBox.bind(this);
  }

  _moveBox(e) {
    const rotateForce = this.props.rotateForce;
    const docWidth = this.docWidth;
    const docHeight = this.docHeight;

    // rotate range: -rotateForce ~ rotateForce
    this.setState({
      rotateXDeg: -(((e.pageY / docHeight) * 2 - 1) * rotateForce),
      rotateYDeg: ((e.pageX / docWidth) * 2 - 1) * rotateForce,
    });
  }

  componentDidMount() {
    this.docWidth = document.body.offsetWidth;
    this.docHeight = document.body.offsetHeight;
    document.body.addEventListener('mousemove', this._moveBox);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousemove', this._moveBox);
  }

  render() {
    const props = this.props;
    return (
      <div
        className={`motion-box ${this.props.className || ''}`}
        style={{
          perspective: props.perspective,
          minWidth: props.minWidth,
          minHeight: props.minHeight,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${this.state.rotateXDeg}deg) rotateY(${this.state.rotateYDeg}deg)`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

React3DRotationBox.defaultProps = {
  rotateForce: 20,
  perspective: '300px',
  minWidth: 'auto',
  minHeight: '150px',
};

React3DRotationBox.propTypes = {
  rotateForce: PropTypes.number,
  perspective: PropTypes.string,
  minWidth: PropTypes.string,
  minHeight: PropTypes.string,
};

export default React3DRotationBox;
