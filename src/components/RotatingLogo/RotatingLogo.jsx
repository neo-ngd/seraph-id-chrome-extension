import React from 'react';
import RotationBox from './RotatingBox';

function RotationLogo() {
  return (
    <div style={{ paddingTop: '32px' }}>
      <RotationBox
        maxWidth="300"
        maxHeight="150"
        perspective="200px"
        rotateForce={20}
      >
        {/* any content you want to make 3d rotation effect */}
        <img
          src="https://i.ibb.co/yNSX6Lv/logo-og-1.jpg"
          style={{ width: '100%' }}
        />
      </RotationBox>
    </div>
  );
}

export default RotationLogo;
