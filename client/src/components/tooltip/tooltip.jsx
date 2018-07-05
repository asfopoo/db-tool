import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'react-tippy/dist/tippy.css'
import {withTooltip} from 'react-tippy';

export class ToolTip extends Component {
  constructor(props){
    super(props);
    this.itNeedsAFunction = this.itNeedsAFunction.bind(this);
  }

  itNeedsAFunction() {
    return this.props.children;
  }

  render() {
    return (
      withTooltip(this.itNeedsAFunction, this.props)()
    );
  }
}

ToolTip.defaultProps = {
  arrow: false,
  position: 'left',
  theme: 'light',
  size: 'big',
};

ToolTip.propTypes = {
  title: PropTypes.string.isRequired,
  arrow: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  theme: PropTypes.oneOf(['light', 'dark', 'transparent']),
  size: PropTypes.oneOf(['big', 'regular', 'small']),
  onHide: PropTypes.func,
  trigger: PropTypes.oneOf(['click', 'focus', 'manual']),
};
