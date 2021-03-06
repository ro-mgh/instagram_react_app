import "./App.css";
import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import ProtectedSignin from "./views/ProtectedSignin";
import ProtectedSignup from "./views/ProtectedSignup";
import store from "./store/store";
import { Provider } from "react-redux";
import firebase from "./services/firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import ProtectedProfile from "./views/ProtectedProfile";
import ProtectedExplore from "./views/ProtectedExplore";
import ProtectedPicture from "./views/ProtectedPicture";
import queryClient from "./utils/queryClient";
import { QueryClientProvider } from "react-query";

const rrfConfig = { userProfile: "users" };

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

const App: FunctionComponent = () => {
  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <ProtectedProfile path="/profile/:userId" />
              <ProtectedExplore exact path="/explore" />
              <ProtectedPicture path="/picture/:pictureId" />
              <ProtectedSignin exact path="/signin" />
              <ProtectedSignup exact path="/signup" />
            </Switch>
          </Router>
        </QueryClientProvider>
      </Provider>
    </ReactReduxFirebaseProvider>
  );
};

export default App;
