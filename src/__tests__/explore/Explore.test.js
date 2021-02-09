import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "../../../__mocks__/server/matchMedia.mock";

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

jest.mock("react-query", () => ({
  useInfiniteQuery: jest.fn(
    (() => {
      return {
        data: {},
        error: "",
        fetchNextPage: jest.fn(),
        hasNextPage: jest.fn(),
        isFetching: false,
        isFetchingNextPage: false,
        status: "loading",
      };
    })()
  ),
  QueryClient: jest.fn(),
}));

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
    const history = createMemoryHistory();

    let store = mockStore({
      dataReducer: {
        users: {},
      },
      authReducer: {
        user: _user,
      },
    });

    // const queryClient = new QueryClient();
    // const wrapper = ({ children }) => (
    //   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    // );

    render(
      <Provider store={store}>
        <Router history={history}>
          <Explore />
        </Router>
      </Provider>
    );

    screen.debug();
    expect(useMediaQuery).toHaveBeenCalled();
    expect(screen.getByTestId("explore")).toBeInTheDocument();
  });
});
