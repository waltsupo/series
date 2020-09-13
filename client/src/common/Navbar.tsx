import React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { history } from "../App";

const Navbar: React.FC = () => {
  const styles = useStyles();

  return (
    <AppBar className={styles.container} position="relative">
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

const useStyles = makeStyles(() => ({
  container: {
    heigh: "50px",
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
}));
