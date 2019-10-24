import React from 'react';
import { shallow } from 'enzyme';
import BaseButton from "../BaseButton";

describe('<BaseButton />', () => {
    it('should render <BaseButton /> component', () => {
        const wrapper = shallow(<BaseButton />);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render disabled component', () => {
        const wrapper = shallow(<BaseButton disabled={true}/>);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render component in full width', () => {
        const wrapper = shallow(<BaseButton fullWidth={true}/>);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render component with the icon', () => {
        const wrapper = shallow(<BaseButton icon={true}/>);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render as the small variant', () => {
        const wrapper = shallow(<BaseButton small={true}/>);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render as the "reject" variant', () => {
        const wrapper = shallow(<BaseButton reject={true}/>);
        expect(wrapper).toMatchSnapshot()
    });
});
