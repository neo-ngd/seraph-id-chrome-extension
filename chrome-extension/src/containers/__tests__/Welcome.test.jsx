import React from 'react';
import { mount } from 'enzyme';
import Welcome from "../Welcome";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import chrome from "sinon-chrome";

const middlewares = [];
const mockStore = configureStore(middlewares);

const props = {
    onGoToPage: jest.fn(),
};

describe('<Welcome />', () => {

    beforeEach(() => {
        global.chrome = chrome;
    });

    it('should render component', () => {
        const store = mockStore({});

        const wrapper = mount(
            <Provider store={store}>
                <Welcome {...props} />
            </Provider>);
        expect(wrapper).toMatchSnapshot()
    });

    it('should open the import wallet page', () => {
        const store = mockStore({});

        const wrapper = mount(
            <Provider store={store}>
                <Welcome {...props} />
            </Provider>);
        wrapper.find({'data-test-id': 'import-wallet-link'}).first().simulate('click');
        expect(chrome.tabs.create.calledOnce).toBeTruthy();
    });
});
