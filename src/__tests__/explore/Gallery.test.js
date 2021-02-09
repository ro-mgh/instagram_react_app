import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { _propsGallery } from "../../../__mocks__/server/posts";

import Gallery from "../../components/main/explore/Gallery";

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

describe("rendering Gallery component", () => {
  it("renders Gallery component", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Gallery {..._propsGallery} />
      </Router>
    );
    // screen.debug();
  });

  it("renders Gallery component without props", () => {
    render(<Gallery />);
  });
});
