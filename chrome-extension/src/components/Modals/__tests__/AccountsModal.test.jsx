import React from 'react';
import { mount } from 'enzyme';
import AccountsModal from "../AccountsModal";
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../commons/theme';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import {GET_PASSWORD_CS_ALIAS, SET_ACTIVE_ACCOUNT, SHARE_ACTIVE_ACCOUNT} from "../../../pages/Background/actionTypes";
import chrome from 'sinon-chrome';

const middlewares = [];
const mockStore = configureStore(middlewares);

const account = {
    claims: [],
    label: 'test-account-123',
};

const props = {
    isOpen: true,
    onClose: jest.fn(),
    wallet: {
        accounts: [
            account
        ]
    }
};

describe('<AccountsModal />', () => {
    const store = mockStore({});
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        global.chrome = chrome;
    });

    afterEach(() => {
        jest.clearAllMocks();
        store.clearActions()
    });

    it('should render component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AccountsModal {...props} />
                </ThemeProvider>
            </Provider>
            );
        expect(wrapper).toMatchSnapshot()
    });

    it('should change the account', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AccountsModal {...props} />
                </ThemeProvider>
            </Provider>
        );
        wrapper.find({'data-test-id': 'account-box'}).first().simulate('click');
        const actions = store.getActions();
        expect(actions[1].type).toEqual(SET_ACTIVE_ACCOUNT);
        expect(actions[2].type).toEqual(SHARE_ACTIVE_ACCOUNT);
        expect(actions[3].type).toEqual(GET_PASSWORD_CS_ALIAS);
    });

    it('should open import wallet page', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AccountsModal {...props} />
                </ThemeProvider>
            </Provider>
        );
        wrapper.find({'data-test-id': 'import-wallet-button'}).first().simulate('click');
        expect(chrome.tabs.create.calledOnce).toBeTruthy();
    })
});
