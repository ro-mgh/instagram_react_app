import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import AlertPop from "../../components/main/errors/AlertPop";

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

describe("rendering AlertPop component", () => {
  it("renders AlertPop component with error", () => {
    const history = createMemoryHistory();

    let store = mockStore({
      errorReducer: {
        error: "Test error",
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <AlertPop />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByTestId("error")).toHaveTextContent("Test error");
  });

  it("not renders AlertPop component without error", () => {
    const history = createMemoryHistory();

    let store = mockStore({
      errorReducer: {
        error: "",
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <AlertPop />
        </Router>
      </Provider>
    );

    // screen.debug();
    expect(() => screen.getByTestId("error")).toThrow(
      'Unable to find an element by: [data-testid="error"]'
    );
  });
});
