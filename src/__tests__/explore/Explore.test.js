import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "../../../__mocks__/server/matchMedia.mock";

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

import { useInfiniteQuery, QueryClient } from "react-query";
jest.mock("react-query");

import Explore from "../../components/main/explore/Explore";

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

describe("rendering Explore component", () => {
  it("renders Explore component", () => {
    const QueryClient = jest.fn();
    useInfiniteQuery.mockReturnValue({
      data: {},
      error: "",
      fetchNextPage: jest.fn(),
      hasNextPage: jest.fn(),
      isFetching: false,
      isFetchingNextPage: false,
      status: "loading",
    });

    const history = createMemoryHistory();

    let store = mockStore({
      dataReducer: {
        users: {},
      },
      authReducer: {
        user: _user,
      },
    });

    store.dispatch = jest.fn();

    const component = render(
      <Provider store={store}>
        <Router history={history}>
          <Explore />
        </Router>
      </Provider>
    );

    // screen.debug();
    expect(component.container).toMatchSnapshot();
    expect(screen.getByTestId("explore")).toBeInTheDocument();
  });
});
