import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { _propsGallery } from "../../../__mocks__/server/posts";

import Header from "../../components/main/header/Header";

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureStore([]);

import { _users } from "../../../__mocks__/server/users";
import { _user } from "../../../__mocks__/server/user";

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

describe("rendering Header component", () => {
  it("renders Header component", () => {
    const history = createMemoryHistory();

    let store = mockStore({
      dataReducer: {
        users: _users,
      },
      authReducer: {
        user: _user,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    );

    // screen.debug();
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
