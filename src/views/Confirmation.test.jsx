import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirmation from "./Confirmation";

// Mock Top
vi.mock("../components/Top/Top", () => ({
  default: ({ title }) => <h1>{title}</h1>,
}));

// Mock Navigation
vi.mock("../components/Navigation/Navigation", () => ({
  default: () => <nav>Navigation</nav>,
}));

// ✅ Mock Input — نسخه درست که با getByLabelText سازگار است
vi.mock("../components/Input/Input", () => ({
  default: ({ label, defaultValue }) => (
    <label>
      {label}
      <input value={defaultValue} readOnly />
    </label>
  ),
}));

const mockConfirmation = {
  when: "2024-10-10T10:00",
  people: 3,
  lanes: 1,
  bookingId: "ABC123",
  price: 450,
};

const renderWithState = (state = null) => {
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/confirmation", state }]}>
      <Confirmation />
    </MemoryRouter>
  );
};

describe("Confirmation Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders 'no booking' message when no state and no sessionStorage", () => {
    renderWithState(null);
    expect(screen.getByText("Inga bokning gjord!")).toBeInTheDocument();
  });

  it("renders confirmation when data comes from state", () => {
    renderWithState({ confirmationDetails: mockConfirmation });

    expect(screen.getByLabelText("When")).toHaveValue("2024-10-10 10:00");
    expect(screen.getByLabelText("Who")).toHaveValue("3");
    expect(screen.getByLabelText("Lanes")).toHaveValue("1");
    expect(screen.getByLabelText("Booking number")).toHaveValue("ABC123");
    expect(screen.getByText("450 sek")).toBeInTheDocument();
  });

  it("renders confirmation when data comes from sessionStorage", () => {
    sessionStorage.setItem("confirmation", JSON.stringify(mockConfirmation));
    renderWithState(null);

    expect(screen.getByLabelText("When")).toHaveValue("2024-10-10 10:00");
    expect(screen.getByLabelText("Who")).toHaveValue("3");
    expect(screen.getByLabelText("Lanes")).toHaveValue("1");
    expect(screen.getByLabelText("Booking number")).toHaveValue("ABC123");
    expect(screen.getByText("450 sek")).toBeInTheDocument();
  });

  it("shows the confirmation button", () => {
    renderWithState({ confirmationDetails: mockConfirmation });

    expect(
      screen.getByRole("button", { name: "Sweet, let's go!" })
    ).toBeInTheDocument();
  });
});
