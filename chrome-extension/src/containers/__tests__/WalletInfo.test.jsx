import React from 'react';
import { mount } from 'enzyme';
import WalletInfo from "../WalletInfo";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import chrome from 'sinon-chrome';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('<WalletInfo />', () => {
    const store = mockStore({});
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        global.chrome = chrome;
    });

    afterEach(() => {
        jest.clearAllMocks();
        store.clearActions();
    });

    it('should render component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <WalletInfo />
            </Provider>);
        expect(wrapper).toMatchSnapshot()
    });

    // it('should open demo page', () => {
    //     const wrapper = mount(
    //         <Provider store={store}>
    //             <WalletInfo  />
    //         </Provider>);
    //     wrapper.find({'data-test-id': 'open-demo-link'}).first().simulate('click');
    //     expect(chrome.tabs.create.calledOnce).toBeTruthy();
    // });
});
