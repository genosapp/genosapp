/**
 * Mutable scroll-progress singleton, updated from Lenis's scroll event and
 * read every frame inside the persistent R3F ScrollScene via useFrame.
 *
 * Deliberately NOT React state / not a zustand store with subscribers that
 * re-render components — a 3D camera rig needs 60fps reads with zero React
 * render cost. Nav/UI pieces that DO want reactive updates can still call
 * `subscribe()`.
 */

export type ScrollSection = {
  id: string;
  /** absolute top offset (px) from document top, recomputed on resize */
  top: number;
  height: number;
};

export type ScrollState = {
  /** 0..1 progress across the whole scrollable document */
  docProgress: number;
  /** index of section nearest viewport center */
  activeIndex: number;
  /** 0..1 progress within the active section */
  localProgress: number;
  sections: ScrollSection[];
};

const state: ScrollState = {
  docProgress: 0,
  activeIndex: 0,
  localProgress: 0,
  sections: [],
};

const listeners = new Set<(s: ScrollState) => void>();

export function getScrollState(): ScrollState {
  return state;
}

export function subscribe(cb: (s: ScrollState) => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function registerSections(ids: string[]) {
  const recompute = () => {
    state.sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          id: el.id,
          top: rect.top + window.scrollY,
          height: rect.height,
        };
      });
  };
  recompute();
  window.addEventListener("resize", recompute);
  return () => window.removeEventListener("resize", recompute);
}

export function updateScroll(scrollY: number) {
  const doc = document.documentElement;
  const max = Math.max(1, doc.scrollHeight - window.innerHeight);
  state.docProgress = Math.min(1, Math.max(0, scrollY / max));

  const center = scrollY + window.innerHeight * 0.5;
  let idx = 0;
  let local = 0;
  for (let i = 0; i < state.sections.length; i++) {
    const s = state.sections[i];
    if (center >= s.top && center < s.top + s.height) {
      idx = i;
      local = s.height > 0 ? (center - s.top) / s.height : 0;
      break;
    }
    if (center >= s.top) idx = i;
  }
  state.activeIndex = idx;
  state.localProgress = Math.min(1, Math.max(0, local));

  listeners.forEach((cb) => cb(state));
}
