<p align="center">
<img
    src="http://www.seraphid.io/assets/img/logo-dark.png"
    width="450px">
</p>
<h1></h1>
<p align="center">
  Seraph ID demo.
</p>

<p align="center">      
  <a href="https://github.com/swisscom-blockchain/seraph-id-sdk/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green">
  </a>
</p>

# Description

This is the chrome extension to interact with Seraph ID on the NEO blockchain.

Visit the [Seraph ID](http://www.seraphid.io/) official web page to learn more about self-sovereign identity!

# How to run this project

## Install the dependency

```
yarn
```

# How to import the extension to chrome

## Build the project

```
yarn start
```

## Import it in Chrome

Go to chrome://extensions/ on Chrome. Press "Load unpacked" and load the build folder. (Note: You need to enable developers mode first)

# Project Overview

## Main vendors

Main libraries used in this project

- @sbc/seraph-id-sdk
- react
- redux
- react-redux
- redux-thunk
- redux-persist
- webext-redux
- @material-ui

To read all used vendors please review the `package.json` file.

## Architecture

The background script contains the redux store (based on webext-redux), that provides the single source of truth for the whole application.
![Architecture](https://cloud.githubusercontent.com/assets/603426/18599404/329ca9ca-7c0d-11e6-9a02-5718a0fba8db.png)

The content script injects an object in the current web page (SeraphID) and a React page (a Dialog to alter the state dispatching actions to the background script), the page that wants to communicate with the extension needs to access to the SeraphID object. The popup page is always in sync with the storage and updates the UI if the storage is updated. The communication between popup, content script and background is handling with the use of the chrome events. The communication between the extension and the page is handling with the use of javascript events. Triggering of the chrome native events is handling with the use of the webext-redux aliases, which are basically the redux action creators inside which application may trigger additional side effects.

[![Architecture Diagram](./docs/architecture.svg)][1]

### Password storing

The extension doesn't store any passwords. The provided password is handling with the use of the password service, which is dismissing when the background script is closed. Therefore the password needs to be provided again after every browser re-launch.

## Hot Reload

Hot reloading is configured, you dont need to re-load the chrome extension. For some files doesnt work tho, ex. manifest.json

## Redux dev tools

Since was not possible to use Redux dev tool in the background script a remote instance is configured to run in localhost:8000

## Communication between the extension and pages

The extension is communicating with the external pages with the use of the events.

### seraphID Object

The content script injects the seraphID object into the `window` global, so the client page has access to the following methods:

```javascript
window.seraphID = {
  /**
   * Send the claim to content script
   * @param {object} claim
   */
  sendClaim: (claim) =>
    document.dispatchEvent(new CustomEvent('sendClaim', { detail: claim })),

  /**
   * Ask for the claim
   * @param {string} schemaName
   * @param {string} issuerDID
   * @param {string} verifierName
   */
  askClaim: (schemaName, issuerDID, verifierName) =>
    document.dispatchEvent(
      new CustomEvent('askClaim', {
        detail: { schemaName, issuerDID, verifierName },
      })
    ),

  /**
   * Ask for the current account address
   */
  shareAddress: () => document.dispatchEvent(new CustomEvent('getAddress')),
};
```

### Events

The content script dispatch the following events which the client page may handle

- `claimError` - passes the generic error thrown during the claim processing.

```javascript
/**
 * Dispatch the claimError event.
 * @param {{error: Error, code: string, message: string}} error
 * @return {boolean}
 */
const dispatchClaimErrorEvent = (error) =>
  document.dispatchEvent(
    new CustomEvent(EVENT_NAMES.CLAIM_ERROR, { detail: error })
  );
```

- `shareClaimSuccess` - passes the claim, when the process of sharing is successful.

```javascript
/**
 * Dispatch shareClaimSuccess event.
 * @param claim
 * @return {boolean}
 */
const dispatchShareClaimSuccessEvent = (claim) =>
  document.dispatchEvent(
    new CustomEvent(EVENT_NAMES.SHARE_CLAIM_SUCCESS, { detail: claim })
  );
```

- `shareClaimError` - inform that the claim sharing process has been failed.

```javascript
/**
 * Dispatch shareClaimError event.
 * @return {boolean}
 */
const dispatchShareClaimErrorEvent = () =>
  document.dispatchEvent(new CustomEvent(EVENT_NAMES.SHARE_CLAIM_ERROR));
```

- `addClaimSuccess` - inform that the claim adding process has been succeeded.

```javascript
/**
 * Dispatch addClaimSuccess event.
 * @return {boolean}
 */
const dispatchAddClaimSuccessEvent = () =>
  document.dispatchEvent(new CustomEvent(EVENT_NAMES.ADD_CLAIM_SUCCESS));
```

- `addClaimError` - inform that the claim adding process has been failed.

```javascript
/**
 * Dispatch addClaimError event.
 * @return {boolean}
 */
const dispatchAddClaimErrorEvent = () =>
  document.dispatchEvent(new CustomEvent(EVENT_NAMES.ADD_CLAIM_ERROR));
```

- `shareAccount` - passes the current active account label

```javascript
/**
 * Dispatch shareAccount event.
 * @param account
 * @return {boolean}
 */
const dispatchShareAccountEvent = (account) =>
  document.dispatchEvent(
    new CustomEvent(EVENT_NAMES.SHARE_ACCOUNT, { detail: account })
  );
```

## Testing

Unit tests are written with the use of the `jest` and the `sinion-chrome` libraries.

To run the tests with coverage report please run:

```
yarn test
```

To test the UI component we are using the snapshots. To refresh snapshots please run:

```
yarn test -u
```

# References
- Seraph ID official page: https://seraphid.io
- Seraph ID demo application on
  [GitHub](https://github.com/swisscom-blockchain/seraph-id-demo)
- Seraph ID smart contract templates and examples on [GitHub](https://github.com/swisscom-blockchain/seraph-id-smart-contracts)
- Seraph ID SDK on
  [GitHub](https://github.com/swisscom-blockchain/seraph-id-sdk)
- Seraph ID DID resolver on
  [GitHub](https://github.com/swisscom-blockchain/seraph-id-did-driver)

[1]: http://www.nomnoml.com/#view/%5B%3Cactor%3Euser%5D%0A%0A%5BseraphId-ui%7C%0A%20%20%20%5Btools%7C%0A%20%20%20%20%20react%0A%20%20%20%20%20material-ui%0A%20%20%20%5D%0A%20%20%20%5Bscenes%7C%0A%20%20%20%20%20%20Welcome%0A%20%20%20%20%20CreateWallet%0A%20%20%20%20%20UnlockWallet%0A%20%20%20%20%20WalletInfo%0A%20%20%20%5D%0A%20%20%20%5Breducers%7C%0A%20%20%20%20%20wallet%0A%20%20%20%20%20claim%0A%20%20%20%20%20session%0A%20%20%20%5D%0A%20%20%20%5Bactions%7C%0A%20%20%20%20%20%5BProxyStore%5D%0A%20%20%20%5D%0A%20%20%20%5Bscenes%5D%3A-%3E%5Bactions%5D%0A%20%20%20%5Bactions%5D%3A-%3E%5Breducers%5D%0A%20%20%20%5Breducers%5D%3A-%3E%5Bscenes%5D%0A%5D%0A%0A%5Bweb%20dapp%7C%0A%20%20%5Bui%20code%5D%0A%20%20%5BseraphId%5D%0A%20%20%5BInjected%20Dialog%5D%0A%20%20%0A%20%20%5B%3Cactor%3Eui%20developer%5D%0A%20%20%5Bui%20developer%5D-%3E%5Bui%20code%5D%0A%20%20%5Bui%20code%5D%3C-%3E%5BseraphId%5D%0A%20%20%5BseraphId%5D%3C-%3E%5BInjected%20Dialog%5D%0A%5D%0A%0A%5BseraphId-background%7C%0A%20%20%5Baction%2Freducers%20definition%5D%0A%0A%20%20%5Btools%7C%0A%20%20%20%20%20redux%0A%20%20%20%20%20webext-redux%0A%20%20%20%20%20redux-persist%0A%20%20%20%20%20thunk%0A%20%20%20%5D%0A%20%20%5BWrapper%20Storage%7C%0A%20%20%20%20%5Bclaims%5D%0A%20%20%20%20%5Bencrypted%20keys%5D%0A%20%20%20%20%5Bwallet%5D%0A%20%20%5D%0A%20%20%20%20%5Baction%2Freducers%20definition%5D%3C-%3E%5BWrapper%20Storage%5D%0A%0A%5D%0A%0A%5Buser%5D%3C-%3E%5BseraphId-ui%5D%0A%0A%5Buser%5D%3C%3A--%3A%3E%5Bweb%20dapp%5D%0A%0A%5BseraphId-contentscript%7C%0A%0A%20%20%5BseraphId%20%2B%20dialog%20Injector%5D%0A%20%20%5Bevents%5D%0A%20%20%20%20%20%5Breducers%7C%0A%20%20%20%20%20wallet%0A%20%20%20%20%20claim%0A%20%20%20%20%20session%0A%20%20%20%20%20%20%20%20%20%20dialog%0A%0A%20%20%20%5D%0A%20%20%20%5Bactions%7C%0A%20%20%20%20%20%5BProxyStore%5D%0A%20%20%20%5D%0A%20%20%20%0A%20%20%20%20%5BseraphId%20%2B%20dialog%20Injector%5D%3A-%3E%5Bevents%5D%0A%20%20%20%5Bevents%5D%3A-%3E%5Bactions%5D%0A%20%20%20%5Bactions%5D%3A-%3E%5Breducers%5D%0A%20%20%20%5Breducers%5D%3A-%3E%5BseraphId%20%2B%20dialog%20Injector%5D%0A%5D%0A%0A%5Bweb%20dapp%5D%3C%3A--%3A%3E%5BseraphId-contentscript%5D%0A%5BseraphId-contentscript%5D%3C-%3E%5BseraphId-background%5D%0A%5BseraphId-background%5D%3C-%3E%5BseraphId-ui%5D%0A%5BseraphId-background%5D%0A
