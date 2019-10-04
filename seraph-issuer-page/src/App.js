import React, {useEffect, useState} from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import IssuerPage from "./scenes/IssuerPage";
import VerifierPage from "./scenes/VerifierPage";

import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    document.addEventListener('shareAccount', addressListener);
    return () => document.removeEventListener('shareAddress', addressListener);
  }, []);

  const addressListener = ({detail}) => setAddress(detail);

  return (
    <Router>
      <div>
        <NavBar address={address} />
        <div style={{ paddingTop: "90px" }}>
          <Route exact path="/" render={props => (<IssuerPage {...props} address={address}/>)} />
          <Route path="/government" render={props => (<IssuerPage {...props} address={address}/>)} />
          <Route path="/verifier" render={props => (<VerifierPage {...props} address={address}/>)} />
        </div>
      </div>
    </Router>
  );
}

export default App;
