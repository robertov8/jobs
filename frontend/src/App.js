import React from 'react';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import AppHotKeys from './AppHotKeys';
import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.min.css';

import Routes from './routes';

function App() {
  return (
    <AppHotKeys>
      <GlobalStyle />
      <ToastContainer position="bottom-right" />

      <Routes />
    </AppHotKeys>
  );
}

export default App;
