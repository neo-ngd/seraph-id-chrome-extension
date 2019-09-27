import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#FFF",
      secondary: "#CBCFD4",
      light: "#CBCFD4"
    },
    primary: {
      main: "#3C444D",
      dark: "#30363D",
      light: "#FFF"
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
