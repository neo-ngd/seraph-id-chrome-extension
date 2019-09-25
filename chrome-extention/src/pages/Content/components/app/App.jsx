import React, { useState, useEffect } from 'react';
import DialogClaim from '../../../../components/Dialogs/Dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { decrypt } from '../../../../commons/seraphSdkUtils';
import { askClaim, createClaim, setClaim, toggleDialog } from '../../../Background/actions';
import { dialogTypes } from '../../contentTypes';

function App() {
  const dispatch = useDispatch();
  const { dialog, password, claim, wallet: accountFromStore } = useSelector(state => state);
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
    document.addEventListener('sendClaim', ({detail: claim}) => {
      dispatch(setClaim(claim));
      handleClickOpen(dialogTypes.GET_CLAIM);
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

    document.addEventListener('askClaim', ({detail: claimID}) => {
      dispatch(askClaim(claimID));
    })
  };

  const handleClickOpen = context => {
    dispatch(toggleDialog({open: true, context}))
  };

  const handleClose = () => {
    dispatch(toggleDialog({open: false, context: null}));
  };

  const addClaim = () => {
    dispatch(createClaim({test: 1, test2: 2, test3: 3}, 'testSchema'));
    handleClose();
  };

  const shareClaim = () =>{
    // TODO
    console.warn('SHARE!');
    handleClose()
  };

  const seraphIdInjected = () => {
    window.seraphID = {
      sendClaim: function(data) {
        document.dispatchEvent(
          new CustomEvent('sendClaim', { detail: data })
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
      askClaim: function(claimID) {
        document.dispatchEvent(new CustomEvent('askClaim', { detail: claimID }))
      }
    };
  };

  return (
    <DialogClaim
      open={dialog.open}
      handleClose={handleClose}
      claim={claim}
      handleClaim={dialog.context === dialogTypes.ASK_CLAIM ? shareClaim : addClaim}
      context={dialog.context}
      />
  );
}

export default App;
