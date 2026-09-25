export type WorldPhase =
  | "LOADING"
  | "INTRO"
  | "HOME"
  | "HOVERING"
  | "TRANSITIONING"
  | "SELECTED"
  | "EDITORIAL"
  | "FALLBACK";
export type WorldState = {
  phase: WorldPhase;
  selected: number | null;
  hovered: number | null;
  progress: number;
  reduced: boolean;
};
export type WorldEvent =
  | { type: "READY"; reduced: boolean }
  | { type: "SETTLED" }
  | { type: "HOVER"; index: number | null }
  | { type: "SELECT"; index: number }
  | { type: "HOME" }
  | { type: "SCROLL"; progress: number }
  | { type: "MOTION"; reduced: boolean }
  | { type: "FAILED" };
export const initialWorldState: WorldState = {
  phase: "LOADING",
  selected: null,
  hovered: null,
  progress: 0,
  reduced: false,
};
export function worldReducer(state: WorldState, event: WorldEvent): WorldState {
  switch (event.type) {
    case "READY":
      return {
        ...state,
        phase:
          state.progress > 0.06
            ? "EDITORIAL"
            : event.reduced
              ? "HOME"
              : "INTRO",
        reduced: event.reduced,
      };
    case "FAILED":
      return { ...state, phase: "FALLBACK", selected: null, hovered: null };
    case "MOTION":
      return { ...state, reduced: event.reduced };
    case "SELECT":
      return state.phase === "FALLBACK"
        ? state
        : {
            ...state,
            phase: "TRANSITIONING",
            selected: event.index,
            hovered: null,
          };
    case "HOME":
      return {
        ...state,
        phase: state.reduced ? "HOME" : "TRANSITIONING",
        selected: null,
        hovered: null,
      };
    case "HOVER":
      return state.selected !== null ||
        !["HOME", "HOVERING"].includes(state.phase)
        ? state
        : {
            ...state,
            phase: event.index === null ? "HOME" : "HOVERING",
            hovered: event.index,
          };
    case "SETTLED":
      return ["INTRO", "TRANSITIONING"].includes(state.phase)
        ? { ...state, phase: state.selected === null ? "HOME" : "SELECTED" }
        : state;
    case "SCROLL": {
      if (state.phase === "LOADING" || state.phase === "FALLBACK")
        return { ...state, progress: event.progress };
      if (event.progress > 0.06)
        return {
          ...state,
          progress: event.progress,
          phase: "EDITORIAL",
          selected: null,
          hovered: null,
        };
      return {
        ...state,
        progress: event.progress,
        phase: state.phase === "EDITORIAL" ? "HOME" : state.phase,
      };
    }
  }
}
