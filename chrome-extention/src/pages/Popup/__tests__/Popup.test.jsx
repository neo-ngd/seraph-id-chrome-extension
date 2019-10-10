import React from 'react';
import { mount } from 'enzyme';
import Popup from "../Popup";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import theme from "../../../commons/theme";
import {ThemeProvider} from "@material-ui/styles";
import chrome from 'sinon-chrome';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<Popup />', () => {
    global.chrome = chrome;

    it('should render <Popup /> component', () => {
        const store = mockStore({});
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Popup />
                </ThemeProvider>
            </Provider>);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render <Popup /> in unlock view', () => {
        const store = mockStore({wallet: {}});
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Popup />
                </ThemeProvider>
            </Provider>);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render <Popup /> in claims view', () => {
        const store = mockStore({wallet: {}, session: true});
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Popup />
                </ThemeProvider>
            </Provider>);
        expect(wrapper).toMatchSnapshot()
    });
});
