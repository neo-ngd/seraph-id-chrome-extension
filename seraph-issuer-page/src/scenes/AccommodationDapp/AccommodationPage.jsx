// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from "react";
import "./AccommodationDapp.css";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ActiveAgent from "./node_modules/components/ActiveAgent/ActiveAgent";
import CloseIcon from "@material-ui/icons/Close";
import UserTips from "./node_modules/components/UserTips/UserTips";
import HelpIcon from "@material-ui/icons/HelpOutline";

const AccommodationPage = () => {
  return (
    <span>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <HomeIcon className="AgencyLogo" />
          </IconButton>
          <Typography variant="h6" color="inherit" className="NavBarTypography">
            {" "}
            Smart Agency dApp{" "}
          </Typography>

          <Tooltip title="Help">
            <Link to="/help" className="HelpButton">
              <IconButton color="inherit" aria-label="Menu">
                <HelpIcon className="HelpIconBar" />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Close Agency Web Page">
            <Link to="/dashboard" className="CloseButton">
              <IconButton color="inherit" aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <div className="AgencyPageContainer">
        <ActiveAgent location="AgencyWebPage" />
        <UserTips location="AgencyWebPage" />
        <div className="AgencyPageContent"></div>
      </div>
    </span>
  );
};

export default AccommodationPage;
