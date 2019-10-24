import React from 'react';
import { mount } from 'enzyme';
import UnlockWallet from "../UnlockWallet";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import chrome from "sinon-chrome";
import {CHECK_PASSWORD_ALIAS} from "../../pages/Background/actionTypes";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('<UnlockWallet />', () => {
    const store = mockStore({});

    beforeEach(() => {
        global.chrome = chrome;
    });

    afterEach(() => {
        store.clearActions();
    });

    it('should render component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <UnlockWallet />
            </Provider>);
        expect(wrapper).toMatchSnapshot()
    });

    it('should unlock the wallet', () => {
        const wrapper = mount(
            <Provider store={store}>
                <UnlockWallet />
            </Provider>);
        wrapper.find({'data-test-id': 'unlock-wallet-button'}).first().simulate('click');
        const actions = store.getActions();
        expect(actions[0].type).toEqual(CHECK_PASSWORD_ALIAS);
    })
});
