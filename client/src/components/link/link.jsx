import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

export const RLLink = ({
    to,
    children,
    isExternal,
    ...rest,
}) => {
  if (isExternal) {
    let href = `https://${to}`;
    if (to.slice(0,8) === "https://")
      href = to;
    return (
      <a href={href} {...rest}>{children}</a>
    );
  }
  return (
    <Link to={to} {...rest}>{children}</Link>
  );
};

RLLink.defaultProps = {
  isExternal: false,
};

RLLink.propTypes = {
  to: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
};
