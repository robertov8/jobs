import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { MdUpdate } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { loadIssues, syncIssue } from '../../store/modules/issue/actions';

// import { Container } from './styles';

export default function NavBar() {
  const [repoNav, setRepoNav] = useState('frontendbr');
  const { tabSize } = useSelector(state => state.issues);
  const dispatch = useDispatch();

  const handleChangeRepo = useCallback(repo => {
    setRepoNav(repo);
    dispatch(loadIssues(repo, 'issues'));
  }, []);

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mb-1">
      <NavLink className="" to="/">
        <Navbar.Brand>GJ {tabSize ? `(${tabSize})` : ''}</Navbar.Brand>
      </NavLink>

      <Navbar.Toggle aria-controls="nav" />

      <Navbar.Collapse id="nav">
        <Nav className="mr-auto">
          <NavLink
            className="nav-link"
            to="/frontendbr/issues"
            onClick={() => handleChangeRepo('frontendbr')}
          >
            frontend-br
          </NavLink>
          <NavLink
            className="nav-link"
            to="/backend-br/issues"
            onClick={() => handleChangeRepo('backend-br')}
          >
            backend-br
          </NavLink>
          <NavLink
            className="nav-link"
            to="/react-brasil/issues"
            onClick={() => handleChangeRepo('react-brasil')}
          >
            react-brasil
          </NavLink>
          <NavLink
            className="nav-link"
            to="/phpdevbr/issues"
            onClick={() => handleChangeRepo('phpdevbr')}
          >
            phpdevbr
          </NavLink>
        </Nav>

        <Button type="button" onClick={() => dispatch(syncIssue(repoNav))}>
          <MdUpdate />
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
