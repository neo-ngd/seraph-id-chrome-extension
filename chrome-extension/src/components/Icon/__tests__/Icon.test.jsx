import React from 'react';
import { shallow } from 'enzyme';
import Icon from "../Icon";

describe('<Icon />', () => {
    it('should render component', () => {
        const wrapper = shallow(<Icon />);
        expect(wrapper).toMatchSnapshot()
    });
});
