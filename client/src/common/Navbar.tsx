import React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import useStore from "../store";
import { logoutRequest } from "../API";

const Navbar: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();

  const setUser = useStore((state) => state.setUser);

  const logout = async () => {
    await logoutRequest();
    setUser(undefined);
    history.push("/login");
  };

  return (
    <AppBar className={styles.container} position="relative">
      <Toolbar className={styles.toolbar}>
        <div>
          <Link to="/latest">
            <Button
              className={
                history.location.pathname === "/latest"
                  ? styles.active
                  : styles.nav
              }
              variant="outlined"
            >
              <Typography className={styles.title}>Latest</Typography>
            </Button>
          </Link>
          <Link to="/series">
            <Button
              className={
                history.location.pathname === "/series"
                  ? styles.active
                  : styles.nav
              }
              variant="outlined"
            >
              <Typography className={styles.title}>Series</Typography>
            </Button>
          </Link>
        </div>
        <Button className={styles.nav} onClick={logout}>
          <Typography className={styles.title}>Logout</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

const useStyles = makeStyles(() => ({
  container: {
    heigh: "50px",
    marginBottom: "10px",
  },
  active: {
    color: "white",
    borderColor: "white",
  },
  nav: {
    color: "white",
    border: "none",
  },
  title: {
    textDecoration: "none",
  },
  toolbar: {
    justifyContent: "space-between",
  },
}));
