import React from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from "./Styles";

export default function BaseButton({ handleClick, text }) {
  const classes = useStyles();
  return (
    <Button onClick={handleClick} className={classes.root}>
      {text}
    </Button>
  );
}
