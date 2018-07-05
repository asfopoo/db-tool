import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const colorMap = {
  Primary: 'btn btn-primary',
  Success: 'btn btn-success',
  Danger: 'btn btn-danger',
};

const buttonSizesMap = {
  'lg': 'btn-lg',
  'md': 'btn-md',
  'sm': 'btn-sm',
  'xs': 'btn-xs',
  'full': 'rl-btn-full',
};

const buttonSizes = Object.keys(buttonSizesMap);

export class RLButton extends Component {
  render() {
    const {
      color,
      children,
      size,
      ...rest
    } = this.props;
    const classes = classNames(
      colorMap[color],
      buttonSizesMap[size],
    );

    return(
      <button className={classes} {...rest}>{children}</button>
    );
  }
}

RLButton.propTypes = {
  color: PropTypes.oneOf(Object.keys(colorMap)),
  size: PropTypes.oneOf(buttonSizes),
};

RLButton.defaultProps = {
  color: 'Primary',
  size: 'lg',
};
