import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Navbar } from 'react-bootstrap';
import { MdUpdate } from 'react-icons/md';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Home from './pages/Home';
import { syncIssue } from './store/modules/issue/actions';

function App() {
  const tabSize = useSelector(state => state.issues.tabSize);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        className="mb-1 justify-content-between"
      >
        <Navbar.Brand>GitHub Jobs {tabSize ? `(${tabSize})` : ''}</Navbar.Brand>
        <Button type="button">
          <MdUpdate onClick={() => dispatch(syncIssue())} />
        </Button>
      </Navbar>

      <Home />

      <GlobalStyle />
    </>
  );
}

export default App;
