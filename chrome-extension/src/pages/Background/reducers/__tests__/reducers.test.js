import {activeAccount, claim, dialog, session, wallet} from "../reducers";
import {
    DESTROY_CLAIM,
    DESTROY_SESSION,
    SET_ACTIVE_ACCOUNT,
    SET_CLAIM,
    SET_SESSION,
    SET_WALLET,
    TOGGLE_DIALOG
} from "../../actionTypes";

describe('wallet reducer', () => {
    it('should return init state', () => {
        const init = null;
        const action = {type: null};
        expect(wallet(init, action)).toEqual(init);
    });

    it('should return wallet', () => {
        const init = null;
        const walletMock  = {test: 'test'};
        const action = {type: SET_WALLET, wallet: walletMock};
        expect(wallet(init, action)).toEqual(walletMock);
    });

    it('should return exportedWalletJSON', () => {
        const init = null;
        const exportedWalletJSON  = {test: 'test'};
        const action = {type: SET_WALLET, exportedWalletJSON};
        expect(wallet(init, action)).toEqual(exportedWalletJSON);
    });
});

describe('claim reducer', () => {
    it('should return init state', () => {
        const init = null;
        const action = {type: null};
        expect(claim(init, action)).toEqual(init);
    });

    it('should return claim', () => {
        const init = null;
        const claimMock  = {test: 'test'};
        const action = {type: SET_CLAIM, claim: claimMock};
        expect(claim(init, action)).toEqual(claimMock);
    });

    it('should destroy claim', () => {
        const init = null;
        const action = {type: DESTROY_CLAIM};
        expect(claim(init, action)).toEqual(null);
    });
});

describe('dialog reducer', () => {
    it('should return init state', () => {
        const init = {};
        const action = {type: null};
        expect(dialog(init, action)).toEqual(init);
    });

    it('should return dialog', () => {
        const init = {};
        const dialogMock  = {test: 'test'};
        const action = {type: TOGGLE_DIALOG, dialog: dialogMock};
        expect(dialog(init, action)).toEqual(dialogMock);
    });
});

describe('session reducer', () => {
    it('should return init state', () => {
        const init = null;
        const action = {type: null};
        expect(session(init, action)).toEqual(init);
    });

    it('should set session', () => {
        const init = null;
        const sessionMock  = true;
        const action = {type: SET_SESSION, session: sessionMock};
        expect(session(init, action)).toEqual(sessionMock);
    });

    it('should destroy session', () => {
        const init = null;
        const action = {type: DESTROY_SESSION};
        expect(session(init, action)).toEqual(false);
    });
});

describe('activeAccount reducer', () => {
    it('should return init state', () => {
        const init = null;
        const action = {type: null};
        expect(activeAccount(init, action)).toEqual(init);
    });

    it('should return active account', () => {
        const init = null;
        const account = 'test';
        const action = {type: SET_ACTIVE_ACCOUNT, account};
        expect(activeAccount(init, action)).toEqual(account);
    });
});
