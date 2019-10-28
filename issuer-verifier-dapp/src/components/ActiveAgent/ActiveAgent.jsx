// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import * as React from "react";
import "./ActiveAgent.css";
import Chip from "@material-ui/core/Chip";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar } from "@material-ui/core";

function ActiveAgent({ address }) {
  const style = { paddingRight: "5px" };

  return (
    <div className="AgentChipContainer">
      <div> </div>
      <div>
        <Chip
          avatar={
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          }
          label={
            <p>
              <strong style={style}> {" " + address} </strong>
            </p>
          }
        />
      </div>
    </div>
  );
}

export default ActiveAgent;
