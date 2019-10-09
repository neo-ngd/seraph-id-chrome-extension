import React from 'react';
import { shallow, mount } from 'enzyme';
import Claim from "../Claim";

const props = {
    id: 11,
    schema: 'test',
    content: {test: 'test'},
    onRemoveClaim: jest.fn(),
};

describe('<Claim />', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render component', () => {
        const wrapper = shallow(<Claim {...props} />);
        expect(wrapper).toMatchSnapshot()
    });

    it('should expand component', () => {
        const wrapper = mount(<Claim {...props} />);
        wrapper.find({'data-test-id': 'claim-expand-button'}).first().simulate('click');
        expect(setState).toHaveBeenCalledWith(true);
    });

    it('should call onRemoveClaim method', () => {
        const wrapper = mount(<Claim {...props} />);
        wrapper.find({'data-test-id': 'claim-remove-button'}).last().simulate('click');
        expect(props.onRemoveClaim).toHaveBeenCalledWith(props.id);
    });
});
