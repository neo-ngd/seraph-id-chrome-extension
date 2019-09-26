import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const useStyles = makeStyles(({ palette }) => ({
  barStyle: {
    background: palette.primary.dark,
    height: "56px",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  }
}));

export default function NavBar({ address, name }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.barStyle} position="static" color="default">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <AccountBalanceIcon className="GovernmentLogo" />
        </IconButton>
        <Typography
          style={{ color: "#ffffffff" }}
          variant="h6"
          color="inherit"
          className="NavBarTypography"
        >
          {" "}
          Government Web Page{" "}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
