// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(({ spacing, palette }) => ({
  button: {
    borderRadius: "20px",
    height: "46px",
    background: "linear-gradient(90deg, #00BF0B 0%, #B5E200 100%)",
    boxShadow: "none",
    color: palette.text.primary,
    fontSize: 16,
    fontWeight: "bold",
    width: "100%"
  },
  arrowRight: {
    fontSize: 26,
    position: "absolute",
    right: spacing(1.2),
    top: spacing(1.2),
    color: palette.text.primary
  }
}));
