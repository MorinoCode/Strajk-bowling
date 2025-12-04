import { render, fireEvent } from "@testing-library/react";
import BookingInfo from "./BookingInfo";

const sel = (name) => document.querySelector(`input[name="${name}"]`);

describe("BookingInfo Component", () => {
  test("renders all input fields", () => {
    render(<BookingInfo updateBookingDetails={() => {}} />);

    expect(sel("when")).toBeInTheDocument();
    expect(sel("time")).toBeInTheDocument();
    expect(sel("people")).toBeInTheDocument();
    expect(sel("lanes")).toBeInTheDocument();
  });

  test("calls updateBookingDetails when changing Date", () => {
    const mockFn = vi.fn();
    render(<BookingInfo updateBookingDetails={mockFn} />);

    fireEvent.change(sel("when"), { target: { value: "2024-10-10" } });
    expect(mockFn).toHaveBeenCalled();
  });

  test("calls updateBookingDetails when changing Time", () => {
    const mockFn = vi.fn();
    render(<BookingInfo updateBookingDetails={mockFn} />);

    fireEvent.change(sel("time"), { target: { value: "10:30" } });
    expect(mockFn).toHaveBeenCalled();
  });

  test("calls updateBookingDetails when changing number of people", () => {
    const mockFn = vi.fn();
    render(<BookingInfo updateBookingDetails={mockFn} />);

    fireEvent.change(sel("people"), { target: { value: "3" } });
    expect(mockFn).toHaveBeenCalled();
  });

  test("calls updateBookingDetails when changing number of lanes", () => {
    const mockFn = vi.fn();
    render(<BookingInfo updateBookingDetails={mockFn} />);

    fireEvent.change(sel("lanes"), { target: { value: "2" } });
    expect(mockFn).toHaveBeenCalled();
  });
});
