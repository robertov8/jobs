import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';

export default function Routes() {
  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route path="/" exact component={About} />
        <Route path="/:repo/:slug?" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
