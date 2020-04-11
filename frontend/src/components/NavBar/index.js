import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdUpdate, MdSubject } from 'react-icons/md';

import NavItem from './NavItem';

import {
  changeRepository,
  loadIssues,
  syncIssue,
} from '../../store/modules/issue/actions';

// import { Container } from './styles';

export default function NavBar() {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false);
  const { repo, tabSize } = useSelector(state => state.issues);

  function handleChangeRepo(newRepo) {
    dispatch(loadIssues(repo, 'issues'));
    dispatch(changeRepository(newRepo));
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <NavLink className="navbar-brand" to="/">
        GJ
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setMenu(!menu)}>
        <span className="navbar-toggler-icon" />
      </button>

      <div
        id="navbarNav"
        className={`collapse navbar-collapse ${menu ? 'show' : ''}`}>
        <div className="navbar-nav mr-auto">
          <NavItem
            active={repo === 'frontendbr'}
            to="/frontendbr/issues"
            name="frontend-br"
            changeRepo={() => handleChangeRepo('frontendbr')}
          />

          <NavItem
            active={repo === 'backend-br'}
            to="/backend-br/issues"
            name="backend-br"
            changeRepo={() => handleChangeRepo('backend-br')}
          />

          <NavItem
            active={repo === 'react-brasil'}
            to="/react-brasil/issues"
            name="react-brasil"
            changeRepo={() => handleChangeRepo('react-brasil')}
          />

          <NavItem
            active={repo === 'phpdevbr'}
            to="/phpdevbr/issues"
            name="phpdevbr"
            changeRepo={() => handleChangeRepo('phpdevbr')}
          />
        </div>

        <button
          className="btn btn-outline-light mr-3"
          type="button"
          disabled
          onClick={() => dispatch(syncIssue(repo))}>
          <MdSubject />
          {tabSize ? tabSize : ''}
        </button>

        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => dispatch(syncIssue(repo))}>
          <MdUpdate />
        </button>
      </div>
    </nav>
  );
}
