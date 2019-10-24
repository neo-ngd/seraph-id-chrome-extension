// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from 'react';
import PropTypes from 'prop-types';
import RotationBox from './RotatingBox';

/**
 * <RotationLogo />
 * 3D rotate SeraphID logo.
 * @param maxWidth
 * @return {*}
 * @constructor
 */
const RotationLogo = ({ maxWidth }) => {
  return (
    <RotationBox perspective="200px" rotateForce={20} minWidth="auto">
      <img
        alt={'logo'}
        src={require("../../assets/icons/fingerprint.png")}
        style={{ maxWidth }}
      />
    </RotationBox>
  );
};

RotationLogo.defaultProps = {
    maxWidth: '230px'
};

RotationLogo.propTypes = {
    maxWidth: PropTypes.string,
};

export default RotationLogo;
