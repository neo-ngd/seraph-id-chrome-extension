import React from 'react';
import { shallow } from 'enzyme';
import CopyButton from "../CopyButton";

const props = {
    textToCopy: 'test',
    children: 'test-children',
};

describe('<CopyButton />', () => {
    it('should render component', () => {
        const wrapper = shallow(<CopyButton {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
