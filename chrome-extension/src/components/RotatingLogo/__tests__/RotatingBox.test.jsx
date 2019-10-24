import React from 'react';
import { shallow } from 'enzyme';
import RotatingBox from "../RotatingBox";


describe('<RotatingBox />', () => {
    it('should render component', () => {
        const wrapper = shallow(<RotatingBox />);
        expect(wrapper).toMatchSnapshot()
    });
});
