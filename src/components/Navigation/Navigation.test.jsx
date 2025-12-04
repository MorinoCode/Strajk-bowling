import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Navigation Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders navigation icon", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("does NOT show menu links by default", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText("Booking")).toHaveClass("hide");
    expect(screen.getByText("Confirmation")).toHaveClass("hide");
  });

  test("toggles menu visibility when icon is clicked", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const icon = screen.getByRole("img");
    fireEvent.click(icon);

    expect(screen.getByText("Booking")).not.toHaveClass("hide");
    expect(screen.getByText("Confirmation")).not.toHaveClass("hide");
  });

  test("navigates to booking page when clicking 'Booking'", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("img"));
    fireEvent.click(screen.getByText("Booking"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("navigates to confirmation page when clicking 'Confirmation'", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("img"));
    fireEvent.click(screen.getByText("Confirmation"));

    expect(mockNavigate).toHaveBeenCalledWith("/confirmation");
  });
});
