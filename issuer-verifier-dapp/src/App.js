import React, { useEffect, useState } from "react";
import "./App.css";
import GovernmentPage from "./scenes/GovernmentPage/GovernmentPage";
import AccommodationPage from "./scenes/AccommodationPage/AccommodationPage";
import DashBoard from "./scenes/Dashboard/Dashboard";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    document.addEventListener("shareAccount", addressListener);
    return () => document.removeEventListener("shareAddress", addressListener);
  }, []);

  const addressListener = ({ detail }) => setAddress(detail);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={props => <DashBoard {...props} address={address} />}
          />
          <Route
            path="/government"
            render={props => <GovernmentPage {...props} address={address} />}
          />
          <Route
            path="/accommodation"
            render={props => <AccommodationPage {...props} address={address} />}
          />

          <Route
            path="/dashboard"
            render={props => <DashBoard {...props} address={address} />}
          />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#58BF00",
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: "#405A94",
      main: "#2d4a89",
      contrastText: "#FFFFFF"
    },
    error: {
      light: "#F9A698",
      main: "#f45c42",
      contrastText: "#FFFFFF"
    }
  },
  overrides: {
    MuiSnackbarContent: {
      root: {
        maxWidth: "100vw !important",
        minWidth: "max-content !important",
        boxSizing: "border-box",
        backgroundColor: "#ff9602",
        borderRadius: "30px !important",
        color: "white",
        textAlign: "center",
        fontSize: "13.5pt"
      }
    },
    MuiFab: {
      primary: {
        background:
          "linear-gradient(120deg, #58bf00, #58bf00, #a4dc00 60%, #b5e200)",
        color: "#FFFFFF"
      },
      root: {
        height: "40px !important"
      }
    },
    MuiInputLabel: {
      root: {
        "&$focused": {
          color: "#2d4a89 !important"
        }
      },
      error: {
        "&$focused": {
          color: "red !important"
        }
      }
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #2d4a89"
        }
      }
    }
  }
});
