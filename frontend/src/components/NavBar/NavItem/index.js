import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

export default function NavItem({ active, to, name, changeRepo }) {
  return (
    <Link
      className={`nav-item nav-link ${active ? 'active' : ''}`}
      to={to}
      onClick={changeRepo}>
      {name}
    </Link>
  );
}

NavItem.propTypes = {
  active: PropTypes.bool,
  to: PropTypes.string,
  name: PropTypes.string,
  changeRepo: PropTypes.func,
};
