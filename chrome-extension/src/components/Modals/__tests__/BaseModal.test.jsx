import React from 'react';
import { mount } from 'enzyme';
import BaseModal from "../BaseModal";
import theme from "../../../commons/theme";
import {ThemeProvider} from "@material-ui/styles";

const Child = () => (<span>test</span>);

const props = {
    isOpen: true,
    onClose: jest.fn(),
    children: <Child/>,
    HeaderComponent: Child,
    style: {},
};

describe('<BaseModal />', () => {
    it('should render component', () => {
        const wrapper = mount(
            <ThemeProvider theme={theme}>
                <BaseModal {...props} />
            </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot()
    });
});
