import React, {Component,} from 'react';
import propTypes from 'prop-types';
import onClickOutside from "react-onclickoutside";
import classNames from 'classnames';
import './_dropdown-button.scss';

const colorMap = {
  Primary: 'dropDownButtonPrimary',
  Success: 'dropDownButtonSuccess',
  Danger: 'dropDownButtonDanger',
};

class DropdownButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  handleClickOutside = evt => {
    this.setState({
      open: false
    })
  };

  toggle() {
    this.setState(prevState => ({
      open: !prevState.open,
    }))
  }

  render() {
    const {
      color,
      current,
      children,
      callback,
      ...rest
    } = this.props;
    return (
      <div id='firstDiv'>
        <button onClick={() => this.toggle()} className={classNames('baseDropDownButton', colorMap[color])} {...rest}>
          {current}
          <span className={`glyphicon glyphicon-triangle-${this.state.open ? 'top' : 'bottom'}`} />
        </button>
        {this.state.open && <ul className={classNames('baseDropDownMenu','dropdown-menu')}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child,  {
              callback: callback,
              toggle: this.toggle,
              color: color,
            });
          })}
        </ul>}
      </div>
    );
  }
}

DropdownButton.defaultProps = {
  color: 'Primary',
};

DropdownButton.propTypes = {
  color: propTypes.oneOf(Object.keys(colorMap)),
  current: propTypes.string,
  callback: propTypes.func,
};

export let ddb = onClickOutside(DropdownButton);
