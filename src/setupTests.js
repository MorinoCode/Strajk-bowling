import { expect, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    createBrowserRouter: () => ({})  
  };
});
