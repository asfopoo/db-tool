import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import PropTypes from 'prop-types';

export const DatePicker = ({
    maxDate,
    ranges,
    startDate,
    endDate,
    onChange,
    opens,
    drops,
    formatRange,
    ...rest,
}) => {
  return (
    <span id='firstSpan'>
      <DateRangePicker
        showDropdowns={true} maxDate={maxDate} ranges={ranges} startDate={startDate}
        endDate={endDate} {...rest} opens={opens} drops={drops} onApply={(event,picker)=>{
        onChange(picker.startDate, picker.endDate)}}
      >
        <i className='glyphicon glyphicon-calendar' />
        <span> {formatRange(startDate, endDate)} </span>
        <i className='fa fa-caret-down'/>
      </DateRangePicker>
    </span>
  );
};

DatePicker.defaultProps = {
  opens: 'center', //left, right
  drops: 'down', //up
  formatRange: (startDate, endDate) => {
    return (startDate.format('MMMM D, YYYY') + ' - ' + endDate.format('MMMM D, YYYY'));
  },
};

DatePicker.propTypes = {
  drops: PropTypes.oneOf(['down', 'up']),
  endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  formatRange: PropTypes.func,
  maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  opens: PropTypes.oneOf(['left', 'right', 'center']),
  ranges: PropTypes.object,
  startDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
