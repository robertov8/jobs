import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import GlobalStyle from './styles/global';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" sticky="top" className="mb-1">
        <Navbar.Brand>GitHub Jobs</Navbar.Brand>
      </Navbar>

      <Home />

      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
