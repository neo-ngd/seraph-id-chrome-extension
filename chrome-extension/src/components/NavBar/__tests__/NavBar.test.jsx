import React from 'react';
import { shallow } from 'enzyme';
import NavBar from "../NavBar";

const props = {
    address: 'test',
    name: 'test',
    onOpenAccountModal: jest.fn(),
};

describe('<NavBar />', () => {
    it('should render component', () => {
        const wrapper = shallow(<NavBar {...props} />);
        expect(wrapper).toMatchSnapshot()
    });
});
