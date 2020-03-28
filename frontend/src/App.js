import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import AppHotKeys from './AppHotKeys';

import { Button, Navbar } from 'react-bootstrap';
import { MdUpdate } from 'react-icons/md';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.min.css';

import Routes from './routes';

import { syncIssue } from './store/modules/issue/actions';

function App() {
  const tabSize = useSelector(state => state.issues.tabSize);
  const dispatch = useDispatch();

  return (
    <AppHotKeys>
      <GlobalStyle />
      <ToastContainer position="bottom-right" />

      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        className="mb-1 justify-content-between"
      >
        <Navbar.Brand>GitHub Jobs {tabSize ? `(${tabSize})` : ''}</Navbar.Brand>
        <Button type="button" onClick={() => dispatch(syncIssue())}>
          <MdUpdate />
        </Button>
      </Navbar>

      <Routes />
    </AppHotKeys>
  );
}

export default App;
