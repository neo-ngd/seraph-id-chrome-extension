import React from 'react';
import PropTypes from 'prop-types';
import RotationBox from './RotatingBox';

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
