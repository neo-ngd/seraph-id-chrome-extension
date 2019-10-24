import {
    ASK_CLAIM_ALIAS,
    CHECK_PASSWORD_ALIAS,
    CREATE_CLAIM_ALIAS,
    DESTROY_CLAIM,
    DESTROY_SESSION,
    GET_PASSWORD_ALIAS,
    GET_PASSWORD_CS_ALIAS,
    IMPORT_WALLET_ALIAS,
    SEND_ERROR_CS_ALIAS,
    SEND_ERROR_POPUP_ALIAS,
    SET_ACTIVE_ACCOUNT,
    SET_CLAIM,
    SET_PASSWORD_ALIAS,
    SET_SESSION,
    SET_WALLET,
    SHARE_ACTIVE_ACCOUNT,
    TOGGLE_DIALOG
} from "../actionTypes";
import {
    askClaim,
    checkPassword, createClaim, destroyClaim, destroySession,
    getEncryptedPassword,
    getEncryptedPasswordToCS, importWalletAlias, sendErrorToCSAlias, sendErrorToPopupAlias, setActiveAccount, setClaim,
    setExportedWallet,
    setPassword, setSession, shareActiveAccountAlias, toggleDialog
} from '../actions';

describe('redux actions', () => {
    it ('should return getEncryptedPassword action', () => {
        const expected = ({ type: GET_PASSWORD_ALIAS });
        expect (getEncryptedPassword()).toStrictEqual(expected);
    });

    it ('should return getEncryptedPasswordToCS action', () => {
        const expected = ({ type: GET_PASSWORD_CS_ALIAS });
        expect (getEncryptedPasswordToCS()).toStrictEqual(expected);
    });

    it ('should return checkPassword action', () => {
        const password = 'test123';
        const expected = ({ type: CHECK_PASSWORD_ALIAS, password });
        expect (checkPassword(password)).toStrictEqual(expected);
    });

    it ('should return setPassword action', () => {
        const password = 'test123';
        const expected = ({ type: SET_PASSWORD_ALIAS, password });
        expect (setPassword(password)).toStrictEqual(expected);
    });

    it ('should return setExportedWallet action', () => {
        const exportedWalletJSON = JSON.stringify({test: 'test'});
        const expected = ({ type: SET_WALLET, exportedWalletJSON });
        expect (setExportedWallet(exportedWalletJSON)).toStrictEqual(expected);
    });

    it ('should return createClaim action', () => {
        const data = JSON.stringify({test: 'test'});
        const schemaName = 'test';
        const expected = ({ type: CREATE_CLAIM_ALIAS, data, schemaName });
        expect (createClaim(data, schemaName)).toStrictEqual(expected);
    });

    it ('should return askClaim action', () => {
        const verifierName = 'test';
        const schemaName = 'test';
        const issuerDID = 'test';
        const expected = ({ type: ASK_CLAIM_ALIAS, schemaName, issuerDID, verifierName });
        expect (askClaim({verifierName, schemaName, issuerDID})).toStrictEqual(expected);
    });

    it ('should return setClaim action', () => {
        const claim = JSON.stringify({test: 'test'});
        const expected = ({ type: SET_CLAIM, claim });
        expect (setClaim(claim)).toStrictEqual(expected);
    });

    it ('should return destroyClaim action', () => {
        const expected = ({ type: DESTROY_CLAIM });
        expect (destroyClaim()).toStrictEqual(expected);
    });

    it ('should return toggleDialog action', () => {
        const dialog = {test: 'test'};
        const expected = ({ type: TOGGLE_DIALOG, dialog });
        expect (toggleDialog(dialog)).toStrictEqual(expected);
    });

    it ('should return setSession action', () => {
        const session = true;
        const expected = ({ type: SET_SESSION, session });
        expect (setSession(session)).toStrictEqual(expected);
    });

    it ('should return destroySession action', () => {
        const session = false;
        const expected = ({ type: DESTROY_SESSION, session });
        expect (destroySession(session)).toStrictEqual(expected);
    });

    it ('should return sendErrorToPopupAlias action', () => {
        const error = 'test';
        const expected = ({ type: SEND_ERROR_POPUP_ALIAS, error });
        expect (sendErrorToPopupAlias(error)).toStrictEqual(expected);
    });

    it ('should return shareActiveAccountAlias action', () => {
        const expected = ({ type: SHARE_ACTIVE_ACCOUNT });
        expect (shareActiveAccountAlias()).toStrictEqual(expected);
    });

    it ('should return sendErrorToCSAlias action', () => {
        const error = 'test';
        const expected = ({ type: SEND_ERROR_CS_ALIAS, error });
        expect (sendErrorToCSAlias(error)).toStrictEqual(expected);
    });

    it ('should return importWalletAlias action', () => {
        const wallet = JSON.stringify({test: 'test'});
        const expected = ({ type: IMPORT_WALLET_ALIAS, wallet });
        expect (importWalletAlias(wallet)).toStrictEqual(expected);
    });

    it ('should return setActiveAccount action', () => {
        const account = 'test';
        const expected = ({ type: SET_ACTIVE_ACCOUNT, account });
        expect (setActiveAccount(account)).toStrictEqual(expected);
    });
});
