// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from "react";
import "./NavBar.css";
import {
  Tooltip,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/HelpOutline";
import logoHorizontal from "../../assets/seraph-logo-horizontal.png";

function NavBar() {
  return (
    <div className="NavBarRoot">
      <AppBar position="static" className="NavBarMain">
        <Toolbar>
          <Tooltip title="Go to Seraph ID landing page">
            <a href="https://www.seraphid.io/">
              <img
                src={logoHorizontal}
                alt="SeraphID logo"
                className="navLogo"
              />
            </a>
          </Tooltip>
          <Typography className="NavBarTypography"> </Typography>
          <Tooltip title="Help">
            <IconButton color="inherit" aria-label="Menu">
              <HelpIcon className="HelpIconBar" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
