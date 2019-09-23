import React, { useState, useEffect } from 'react';
import DialogGetClaim from '../../../../components/Dialogs/Dialogs';
import DialogSendClaim from '../../../../components/Dialogs/Dialogs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { decrypt } from '../../../../commons/seraphSdkUtils';

function App() {
  const dispatch = useDispatch();
  const accountFromStore = useSelector((state) => state.wallet);
  const password = useSelector((state) => state.password);
  const [open, setOpen] = useState(false);
  const [claim, setClaim] = useState('');
  const [wallet, setWallet] = useState('');

  useEffect(() => {
    async function decryptSetWallet() {
      const wallet = await decrypt(accountFromStore, password);
      setWallet(wallet);
    }
    decryptSetWallet();
  }, []);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function addClaim() {
    wallet.addClaim(claim);
    wallet.accounts[0].encrypt(password).then(() => {
      const exportedWalletJSON = JSON.stringify(wallet.export());
      dispatch({ type: 'SET_WALLET', exportedWalletJSON });
    });
    handleClose();
  }
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

  function seraphIdInjected() {
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

  var script = document.createElement('script'),
    code = document.createTextNode('(' + seraphIdInjected + ')();');
  script.appendChild(code);
  (document.body || document.head || document.documentElement).appendChild(
    script
  );

  return (
    <React.Fragment>
      <DialogGetClaim
        open={open}
        handleClose={handleClose}
        claim={claim}
        handleClaim={addClaim}
      ></DialogGetClaim>
    </React.Fragment>
  );
}

export default App;
