import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "./Booking";

vi.mock("../components/Navigation/Navigation", () => ({
  default: () => <nav>Navigation</nav>,
}));

vi.mock("../components/Top/Top", () => ({
  default: ({ title }) => <h1>{title}</h1>,
}));

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        bookingDetails: {
          when: "2024-10-10T10:00",
          people: 2,
          lanes: 1,
          shoes: ["41", "42"],
        },
      }),
  })
);

const setup = () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );
};

describe("Booking Component", () => {
  it("renders initial UI correctly", () => {
    setup();

    expect(screen.getByText("Booking")).toBeInTheDocument();
    expect(screen.getByText("Shoes")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "strIIIIIike!" })).toBeInTheDocument();
  });

  it("shows error when required fields are missing", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /strIIIIIike/i }));

    expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeInTheDocument();
  });

  it("shows error when number of shoes does not match number of players", () => {
    setup();

    const dateInput = document.querySelector('input[name="when"]');
    const timeInput = document.querySelector('input[name="time"]');
    const peopleInput = document.querySelector('input[name="people"]');
    const lanesInput = document.querySelector('input[name="lanes"]');

    fireEvent.change(dateInput, { target: { value: "2024-10-10" } });
    fireEvent.change(timeInput, { target: { value: "10:00" } });
    fireEvent.change(peopleInput, { target: { value: "2" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    // Add ONE shoe but players = 2
    fireEvent.click(screen.getByRole("button", { name: "+" }));

    fireEvent.click(screen.getByRole("button", { name: /strIIIIIike/i }));

    expect(
      screen.getByText("Antalet skor måste stämma överens med antal spelare")
    ).toBeInTheDocument();
  });

  it("shows error when shoe sizes are empty", () => {
    setup();

    const dateInput = document.querySelector('input[name="when"]');
    const timeInput = document.querySelector('input[name="time"]');
    const peopleInput = document.querySelector('input[name="people"]');
    const lanesInput = document.querySelector('input[name="lanes"]');

    fireEvent.change(dateInput, { target: { value: "2024-10-10" } });
    fireEvent.change(timeInput, { target: { value: "10:00" } });
    fireEvent.change(peopleInput, { target: { value: "1" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    // Add 1 shoe
    fireEvent.click(screen.getByRole("button", { name: "+" }));

    fireEvent.click(screen.getByRole("button", { name: /strIIIIIike/i }));

    expect(screen.getByText("Alla skor måste vara ifyllda")).toBeInTheDocument();
  });

  it("submits booking successfully when everything is valid", async () => {
    setup();

    const dateInput = document.querySelector('input[name="when"]');
    const timeInput = document.querySelector('input[name="time"]');
    const peopleInput = document.querySelector('input[name="people"]');
    const lanesInput = document.querySelector('input[name="lanes"]');

    fireEvent.change(dateInput, { target: { value: "2024-10-10" } });
    fireEvent.change(timeInput, { target: { value: "10:00" } });
    fireEvent.change(peopleInput, { target: { value: "2" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    // Add 2 shoes
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    fireEvent.click(screen.getByRole("button", { name: "+" }));

    // Fill sizes
    const shoeInputs = document.querySelectorAll("input.shoes__input");
    fireEvent.change(shoeInputs[0], { target: { value: "41" } });
    fireEvent.change(shoeInputs[1], { target: { value: "42" } });

    fireEvent.click(screen.getByRole("button", { name: /strIIIIIike/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
