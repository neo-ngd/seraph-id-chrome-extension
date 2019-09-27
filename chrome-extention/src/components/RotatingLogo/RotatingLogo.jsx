import React from 'react';
import RotationBox from './RotatingBox';

function RotationLogo() {
  return (
    <RotationBox perspective="200px" rotateForce={20} minWidth="auto">
      <img
      //TODO: temporary placeholder
        src={require("../../assets/icons/fingerprint.png")}
        style={{ maxWidth: '230px' }}
      />
    </RotationBox>
  );
}

export default RotationLogo;
