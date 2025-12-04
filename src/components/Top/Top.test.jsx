import { render, screen } from "@testing-library/react";
import Top from "./Top";
import { MemoryRouter } from "react-router-dom";

describe("Top Component", () => {
  it("renders logo image and heading", () => {
    render(
      <MemoryRouter>
        <Top title="BOOKING" />
      </MemoryRouter>
    );

    const img = screen.getByRole("img");
    const heading = screen.getByRole("heading", { level: 1 });

    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("BOOKING");
  });

  it("renders empty heading when no title is provided", () => {
    render(<Top />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("");
  });
});
