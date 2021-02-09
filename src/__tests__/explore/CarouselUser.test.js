import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { _user } from "../../../__mocks__/server/user";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import CarouselUser from "../../components/main/explore/CarouselUser";

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

describe("rendering CarouselUser component", () => {
  it("renders CarouselUser component", () => {
    const history = createMemoryHistory();

    let store = mockStore({
      store: "",
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <CarouselUser {..._user} />
        </Router>
      </Provider>
    );

    // screen.debug();
    expect(screen.getByTestId("carousel-user")).toBeInTheDocument();
  });
});
