import React from 'react';
import {ToolTip} from './tooltip';
import {mount} from 'enzyme';

test('renders correctly', () => {
  let wrapper = mount(
    <ToolTip arrow title={'Tiptoe through the tooltips'} position={'right'}>
      <button>HOVER ME</button>
    </ToolTip>
  );
  expect(wrapper).toMatchSnapshot();
});
