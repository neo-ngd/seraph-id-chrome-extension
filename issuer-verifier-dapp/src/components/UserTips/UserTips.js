// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License
import React, { useState } from "react";
import "./UserTips.css";
import { Snackbar } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";

const UserTips = () => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      onClick={() => setOpen(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={open}
      message={
        <span className="UserTipContent">
          <InfoIcon className="TipInfoIcon" />
        </span>
      }
    />
  );
};

export default UserTips;
