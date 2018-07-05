import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';


const inputSizeMap = {
  'sm': 'input-sm',
  'md': 'input-md',
  'lg': 'input-lg',
};

const inputSizes = Object.keys(inputSizeMap);

export const RLTextInput = ({
  type,
  id,
  name,
  value,
  size,
  ...rest,
}) => {
  const classes = classNames(
    inputSizeMap[size],
    'form-control',
    'rl-input'
  );

  return (
    <input
      type={type}
      id={id}
      name={name}
      className={classes}
      value={value}
      {...rest}
    />
  );
};

RLTextInput.defaultProps = {
  type: "text",
  size: 'lg'
};

RLTextInput.propTypes = {
  size: PropTypes.oneOf(inputSizes),
};
