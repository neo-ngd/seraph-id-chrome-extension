import React from 'react';
import { mount } from 'enzyme';
import CreateWallet from "../CreateWallet";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import chrome from "sinon-chrome";
import { wait } from "../../commons/walletUtils";
import {
    GET_PASSWORD_CS_ALIAS,
    SET_ACTIVE_ACCOUNT,
    SET_PASSWORD_ALIAS,
    SET_WALLET,
    SHARE_ACTIVE_ACCOUNT
} from "../../pages/Background/actionTypes";

jest.mock('../../commons/hooks/useText', () => () => ({
    password: 'test123',
    handleChange: jest.fn(),
}));

jest.setTimeout(10000);

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('<CreateWallet />', () => {
    const store = mockStore({});
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        global.chrome = chrome;
    });

    afterEach(() => {
        store.clearActions();
    });

    it('should render component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <CreateWallet />
            </Provider>);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });



    it('should create and set the wallet', async () => {
        const wrapper = mount(
            <Provider store={store}>
                <CreateWallet />
            </Provider>);
        wrapper.find('input').first().simulate('change');
        wrapper.find({'data-test-id': 'create-wallet-button'}).first().simulate('click');
        await wait(5000);
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SET_ACTIVE_ACCOUNT);
        expect(actions[1].type).toEqual(SET_WALLET);
        expect(actions[2].type).toEqual(SET_PASSWORD_ALIAS);
        expect(actions[3].type).toEqual(SHARE_ACTIVE_ACCOUNT);
        expect(actions[4].type).toEqual(GET_PASSWORD_CS_ALIAS);
    });
});
