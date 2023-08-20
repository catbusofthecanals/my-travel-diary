import { render, screen } from "@testing-library/react";
import Login from "./components/LogIn";
import { BrowserRouter } from "react-router-dom";
// import BrowserRouter to successfully render <Link> in heading

// unit test test to test NavBar is rendered on page
test("renders NavBar heading", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const div = screen.getByText("My Travel Diary");
  expect(div).toBeInTheDocument();
});
