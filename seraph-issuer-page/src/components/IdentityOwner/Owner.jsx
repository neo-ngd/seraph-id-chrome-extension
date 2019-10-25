// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from "react";
import { Link } from "react-router-dom";
import "./Owner.css";
import { Fab, CardHeader, Avatar, Grid, Tooltip } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const OWNER_GOV_BTN_LABEL = "Apply for Passport";
const OWNER_AGENCY_BTN_LABEL = "Book a flat";
const OWNER_DOOR_BTN_LABEL = "Open the door";

const Owner = ({ address }) => {
  return (
    <span>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe">
            <AccountCircleIcon className="OwnerIcon" />{" "}
          </Avatar>
        }
        title={
          <div className="AgentCardTitle">
            <div>{address ? <h3>{address}</h3> : null}</div>
            <div>
              <h2> Identity Owner </h2>{" "}
            </div>
          </div>
        }
        className="AgentCardHeader"
      />

      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            spacing={0}
            direction="column"
            justify="space-between"
            className="OwnerGridContainer"
          >
            {address ? (
              <React.Fragment>
                <Grid item className="OwnerGridItem">
                  <div>
                    <p>Ask the to issue a digital Passport. </p>
                    <Link to="/government" className="ButtonLink">
                      <Fab variant="extended" color="primary">
                        {OWNER_GOV_BTN_LABEL}
                      </Fab>
                    </Link>
                  </div>
                </Grid>

                <Grid item className="OwnerGridItem">
                  <div>
                    <p>
                      Use the claim of digital Passport you just got and go to
                      the accomodation dApp to get another credential: the
                      access key.{" "}
                    </p>
                    <Link to="/accommodation" className="ButtonLink">
                      <Fab variant="extended" color="primary">
                        {OWNER_AGENCY_BTN_LABEL}
                      </Fab>
                    </Link>
                  </div>
                </Grid>

                <Grid item className="OwnerGridItem">
                  <div>
                    <p>
                      Use the access key provided from the Agency,
                      <br /> to open the door of the accommodation.{" "}
                    </p>
                    <Tooltip title={" didn't book any flat yet"}>
                      <div>
                        <Fab disabled variant="extended">
                          {OWNER_DOOR_BTN_LABEL}
                        </Fab>
                      </div>
                    </Tooltip>
                  </div>{" "}
                </Grid>
              </React.Fragment>
            ) : (
              <h2>
                No wallet detected, please install the Seraph ID Chrome
                Extension to continue
              </h2>
            )}
          </Grid>
        </Grid>
      </Grid>
    </span>
  );
};

export default Owner;
