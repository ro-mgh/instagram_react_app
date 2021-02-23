import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureStore([]);

import LikesField from "../../../components/main/posts/post/LikesField";
import { _user } from "../../../../__mocks__/server/user";
import { _post } from "../../../../__mocks__/server/post";

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

describe("rendering LikesField component", () => {
  it("renders LikesField component", () => {
    const history = createMemoryHistory();

    let store = mockStore({
      errorReducer: {
        error: "",
      },
      authReducer: {
        user: _user,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <LikesField {..._post} />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("like")).toBeInTheDocument();
  });

  // it("fires dispatch onClick", () => {
  //     const history = createMemoryHistory();

  //     let store = mockStore({
  //         errorReducer: {
  //             error: "",
  //         },
  //     });

  //     const onAddComment = jest.fn();
  //     let props = { onAddComment };

  //     render(
  //         <Provider store={store}>
  //             <Router history={history}>
  //                 <LikesField {...props} />
  //             </Router>
  //         </Provider>
  //     );

  //     fireEvent.change(screen.getByPlaceholderText("Add a comment..."), {
  //         target: { value: "test" },
  //     });
  //     fireEvent(
  //         screen.getByText("Post"),
  //         new MouseEvent("click", {
  //             bubbles: true,
  //             cancelable: true,
  //         })
  //     );

  //     // screen.debug();
  //     expect(onAddComment).toHaveBeenCalled();
  // });
});
