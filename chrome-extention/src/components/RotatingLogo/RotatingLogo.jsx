import React from 'react';
import RotationBox from './RotatingBox';

const RotationLogo = ({maxWidth = '230px'}) => {
  return (
    <RotationBox perspective="200px" rotateForce={20} minWidth="auto">
      <img
        alt={'logo'}
        src={require("../../assets/icons/fingerprint.png")}
        style={{ maxWidth }}
      />
    </RotationBox>
  );
}

export default RotationLogo;
