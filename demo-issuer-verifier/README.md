# Agent-to-Agent Demo

This is a demo on how the Agent-to-Agent protocol can work, it contains some examples on how to establish a communication between the webpage and the chrome extension.

## Communication between the extension and pages

The extension is communicating with the external pages with the use of the events and the seraphID injected object.
A webpage needs to access the window.seraphID object to interact with the chrome extension.

### seraphID Object

The content script injects the seraphID object into the `window` global, so the client page has access to the following methods:

#### sendClaim

```javascript
   @param {object} claim
sendClaim(claim)
```

Send to the chrome extension a specific claim. In the demo the issuer create a claim for the user and send it to the chrome extension
Through events it manages errors, success and rejection (Next section)

#### askClaim

```javascript
   @param {string} schemaName
    @param {string} issuerDID
    @param {string} verifierName

  askClaim(schemaName, issuerDID, verifierName)
```

Requests extension to share a specific claim. Through events it manages errors, success and rejection (Next section)

#### shareAddress

```javascript
shareAddress();
```

Request extension to share the address of the user. Can be used by the issuer to create and issue a claim to the user.

### Events

The content script dispatch the following events which the client page may handle

- `claimError` - passes the generic error thrown during the claim processing.

```javascript
/**
 * Dispatch the claimError event.
 * @param {{error: Error, code: string, message: string}} error
 * @return {boolean}
 */
const dispatchClaimErrorEvent = error =>
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
const dispatchShareClaimSuccessEvent = claim =>
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
const dispatchShareAccountEvent = account =>
  document.dispatchEvent(
    new CustomEvent(EVENT_NAMES.SHARE_ACCOUNT, { detail: account })
  );
```

### Exemples

#### Issuer

The Issuer webpage needs to add these events to handle success, reject and errors during the issuing phase to the chrome extension:

```javascript
document.addEventListener("addClaimSuccess", claimSuccessListener);
document.addEventListener("addClaimError", claimErrorListener);
```

and the corresponding methods:

```javascript
const claimSuccessListener = () => {
  console.log("success");
};
const claimErrorListener = () => {
  console.log("error");
};
```

In React can be done after the mounting of the component with the useEffect hook:

```javascript
useEffect(() => {
  document.addEventListener("addClaimSuccess", claimSuccessListener);
  document.addEventListener("addClaimError", claimErrorListener);
  return () => {
    document.removeEventListener("addClaimSuccess", claimSuccessListener);
    document.removeEventListener("addClaimError", claimErrorListener);
  };
}, []);
```

In this way you can remove the event listeners in the cleanup funcion.

After adding methods to manage extension responses the Issuer Page can access to the seraphId object to send the claim to the extension.

```javascript
window.seraphID.sendClaim(claim);
```

#### Verifier

The Verifier webpage needs to add these events to handle success, reject and errors during the issuing phase to the chrome extension:

```javascript
document.addEventListener("shareClaimSuccess", receivedClaimSuccessListener);
document.addEventListener("shareClaimError", claimErrorListener);
```

and the corresponding methods:

```javascript
const receivedClaimSuccessListener = () => {
  console.log("success");
};
const claimErrorListener = () => {
  console.log("error");
};
```

In React can be done after the mounting of the component with the useEffect hook, same as the previous exemple.

After adding methods to manage extension responses the Verifier Page can access to the seraphId object and ask for the specific claim:

```javascript
const claim = await createClaim("accessKey", booking, address);
```
