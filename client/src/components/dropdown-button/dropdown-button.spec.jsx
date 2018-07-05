import React from 'react';
import {DropdownButton, DropdownItem} from './index';
import {mount,} from 'enzyme';

const options = [{text:'RMA #'}, {text:'Order #'}, {text:'Order Name'}, {text:'Email'}, {text:'Customer'},];
const current= 'RMA #';
const Options= [{text: 'Email'}, {text: 'Order Id', color: 'blue'}, {text: 'Delete', color: 'red',
  icon: {buttonClass: 'btn btn-danger btn-sm', iClass: 'fas fa-trash'}},];
const Current= 'Email';
const OPTIONS= [{text:'RMA #'}, {text:'Order #'}, {text:'Order Name'}, {text:'Email'}, {text:'Customer'},];
const CURRENT= 'RMA #';

function callback(d) {
  console.log(d);
}

test('renders basic correctly', () => {
  let button = mount(
    <DropdownButton current={current} callback={callback}>
      <DropdownItem {...options[0]} />
      <DropdownItem {...options[1]} />
      <DropdownItem {...options[2]} />
      <DropdownItem {...options[3]} />
      <DropdownItem {...options[4]} />
    </DropdownButton>
  );
  expect(button).toMatchSnapshot();
});

test('renders properly with large font, different text colors, and an icon', () => {
  let button = mount(
    <DropdownButton current={Current} callback={callback} >
      <DropdownItem {...Options[0]} />
      <DropdownItem {...Options[1]} />
      <DropdownItem {...Options[2]} />
      <DropdownItem {...Options[3]} />
      <DropdownItem {...Options[4]} />
    </DropdownButton>
  );
  expect(button).toMatchSnapshot();
});

test('renders properly with different hover and regular colors', () => {
  let button = mount(
    <DropdownButton current={CURRENT} callback={callback} color={'Success'}>
      <DropdownItem {...OPTIONS[0]} />
      <DropdownItem {...OPTIONS[1]} />
      <DropdownItem {...OPTIONS[2]} />
      <DropdownItem {...OPTIONS[3]} />
      <DropdownItem {...OPTIONS[4]} />
    </DropdownButton>
  );
  expect(button).toMatchSnapshot();
});
