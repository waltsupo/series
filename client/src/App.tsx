import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Redirect, Switch } from "react-router-dom";

import Login from "./Login";
import LatestEpisodes from "./LatestEpisodes";

export const history = createBrowserHistory();

const NoMatch = () => <Redirect to="/latest" />;

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/latest" component={LatestEpisodes} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
