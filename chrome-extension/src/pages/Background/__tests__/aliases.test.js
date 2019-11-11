// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License
import {
  askClaimAlias,
  checkPasswordAlias,
  createClaimAlias,
  getEncryptedPasswordAlias,
  getEncryptedPasswordCSAlias,
  importWalletAlias,
  sendErrorToCSAlias,
  sendErrorToPopupAlias,
  setPasswordAlias,
  shareActiveAccountAlias,
} from '../aliases';
import { sendErrorToCS, sendErrorToPopup } from '../../../commons/errors';
import { pwService } from '../pwService';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  GET_PASSWORD_CS_ALIAS,
  SET_ACTIVE_ACCOUNT,
  SET_CLAIM,
  SET_SESSION,
  SET_WALLET,
} from '../actionTypes';
import chrome from 'sinon-chrome';
import { decrypt } from '../../../commons/seraphSdkUtils';
jest.mock('../../../commons/errors');
jest.mock('../../../commons/seraphSdkUtils', () => ({
  decrypt: jest.fn(),
  createClaim: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('aliases', () => {
  global.chrome = chrome;
  const store = mockStore({});

  beforeEach(() => {
    chrome.notifications.create.flush();
    chrome.tabs.query.flush();
    chrome.runtime.sendMessage.flush();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it('should send error to CS', () => {
    const error = 'ERROR';
    store.dispatch(sendErrorToCSAlias({ error }));
    expect(sendErrorToCS).toHaveBeenCalledWith(error);
  });

  it('should send error to the popup', () => {
    const error = 'ERROR';
    store.dispatch(sendErrorToPopupAlias({ error }));
    expect(sendErrorToPopup).toHaveBeenCalledWith(error);
  });

  it('should set the password', () => {
    const password = 'PASSWORD';
    store.dispatch(setPasswordAlias({ password }));
    const actions = store.getActions();
    expect(pwService.password).toEqual(password);
    expect(actions[0].type).toEqual(SET_SESSION);
  });

  it('should check the password', async () => {
    decrypt.mockImplementation(
      jest.fn(() => ({
        export: jest.fn(() => ''),
        accounts: [
          {
            label: 'test',
            encrypt: jest.fn(() => new Promise((res) => res())),
          },
        ],
      }))
    );
    const password = 'PASSWORD';
    await store.dispatch(checkPasswordAlias({ password }));
    const actions = store.getActions();
    expect(actions[0].type).toEqual(SET_ACTIVE_ACCOUNT);
    expect(actions[1].type).toEqual(GET_PASSWORD_CS_ALIAS);
    expect(actions[2].type).toEqual(SET_SESSION);
  });

  it('cannot decrypt wallet during password checking', async () => {
    decrypt.mockImplementation(() => false);
    const password = 'PASSWORD';
    await store.dispatch(checkPasswordAlias({ password }));
    expect(sendErrorToPopup).toHaveBeenCalled();
  });

  it('should throw the error during password checking', async () => {
    decrypt.mockImplementation(() => {
      throw new Error();
    });
    const password = 'PASSWORD';
    await store.dispatch(checkPasswordAlias({ password }));
    expect(sendErrorToCS).toHaveBeenCalled();
  });

  it('should create new claim', async () => {
    decrypt.mockImplementation(
      jest.fn(() => ({
        export: jest.fn(() => ''),
        addClaim: jest.fn(),
        accounts: [
          {
            label: 'test',
            encrypt: jest.fn(() => new Promise((res) => res())),
          },
        ],
      }))
    );
    const data = { test: 'test' };
    const schemaName = 'test';
    await store.dispatch(createClaimAlias({ data, schemaName }));
    const actions = store.getActions();
    expect(actions[0].type).toEqual(SET_WALLET);
  });

  it('cannot decrypt wallet during claim creating', async () => {
    decrypt.mockImplementation(jest.fn(() => false));
    const data = { test: 'test' };
    const schemaName = 'test';
    await store.dispatch(createClaimAlias({ data, schemaName }));
    expect(sendErrorToCS).toHaveBeenCalled();
  });

  it('should throw the error during claim creating', async () => {
    decrypt.mockImplementation(() => {
      throw new Error();
    });
    const data = { test: 'test' };
    const schemaName = 'test';
    await store.dispatch(createClaimAlias({ data, schemaName }));
    expect(sendErrorToCS).toHaveBeenCalled();
  });

  it('should import wallet', async () => {
    const exportedWalletJSON = { test: 'test' };
    await store.dispatch(importWalletAlias({ wallet: exportedWalletJSON }));
    const actions = store.getActions();
    expect(chrome.tabs.query.calledOnce).toBeTruthy();
    expect(chrome.notifications.create.calledOnce).toBeTruthy();
    expect(actions[0].type).toEqual(SET_WALLET);
    expect(actions[0].exportedWalletJSON).toStrictEqual(exportedWalletJSON);
  });

  it('should share claim', async () => {
    const schemaName = 'test';
    const issuerDID = 'test';
    const verifierName = 'test';
    const claim = { schema: schemaName };
    decrypt.mockImplementation(
      jest.fn(() => ({
        export: jest.fn(() => ''),
        addClaim: jest.fn(),
        getAllClaims: jest.fn(() => [claim]),
        accounts: [
          {
            label: 'test',
            encrypt: jest.fn(() => new Promise((res) => res())),
          },
        ],
      }))
    );
    await store.dispatch(
      askClaimAlias({ schemaName, issuerDID, verifierName })
    );
    const actions = store.getActions();
    expect(actions[0].type).toEqual(SET_CLAIM);
    expect(actions[0].claim).toStrictEqual(claim);
  });

  it('not found a claim to share', async () => {
    const schemaName = 'test';
    const issuerDID = 'test';
    const verifierName = 'test';
    decrypt.mockImplementation(
      jest.fn(() => ({
        export: jest.fn(() => ''),
        addClaim: jest.fn(),
        getAllClaims: jest.fn(() => []),
        accounts: [
          {
            label: 'test',
            encrypt: jest.fn(() => new Promise((res) => res())),
          },
        ],
      }))
    );
    await store.dispatch(
      askClaimAlias({ schemaName, issuerDID, verifierName })
    );
    expect(sendErrorToCS).toHaveBeenCalled();
  });

  it('cannot decrypt teh wallet during asking claim', async () => {
    const schemaName = 'test';
    const issuerDID = 'test';
    const verifierName = 'test';
    decrypt.mockImplementation(jest.fn(() => false));
    await store.dispatch(
      askClaimAlias({ schemaName, issuerDID, verifierName })
    );
    expect(sendErrorToCS).toHaveBeenCalled();
  });

  it('throw an error during asking claim', async () => {
    const schemaName = 'test';
    const issuerDID = 'test';
    const verifierName = 'test';
    decrypt.mockImplementation(
      jest.fn(() => {
        throw new Error();
      })
    );
    await store.dispatch(
      askClaimAlias({ schemaName, issuerDID, verifierName })
    );
    expect(sendErrorToCS).toHaveBeenCalled();
  });

  it('should send encrypted password, wallet and the active account', () => {
    store.dispatch(getEncryptedPasswordAlias());
    expect(chrome.runtime.sendMessage.calledOnce).toBeTruthy();
  });

  it('should send encrypted password, wallet and the active account to content script', () => {
    store.dispatch(getEncryptedPasswordCSAlias());
    expect(chrome.tabs.query.calledOnce).toBeTruthy();
  });

  it('should send active account to content script', () => {
    store.dispatch(shareActiveAccountAlias());
    expect(chrome.tabs.query.calledOnce).toBeTruthy();
  });
});
