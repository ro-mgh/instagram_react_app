import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedSignin from "./views/ProtectedSignin";
import ProtectedSignup from "./views/ProtectedSignup";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        {/* <ProtectedSignin exact path="/signin" />
            <ProtectedSignup exact path="/signup" /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
