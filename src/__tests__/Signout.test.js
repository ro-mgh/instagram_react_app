import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { _propsGallery } from "../../__mocks__/server/posts";

import Signout from "../components/main/signout/Signout";

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureStore([]);

import { _users } from "../../__mocks__/server/users";
import { _user } from "../../__mocks__/server/user";

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

describe("rendering Signout component", () => {
  it("renders Signout component", () => {
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
          <Signout />
        </Router>
      </Provider>
    );
    expect(screen.getByTestId("signout")).toBeInTheDocument();
  });

  it("fires dispatch onClick", () => {
    const history = createMemoryHistory();

    let store = mockStore({
      dataReducer: {
        users: _users,
      },
      authReducer: {
        user: _user,
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Signout />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("signout"));
    // screen.debug();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
