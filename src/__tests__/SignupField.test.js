import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import configureStore from "redux-mock-store";

import { Provider } from "react-redux";

import SignupField from "../components/signup/SignupField";
// import ProtectedSignup from "../views/ProtectedSignup";

const mockStore = configureStore([]);

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("rendering Signup component", () => {
  let store;
  let component;
  const history = createMemoryHistory();

  it("renders Signup component without user", () => {
    store = mockStore({
      firebaseReducer: {
        auth: {
          isLoaded: true,
          isEmpty: true,
        },
      },
      authReducer: {
        authMsgSuccess: "",
        authMsgError: "",
      },
    });

    component = render(
      <Provider store={store}>
        <Router history={history}>
          <SignupField />
        </Router>
      </Provider>
    );
    // screen.debug();
    expect(component.container).toMatchSnapshot();
    expect(screen.getByTestId("signup")).toBeInTheDocument();
  });
});
