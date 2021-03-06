import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import Main from "../components/Main";

import configureStore from "redux-mock-store";

import { Provider } from "react-redux";

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

describe("rendering Main component", () => {
  let store;
  let component;
  const history = createMemoryHistory();

  // beforeEach(() => {});

  it("renders Main component without props", () => {
    store = mockStore({
      firebaseReducer: {
        auth: "tbc",
      },
    });

    component = render(
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    );

    // screen.debug();
    expect(component.container).toMatchSnapshot();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders Main component with no user auth, and redirecting to signin", () => {
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
          <Main />
        </Router>
      </Provider>
    );
    // screen.debug();
    expect(component.container).toMatchSnapshot();
    expect(screen.getByTestId("signin")).toBeInTheDocument();
  });
});

// add mainfield test with loaded true, isEmpty false
