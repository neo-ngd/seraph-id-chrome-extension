/**
 * Error message string
 * @type {string}
 */
export const ERROR_MSG = 'ERROR';

/**
 * Error codes
 */
export const UNKNOWN = 'err:unknown';
export const NOT_FOUND = 'err:notFound';
export const NO_WALLET = 'err:noWallet';
export const CLAIM_DECLINE = 'err:decline';
export const INVALID_PW = 'err:invalidPW';

/**
 * Send error message to the active tab with content script.
 * @param error
 */
export const sendErrorToCS =  error => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: ERROR_MSG, error});
    });
};

/**
 * Send error to the popup.
 * @param error
 */
export const sendErrorToPopup = error => {
    chrome.runtime.sendMessage({msg: ERROR_MSG, error});
};

/**
 * Unknown error
 * @param error
 * @return {{code: *, message: string, error: *}}
 */
export const unknownError = error => ({
    code: UNKNOWN,
    message: 'unknown error',
    error
});

/**
 * Invalid password error
 * @return {{code: *, message: string, error: *}}
 */
export const invalidPwError = () => ({
    code: INVALID_PW,
    message: "Invalid password",
    error: new Error("Invalid password")
});

/**
 * Claim not found error
 * @return {{code: *, message: string, error: *}}
 */
export const claimNotFoundError = () => ({
    code: NOT_FOUND,
    message: "credential doesn't exists",
    error: new Error("credential doesn't exists")
});

/**
 * Wallet not found error
 * @return {{code: *, message: string, error: *}}
 */
export const walletNotFoundError = () => ({
    code: NO_WALLET,
    message: 'cannot find any wallet',
    error: new Error('cannot find any wallet')
});

/**
 * Claim decline error
 * @return {{code: *, message: string, error: *}}
 */
export const claimDeclineError = () => ({
    code: CLAIM_DECLINE,
    message: 'user didn\'t accept to share the credential',
    error: new Error('user didn\'t accept to share the credential')
});
