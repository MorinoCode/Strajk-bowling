import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

vi.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  createBrowserRouter: () => ({})
}));
