import { render, screen, fireEvent } from "@testing-library/react";
import Shoes from "./Shoes";

describe("Shoes Component", () => {
  const mockUpdateSize = vi.fn();
  const mockAddShoe = vi.fn();
  const mockRemoveShoe = vi.fn();

  const mockShoes = [
    { id: "a1", size: "" },
    { id: "b2", size: "" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders heading 'Shoes'", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={mockShoes}
      />
    );

    expect(screen.getByText("Shoes")).toBeInTheDocument();
  });

  it("renders shoe input fields based on shoes prop", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={mockShoes}
      />
    );

    // Labels exist
    expect(screen.getByText("Shoe size / person 1")).toBeInTheDocument();
    expect(screen.getByText("Shoe size / person 2")).toBeInTheDocument();

    // Inputs exist
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);
  });

  it("calls addShoe when + button is clicked", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={mockShoes}
      />
    );

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    expect(mockAddShoe).toHaveBeenCalledTimes(1);
  });

  it("calls removeShoe when - button is clicked", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={mockShoes}
      />
    );

    const buttons = screen.getAllByText("-");
    fireEvent.click(buttons[0]);

    expect(mockRemoveShoe).toHaveBeenCalledTimes(1);
    expect(mockRemoveShoe).toHaveBeenCalledWith("a1");
  });

  it("calls updateSize when typing in shoe input", () => {
    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={[{ id: "abc", size: "" }]}
      />
    );

    const input = screen.getAllByRole("textbox")[0];

    fireEvent.change(input, { target: { name: "abc", value: "41" } });

    expect(mockUpdateSize).toHaveBeenCalledTimes(1);
  });
});
