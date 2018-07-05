import React from 'react';

import PropTypes from 'prop-types';

export const XContent = ({children = null}) => (
  <div className="x-content">
    {children}
  </div>
);

XContent.propTypes = {
  children: PropTypes.node,
};
