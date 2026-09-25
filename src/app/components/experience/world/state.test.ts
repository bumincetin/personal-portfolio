import assert from "node:assert/strict";
import test from "node:test";
import { initialWorldState, worldReducer } from "./state";

test("a new selection interrupts an in-flight approach without stale hover", () => {
  let state = worldReducer(initialWorldState, {
    type: "READY",
    reduced: false,
  });
  state = worldReducer(state, { type: "SELECT", index: 0 });
  state = worldReducer(state, { type: "SELECT", index: 6 });
  state = worldReducer(state, { type: "HOVER", index: 2 });
  state = worldReducer(state, { type: "SETTLED" });
  assert.equal(state.phase, "SELECTED");
  assert.equal(state.selected, 6);
  assert.equal(state.hovered, null);
});
test("native scrolling exits inspection and returning to the top restores the room", () => {
  let state = worldReducer(initialWorldState, { type: "SELECT", index: 4 });
  state = worldReducer(state, { type: "SCROLL", progress: 0.5 });
  assert.equal(state.phase, "EDITORIAL");
  assert.equal(state.selected, null);
  state = worldReducer(state, { type: "SCROLL", progress: 0 });
  assert.equal(state.phase, "HOME");
});
test("loading after an immediate scroll does not restart an offscreen intro", () => {
  const state = worldReducer(
    worldReducer(initialWorldState, { type: "SCROLL", progress: 0.7 }),
    { type: "READY", reduced: false },
  );
  assert.equal(state.phase, "EDITORIAL");
});
test("reduced motion and context loss preserve usable state", () => {
  let state = worldReducer(initialWorldState, { type: "READY", reduced: true });
  assert.equal(state.phase, "HOME");
  state = worldReducer(state, { type: "SELECT", index: 3 });
  state = worldReducer(state, { type: "HOME" });
  assert.equal(state.phase, "HOME");
  state = worldReducer(state, { type: "FAILED" });
  state = worldReducer(state, { type: "SELECT", index: 2 });
  state = worldReducer(state, { type: "SCROLL", progress: 0.3 });
  assert.equal(state.phase, "FALLBACK");
  assert.equal(state.selected, null);
});
