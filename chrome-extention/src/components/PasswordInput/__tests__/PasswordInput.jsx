import React from 'react';
import { mount } from 'enzyme';
import PasswordInput from "../PasswordInput";
import theme from "../../../commons/theme";
import {ThemeProvider} from "@material-ui/styles";

const props = {
    value: '',
    handleChange: () => jest.fn(),
    hasError: false,
};

describe('<PasswordInput />', () => {
    it('should render component', () => {
        const wrapper = mount(
            <ThemeProvider theme={theme}>
                <PasswordInput {...props} />
            </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot()
    });

    it('should render component with error', () => {
        const wrapper = mount(
            <ThemeProvider theme={theme}>
                <PasswordInput {...props} hasError={true}/>
            </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot()
    });
});
