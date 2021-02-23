import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import { act } from "react-dom/test-utils";
import { act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import PictureField from "../../components/main/picture/PictureField";

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureStore([]);

import { _user } from "../../../__mocks__/server/user";
import { _post } from "../../../__mocks__/server/post";

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

describe("rendering Picture component", () => {
  it("renders Picture loading", () => {
    const history = createMemoryHistory();

    let store = mockStore({
      authReducer: {
        user: _user,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <PictureField />
        </Router>
      </Provider>
    );

    // screen.debug();
    expect(screen.getByTestId("progress")).toBeInTheDocument();
  });

  it("renders Picture", async () => {
    const history = createMemoryHistory();

    let store = mockStore({
      authReducer: {
        user: _user,
      },
    });

    // Cache original functionality
    const realUseState = React.useState;

    // Stub the initial state
    const stubInitialState = _post;

    // Mock useState before rendering your component
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => realUseState(stubInitialState));

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(_post),
      })
    );

    const component = render(
      <Provider store={store}>
        <Router history={history}>
          <PictureField />
        </Router>
      </Provider>
    );

    // screen.debug();
    expect(component.container).toMatchSnapshot();
    expect(screen.getByTestId("picture")).toBeInTheDocument();
    global.fetch.mockRestore();
  });
});
