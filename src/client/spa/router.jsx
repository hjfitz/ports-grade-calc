/**
 * main imports
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

/**
 *  local imports
 */
import { Layout } from './components/Layouts';
import { Home } from './components/Pages';
import store from '../store/';
import '../styles/main.css';

/**
 * import service worker
 * uncommented when pushing to prod
 */
// import './worker';

// scroll the app to the top on a route change
const onUpdate = () => window.scrollTo(0, 0);

// our client-side router
const router = (
  <Provider store={store}>
    <BrowserRouter onUpdate={onUpdate}>
      <Layout>
        <Switch>
          {/* Routes go here */}
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>
);

const entry = document.getElementById('react');

ReactDOM.render(router, entry);
