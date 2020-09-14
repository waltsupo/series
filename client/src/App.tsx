import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Redirect, Switch, RouteProps } from "react-router-dom";

import Login from "./Login";
import LatestEpisodes from "./LatestEpisodes";
import SeriesList from "./SeriesList";
import SeriesPage from "./SeriesPage";
import useStore from "./store";
import { checkAuthRequest } from "./API";

export const history = createBrowserHistory();

const NoMatch = () => <Redirect to="/latest" />;

// Wrapper for pages that require authentication
const AuthWrapper = ({
  Component,
  routeProps,
}: {
  Component: React.FC;
  routeProps: RouteProps;
}) => {
  // 2: success, 1: fail, 0: loading
  const [isAuthenticated, setIsAuthenticated] = useState<0 | 1 | 2>(0);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      // Try authentication
      const response = await checkAuthRequest();
      if (response.status === 200) {
        setUser(response.data);
        setIsAuthenticated(2);
      } else {
        setIsAuthenticated(1);
      }
    };

    if (!user) {
      checkAuth();
    } else {
      setIsAuthenticated(2);
    }
  }, []);

  if (isAuthenticated == 2) {
    return <Component {...routeProps} />;
  } else if (isAuthenticated == 1) {
    return <Redirect to="/login" />;
  } else {
    // TODO: Loading indicator
    return <div />;
  }
};

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/latest"
          render={(props) => (
            <AuthWrapper Component={LatestEpisodes} routeProps={props} />
          )}
        />
        <Route
          exact
          path="/series"
          render={(props) => (
            <AuthWrapper Component={SeriesList} routeProps={props} />
          )}
        />
        <Route
          path="/series/:seriesId"
          render={(props) => (
            <AuthWrapper Component={SeriesPage} routeProps={props} />
          )}
        />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
