import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "./Booking";
import Confirmation from "./Confirmation";
import { vi } from "vitest";

const sel = (role) =>
  ({
    when: () => document.querySelector("input[name='when']"),
    time: () => document.querySelector("input[name='time']"),
    people: () => document.querySelector("input[name='people']"),
    lanes: () => document.querySelector("input[name='lanes']"),
  }[role]());

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  sessionStorage.clear();
  mockNavigate.mockClear();
});

test("renders Booking view correctly", () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  expect(screen.getAllByText("Booking")[0]).toBeInTheDocument();
  expect(screen.getByText("strIIIIIike!")).toBeInTheDocument();
});

test("shows error when required fields are missing", () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("strIIIIIike!"));

  expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeInTheDocument();
});

test("shows error when number of shoes does not match players count", () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  fireEvent.change(sel("when"), { target: { value: "2024-10-10" } });
  fireEvent.change(sel("time"), { target: { value: "10:30" } });
  fireEvent.change(sel("people"), { target: { value: 2 } });
  fireEvent.change(sel("lanes"), { target: { value: 1 } });

  fireEvent.click(screen.getByText("+"));

  fireEvent.click(screen.getByText("strIIIIIike!"));

  expect(
    screen.getByText("Antalet skor måste stämma överens med antal spelare")
  ).toBeInTheDocument();
});

test("shows error when a shoe size is empty", () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  fireEvent.change(sel("when"), { target: { value: "2024-10-10" } });
  fireEvent.change(sel("time"), { target: { value: "10:30" } });
  fireEvent.change(sel("people"), { target: { value: 1 } });
  fireEvent.change(sel("lanes"), { target: { value: 1 } });

  fireEvent.click(screen.getByText("+"));

  fireEvent.click(screen.getByText("strIIIIIike!"));

  expect(screen.getByText("Alla skor måste vara ifyllda")).toBeInTheDocument();
});

test("shows error when players exceed lane capacity", () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  fireEvent.change(sel("when"), { target: { value: "2024-10-10" } });
  fireEvent.change(sel("time"), { target: { value: "10:30" } });
  fireEvent.change(sel("people"), { target: { value: 5 } });
  fireEvent.change(sel("lanes"), { target: { value: 1 } });

  for (let i = 0; i < 5; i++) {
    fireEvent.click(screen.getByText("+"));
  }

  const shoes = screen.getAllByRole("textbox");
  shoes.forEach((shoe, idx) => {
    fireEvent.change(shoe, { target: { value: `${40 + idx}` } });
  });

  fireEvent.click(screen.getByText("strIIIIIike!"));

  expect(
    screen.getByText("Det får max vara 4 spelare per bana")
  ).toBeInTheDocument();
});

test("adds and removes shoe fields correctly", () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("+"));
  expect(screen.getAllByRole("textbox").length).toBe(1);

  fireEvent.click(screen.getByText("-"));
  expect(screen.queryByRole("textbox")).toBeNull();
});

test("successful booking stores confirmation and navigates", async () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  fireEvent.change(sel("when"), { target: { value: "2024-10-10" } });
  fireEvent.change(sel("time"), { target: { value: "10:30" } });
  fireEvent.change(sel("people"), { target: { value: 3 } });
  fireEvent.change(sel("lanes"), { target: { value: 2 } });

  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("+"));

  const shoes = screen.getAllByRole("textbox");
  fireEvent.change(shoes[0], { target: { value: "40" } });
  fireEvent.change(shoes[1], { target: { value: "41" } });
  fireEvent.change(shoes[2], { target: { value: "42" } });

  fireEvent.click(screen.getByText("strIIIIIike!"));

  await waitFor(() =>
    expect(mockNavigate).toHaveBeenCalledWith("/confirmation", expect.any(Object))
  );

  const saved = JSON.parse(sessionStorage.getItem("confirmation"));
  expect(saved.bookingId).toBeDefined();
});

test("renders Confirmation from sessionStorage", () => {
  sessionStorage.setItem(
    "confirmation",
    JSON.stringify({
      when: "2024-10-10T10:30",
      lanes: 2,
      people: 3,
      price: 560,
      bookingId: "XYZ999",
    })
  );

  render(
    <MemoryRouter>
      <Confirmation />
    </MemoryRouter>
  );

  expect(screen.getByDisplayValue("2024-10-10 10:30")).toBeInTheDocument();
  expect(screen.getByDisplayValue("XYZ999")).toBeInTheDocument();
});

test("does not show any error when all fields are correctly filled", async () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  fireEvent.change(document.querySelector('input[name="when"]'), {
    target: { value: "2024-10-10" },
  });

  fireEvent.change(document.querySelector('input[name="time"]'), {
    target: { value: "10:30" },
  });

  fireEvent.change(document.querySelector('input[name="people"]'), {
    target: { value: 3 },
  });

  fireEvent.change(document.querySelector('input[name="lanes"]'), {
    target: { value: 1 },
  });

  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("+"));

  const shoes = screen.getAllByRole("textbox");

  fireEvent.change(shoes[0], { target: { value: "40" } });
  fireEvent.change(shoes[1], { target: { value: "41" } });
  fireEvent.change(shoes[2], { target: { value: "42" } });

  fireEvent.click(screen.getByText("strIIIIIike!"));

  expect(screen.queryByText("Alla fälten måste vara ifyllda")).toBeNull();
  expect(
    screen.queryByText("Antalet skor måste stämma överens med antal spelare")
  ).toBeNull();
  expect(screen.queryByText("Alla skor måste vara ifyllda")).toBeNull();
  expect(screen.queryByText("Det får max vara 4 spelare per bana")).toBeNull();
});

