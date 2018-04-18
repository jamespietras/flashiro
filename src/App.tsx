import * as React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter, Route} from 'react-router-dom';

import Dashboard from './modules/Dashboard';
import Sidebar from './modules/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <aside>
          <Sidebar />
        </aside>

        <main>
          <Route component={Dashboard} exact path="/" />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default hot(module)(App);
