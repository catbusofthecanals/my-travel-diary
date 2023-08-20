import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Register from "../components/Registration";
//import BrowserRouter to successfully render <Link> in heading

// snapshot test of help component
test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
