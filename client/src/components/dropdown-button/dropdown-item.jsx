import React, {Component,} from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import './_dropdown-button.scss';

export class DropdownItem extends Component {
  render() {
    const {
      callback,
      text,
      toggle,
      color,
      icon,
      styles,
      ...rest
    } = this.props;
    return (
      <li onClick={()=>{callback(text); toggle()}} className={classNames('baseDropDownItem',
        `dropDownItem${color}`)} style={styles} {...rest}>
          {text}
          {icon && <div className={icon.buttonClass}>
            <i className={icon.iClass}/> </div>}
      </li>
    );
  }
}

DropdownItem.defaultProps = {
  styles: {
    fontSize: '14px',
  }
};

DropdownItem.propTypes = {
  callback: propTypes.func,
  text: propTypes.string,
  toggle: propTypes.func,
  color: propTypes.string,
  icon: propTypes.object,
  styles: propTypes.object,
};
