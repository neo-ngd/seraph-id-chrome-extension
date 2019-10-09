import React from 'react';
import { shallow } from 'enzyme';
import Layout from "../Layout";

const Child = () => (<span>test</span>);

const props = {
    children: <Child />,
    justifyStart: true,
    padding: '2px',
    isLoading: false,
};

describe('<Layout />', () => {
    it('should render component', () => {
        const wrapper = shallow(<Layout {...props} />);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render component with space-between prop', () => {
        const wrapper = shallow(<Layout {...props} justifyStart={false} />);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render component in loading state', () => {
        const wrapper = shallow(<Layout {...props} isLoading={true} />);
        expect(wrapper).toMatchSnapshot()
    });
});
