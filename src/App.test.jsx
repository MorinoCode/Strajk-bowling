import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import App from "./App";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    RouterProvider: ({ router }) => <div data-testid="router-provider">Mock Router</div>,
  };
});

describe("App Component", () => {
  test("renders RouterProvider", () => {
    render(<App />);

    expect(screen.getByTestId("router-provider")).toBeInTheDocument();
  });
});
