import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MapPage from 'pages/MapPage';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route component={MapPage} path="/" />
        </Switch>
      </Router>
  )
}
export default App
