import React from 'react';
import { shallow } from 'enzyme';
import RotatingLogo from "../RotatingLogo";

const props = {
  maxWidth: '200px'
};

describe('<RotatingLogo />', () => {
  it('should render component', () => {
    const wrapper = shallow(<RotatingLogo {...props} />);
    expect(wrapper).toMatchSnapshot()
  });
});
