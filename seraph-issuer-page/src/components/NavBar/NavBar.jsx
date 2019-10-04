import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, IconButton, Typography, Box} from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import {Link} from "react-router-dom";
import Address from "../Adress/Address";

const useStyles = makeStyles(({ palette, spacing }) => ({
  barStyle: {
    background: palette.primary.dark,
    height: "56px",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  links: {

  },
  link: {
    color: 'white',
    margin: spacing(1),
    '&:hover': {
      textDecoration: 'none',
    }
  }
}));

export default function NavBar({ address }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.barStyle} position="static" color="default">
      <Toolbar className={classes.toolbar}>
        <Box className={classes.left}>
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
        </Box>
        <Address address={address} />
        <Box className={classes.links}>
          <Link className={classes.link} to={'/government'}>issuer</Link>
          <Link className={classes.link} to={'/verifier'}>verifier</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
