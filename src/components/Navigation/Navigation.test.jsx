import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Navigation Component – full coverage", () => {
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

  test("menu is hidden by default", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText("Booking")).toHaveClass("hide");
    expect(screen.getByText("Confirmation")).toHaveClass("hide");
  });

  test("toggleMenu opens menu", () => {
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

  test("toggleMenu closes menu again", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const icon = screen.getByRole("img");

    fireEvent.click(icon);  // open
    fireEvent.click(icon);  // close

    expect(screen.getByText("Booking")).toHaveClass("hide");
    expect(screen.getByText("Confirmation")).toHaveClass("hide");
  });

  test("navigate to Booking when clicking Booking link", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("img")); // open menu
    fireEvent.click(screen.getByText("Booking"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("navigate to Confirmation when clicking Confirmation link", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("img")); // open menu
    fireEvent.click(screen.getByText("Confirmation"));

    expect(mockNavigate).toHaveBeenCalledWith("/confirmation");
  });

  test("clicking Booking when menu is closed still triggers navigate", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Booking"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("clicking Confirmation when menu is closed still triggers navigate", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Confirmation"));
    expect(mockNavigate).toHaveBeenCalledWith("/confirmation");
  });
});
