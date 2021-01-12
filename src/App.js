import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from "./components/Main";
import ProtectedSignin from "./views/ProtectedSignin";
import ProtectedSignup from "./views/ProtectedSignup";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <ProtectedSignin exact path="/signin" />
        <ProtectedSignup exact path="/signup" />
      </Switch>
    </Router>
  );
}

export default App;
