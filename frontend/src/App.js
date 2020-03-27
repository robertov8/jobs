import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Navbar } from 'react-bootstrap';
import { MdUpdate } from 'react-icons/md';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.min.css';

import Routes from './routes';

import { syncIssue } from './store/modules/issue/actions';
import { ToastContainer } from 'react-toastify';

function App() {
  const tabSize = useSelector(state => state.issues.tabSize);
  const dispatch = useDispatch();

  return (
    <>
      <GlobalStyle />
      <ToastContainer position="bottom-right" />

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

      <Routes />
    </>
  );
}

export default App;
