import React from 'react';

import {
  render,
} from 'enzyme';

import { XPanel } from './x-panel';

describe('x-panel', () => {
  test('It should render Properly', () => {
    const component = render(
      <XPanel>
        <div>
          <h1>Test of Tests</h1>
        </div>
      </XPanel>
    );

    expect(component).toMatchSnapshot();
  });
});
