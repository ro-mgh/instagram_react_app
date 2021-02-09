import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import Main from "../components/Main";

import configureStore from "redux-mock-store";

import { Provider } from "react-redux";
import renderer from "react-test-renderer";

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
    // expect(component.container.firstChild).
  });

  // it("renders Main component with user", () => {
  //   expect(component.toJSON()).toMatchSnapshot();
  // });
});
