import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { URL as NodeURL } from "url";

// Polyfill `globalThis.URL` in the test environment when it's missing.
// Some libraries (whatwg-url / webidl-conversions) expect a `URL` implementation
// on the global object and will throw when accessing internals otherwise.
if (typeof globalThis.URL === "undefined") {
  // Assign Node's URL implementation to `globalThis.URL`.
  globalThis.URL = NodeURL;
}

expect.extend(matchers);
