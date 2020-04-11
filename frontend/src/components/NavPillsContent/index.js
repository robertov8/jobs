import React from 'react';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function NavPillsContent({ active, children }) {
  return (
    <div
      role="tabpanel"
      className={`tab-pane fade  ${active ? 'show active' : ''}`}>
      {children}
    </div>
  );
}

NavPillsContent.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
};
