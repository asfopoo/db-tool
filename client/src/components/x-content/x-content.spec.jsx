import React from 'react';

import {
  render,
} from 'enzyme';

import { XContent } from './x-content';

describe('x-content', () => {
  test('It should render Properly', () => {
    const component = render(
      <XContent>
        <div>
          <h1>Test of Tests</h1>
        </div>
      </XContent>
    );

    expect(component).toMatchSnapshot();
  });
});
