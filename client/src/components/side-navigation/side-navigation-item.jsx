import React from 'react';

import { Link } from 'react-router-dom';

import classNames from 'classnames';

export const SideNavigationItem = ({
  children,
  href,
  isActive,
  onClick,
  overrideOnClick,
}) => {
  const onClickCallback = !!overrideOnClick ? overrideOnClick : onClick;

  const listItemClasses = classNames({
    'active-side-nav-item': !!isActive,
  });

  return (
    <li className={listItemClasses}>
      <Link onClick={onClickCallback} to={href}> {children} </Link>
    </li>
  );
};
