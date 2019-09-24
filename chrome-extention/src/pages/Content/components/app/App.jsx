import React, { useState, useEffect } from 'react';
import DialogGetClaim from '../../../../components/Dialogs/Dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { decrypt } from '../../../../commons/seraphSdkUtils';
import { createClaim } from '../../../Background/actions';

function App() {
  const dispatch = useDispatch();
  const accountFromStore = useSelector((state) => state.wallet);
  const password = useSelector((state) => state.password);
  const [open, setOpen] = useState(false);
  const [claim, setClaim] = useState('');
  const [wallet, setWallet] = useState('');

  useEffect(() => {
    injectScript();
    registerListeners();
    async function decryptSetWallet() {
      const wallet = await decrypt(accountFromStore, password);
      setWallet(wallet);
    }
    decryptSetWallet();
  }, []);

  const injectScript = () => {
    const script = document.createElement('script'),
      code = document.createTextNode('(' + seraphIdInjected + ')();');
    script.appendChild(code);
    (document.body || document.head || document.documentElement).appendChild(
      script
    );
  };

  const registerListeners = () => {
    document.addEventListener('handleClaim', function(e) {
      setClaim(e.detail);
      handleClickOpen();
    });

    document.addEventListener('sendAddress', function() {
      document.dispatchEvent(
        new CustomEvent('getAddress', {
          detail: wallet.accounts[0].label,
        })
      );
    });

    document.addEventListener('getClaim', function() {
      document.dispatchEvent(
        new CustomEvent('sendClaim', {
          detail: wallet.accounts[0].claims,
        })
      );
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addClaim = () => {
    dispatch(createClaim({test: 1, test2: 2, test3: 3}, 'testSchema'));
    handleClose();
  };

  const seraphIdInjected = () => {
    window.seraphID = {
      sendClaim: function(data) {
        document.dispatchEvent(
          new CustomEvent('handleClaim', { detail: data })
        );
      },
      getClaim: function() {
        let claim;
        document.addEventListener('getClaim', function(response) {
          claim = response.detail;
        });
        document.dispatchEvent(new CustomEvent('sendClaim'));
        return claim;
      },
      getAddress: function() {
        let address;
        document.addEventListener('getAddress', function(response) {
          address = response.detail;
        });
        document.dispatchEvent(new CustomEvent('sendAddress'));
        return address;
      },
    };
  }

  return (
    <DialogGetClaim
      open={open}
      handleClose={handleClose}
      claim={claim}
      handleClaim={addClaim}
      />
  );
}

export default App;
