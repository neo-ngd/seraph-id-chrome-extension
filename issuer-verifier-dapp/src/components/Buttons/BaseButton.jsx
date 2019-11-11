// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License
import React from "react";
import Button from "@material-ui/core/Button";

import { useStyles } from "./Styles";

export default function BaseButton({
  handleClick,
  text,
  disabled = false,
  icon = true
}) {
  const classes = useStyles();

  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      variant="contained"
      color="inherit"
      className={classes.button}
      style={disabled ? { opacity: 0.5 } : {}}
    >
      {text}
    </Button>
  );
}
