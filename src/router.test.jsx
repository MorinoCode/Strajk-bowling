import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

// همان route ها را جدا تعریف می‌کنیم
import Booking from "./views/Booking";
import Confirmation from "./views/Confirmation";

const routes = [
  {
    path: "/",
    element: <Booking />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />,
  },
];

// Mock components
vi.mock("./views/Booking", () => ({
  default: () => <div data-testid="booking-view">Booking View</div>,
}));

vi.mock("./views/Confirmation", () => ({
  default: () => <div data-testid="confirmation-view">Confirmation View</div>,
}));

describe("Router configuration", () => {
  test("renders Booking view at '/'", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("booking-view")).toBeInTheDocument();
  });

  test("renders Confirmation view at '/confirmation'", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/confirmation"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("confirmation-view")).toBeInTheDocument();
  });
});
