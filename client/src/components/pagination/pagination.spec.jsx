import React from 'react';
import {Pagination} from './pagination';
import {mount,} from 'enzyme';

let pages = 10;
let max = 5;
let current = 1;
function handleClick() {
  console.log('Clicked!');
}

test('renders correctly', () => {
  let paging = mount(<Pagination totalPages={pages} maxSize={max} currentPage={current} callback={handleClick}/>);
  expect(paging).toMatchSnapshot();
});
