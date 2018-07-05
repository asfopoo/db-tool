import React from 'react';

import PropTypes from 'prop-types';

export const XPanel = ({children = null}) => (
  <div className="x-panel">
    {children}
  </div>
);

XPanel.propTypes = {
  children: PropTypes.node,
};
