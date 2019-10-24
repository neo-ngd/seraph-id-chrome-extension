import React from 'react';
import { shallow } from 'enzyme';
import Dialogs, { DialogHeader } from "../Dialogs";
import {DIALOG_TYPES} from "../../../commons/constants";

const props = {
    open: true,
    handleClose: jest.fn(),
    claim: {test: 'test'},
    handleClaim: jest.fn(),
    context: DIALOG_TYPES.GET_CLAIM,
    schemaName: 'test',
    verifierName: 'test',
};

describe('<Dialogs />', () => {
    it('should render GET_CLAIM component', () => {
        const wrapper = shallow(<Dialogs {...props} />);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render ASK_CLAIM component', () => {
        const wrapper = shallow(<Dialogs {...props} context={DIALOG_TYPES.ASK_CLAIM} />);
        expect(wrapper).toMatchSnapshot()
    });

    it('should render <DialogHeader> component', () => {
        const wrapper = shallow(<DialogHeader />);
        expect(wrapper).toMatchSnapshot()
    });
});
