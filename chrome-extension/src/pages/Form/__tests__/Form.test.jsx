import React from 'react';
import { mount } from 'enzyme';
import Form from "../Form";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import theme from "../../../commons/theme";
import {ThemeProvider} from "@material-ui/styles";
import chrome from 'sinon-chrome';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<Form />', () => {
    global.chrome = chrome;
    const store = mockStore({});

    it('should render <Form /> component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Form />
                </ThemeProvider>
            </Provider>);
        expect(wrapper).toMatchSnapshot()
    });
});
