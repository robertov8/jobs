import React from 'react';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function NavPills({ active, name, tabSelect }) {
  return (
    <li className="nav-item ">
      <a
        href="/#"
        role="tab"
        data-toggle="pill"
        className={`nav-link ${active ? 'active' : ''}`}
        onClick={() => tabSelect()}>
        {name}
      </a>
    </li>
  );
}

NavPills.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  tabSelect: PropTypes.func,
};
