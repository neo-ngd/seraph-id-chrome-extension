// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import dictionary from "./dictionary";

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
 * Return the unknown error
 * @param error
 * @return {{code: *, message: string, error: *}}
 */
export const unknownError = error => ({
    code: UNKNOWN,
    message: dictionary.errors.unknown,
    error
});

/**
 * Return the invalid password error
 * @return {{code: *, message: string, error: *}}
 */
export const invalidPwError = () => ({
    code: INVALID_PW,
    message: dictionary.errors.invalidPassword,
    error: new Error(dictionary.errors.invalidPassword)
});

/**
 * Return the claim not found error
 * @return {{code: *, message: string, error: *}}
 */
export const claimNotFoundError = () => ({
    code: NOT_FOUND,
    message: dictionary.errors.noCredentials,
    error: new Error(dictionary.errors.noCredentials)
});

/**
 * Return the wallet not found error
 * @return {{code: *, message: string, error: *}}
 */
export const walletNotFoundError = () => ({
    code: NO_WALLET,
    message: dictionary.errors.noWallet,
    error: new Error(dictionary.errors.noWallet)
});

/**
 * Return the claim decline error
 * @return {{code: *, message: string, error: *}}
 */
export const claimDeclineError = () => ({
    code: CLAIM_DECLINE,
    message: dictionary.errors.claimDecline,
    error: new Error(dictionary.errors.claimDecline)
});
