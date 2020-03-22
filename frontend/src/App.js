import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { MdUpdate } from 'react-icons/md';

import GlobalStyle from './styles/global';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        className="mb-1 justify-content-between"
      >
        <Navbar.Brand>GitHub Jobs</Navbar.Brand>
        <Button type="button">
          <MdUpdate />
        </Button>
      </Navbar>

      <Home />

      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
