import React from 'react';

export const RLLabel = ({
  children,
  htmlFor,
}) => {
  return (
    <label className="rl-label" htmlFor={htmlFor}>{children}</label>
  );
};
