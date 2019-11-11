// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import chrome from 'sinon-chrome';
import {
  CLAIM_DECLINE,
  claimDeclineError,
  claimNotFoundError,
  INVALID_PW,
  invalidPwError,
  NO_WALLET,
  NOT_FOUND,
  sendErrorToCS,
  sendErrorToPopup,
  UNKNOWN,
  unknownError,
  walletNotFoundError,
} from '../errors';
import dictionary from '../dictionary';
import { wait } from '../walletUtils';

describe('errors', () => {
  global.chrome = chrome;

  beforeEach(() => {
    chrome.runtime.sendMessage.flush();
  });

  it('should send an error to the content script', async () => {
    sendErrorToCS();
    expect(chrome.tabs.query.calledOnce).toBeTruthy();
  });

  it('should send an error to the popup', () => {
    sendErrorToPopup();
    expect(chrome.runtime.sendMessage.calledOnce).toBeTruthy();
  });

  it('should return the unknown error', () => {
    const error = 'ERROR';
    const expected = {
      code: UNKNOWN,
      message: dictionary.errors.unknown,
      error,
    };
    expect(unknownError(error)).toStrictEqual(expected);
  });

  it('should return the invalid password error', () => {
    const expected = {
      code: INVALID_PW,
      message: dictionary.errors.invalidPassword,
      error: new Error(dictionary.errors.invalidPassword),
    };
    expect(invalidPwError()).toStrictEqual(expected);
  });

  it('should return the claim not found error', () => {
    const expected = {
      code: NOT_FOUND,
      message: dictionary.errors.noCredentials,
      error: new Error(dictionary.errors.noCredentials),
    };
    expect(claimNotFoundError()).toStrictEqual(expected);
  });

  it('should return the wallet not found error', () => {
    const expected = {
      code: NO_WALLET,
      message: dictionary.errors.noWallet,
      error: new Error(dictionary.errors.noWallet),
    };
    expect(walletNotFoundError()).toStrictEqual(expected);
  });

  it('should return the claim decline error', () => {
    const expected = {
      code: CLAIM_DECLINE,
      message: dictionary.errors.claimDecline,
      error: new Error(dictionary.errors.claimDecline),
    };
    expect(claimDeclineError()).toStrictEqual(expected);
  });
});
