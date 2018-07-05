import React, {
  Component,
} from 'react';

import {
  SideNavigationLogo,
} from './side-navigation-logo';

export class SideNavigation extends Component {
  constructor(){
    super();

    this.state = {
      activeId: null,
      compressed: false,
    };
  }

  handleChildClick(index){
    this.setState({
      activeId: index,
    });
  }

  renderChildren(){
    const {
      children,
    } = this.props;

    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        isActive: this.state.activeId === index,
        onClick: _ => this.handleChildClick(index),
      });
    });
  }

  render(){
    const {
      logo,
    } = this.props;
    return (
      <aside className="rl-side-navigation">
        <SideNavigationLogo src={logo} />
        <ul className="rl-side-navigation-menu">
          {this.renderChildren()}
        </ul>
      </aside>
    )
  }
}
