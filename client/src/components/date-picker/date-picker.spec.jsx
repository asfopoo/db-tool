import React from 'react';
import {DatePicker} from './date-picker';
import {mount,} from 'enzyme';
import moment from "moment/moment";

const ranges = {
  'Today': [moment("2018-05-05").startOf('day'), moment("2018-05-05").endOf('day')],
  'Yesterday': [moment("2018-05-05").subtract(1, 'days').startOf('day'), moment("2018-05-05").subtract(1, 'days').endOf('day')],
  'Last 7 Days': [moment("2018-05-05").subtract(7, 'days'), moment("2018-05-05").endOf('day')],
  'Last 30 Days': [moment("2018-05-05").subtract(30, 'days'), moment("2018-05-05").endOf('day')],
  'Last 60 Days': [moment("2018-05-05").subtract(60, 'days'), moment("2018-05-05").endOf('day')],
  'Last 90 Days': [moment("2018-05-05").subtract(90, 'days'), moment("2018-05-05").endOf('day')],
  'This Month': [moment("2018-05-05").startOf('month'), moment("2018-05-05").endOf('month')],
  'Last Month': [moment("2018-05-05").subtract(1, 'month').startOf('month'), moment("2018-05-05").subtract(1, 'month').endOf('month')]
};

function callback() {
  console.log('Test');
}

test('renders correctly', () => {
  let datePicker = mount(<DatePicker
    ranges={ranges} startDate={ranges.Yesterday[0]} endDate={ranges.Today[1]} onChange={callback}
  />);
  expect(datePicker).toMatchSnapshot();
});
