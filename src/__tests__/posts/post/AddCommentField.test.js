import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureStore([]);

import AddCommetField from "../../../components/main/posts/post/AddCommentField";

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

describe("rendering AddCommetField component", () => {
  it("renders AddCommetField component", () => {
    const history = createMemoryHistory();

    let store = mockStore({
      errorReducer: {
        error: "",
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <AddCommetField />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("addcommentfield")).toBeInTheDocument();
  });

  it("fires dispatch onClick", () => {
    const history = createMemoryHistory();

    let store = mockStore({
      errorReducer: {
        error: "",
      },
    });

    const onAddComment = jest.fn();
    let props = { onAddComment };

    render(
      <Provider store={store}>
        <Router history={history}>
          <AddCommetField {...props} />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Add a comment..."), {
      target: { value: "test" },
    });
    fireEvent(
      screen.getByText("Post"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    // screen.debug();
    expect(onAddComment).toHaveBeenCalled();
  });
});
