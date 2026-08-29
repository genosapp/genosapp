"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const ScrollScene = dynamic(() => import("./ScrollScene"), { ssr: false });

/* Read a browser capability without tripping set-state-in-effect (skill note) */
function subscribe(cb: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getSnapshot() {
  const wide = window.matchMedia("(min-width: 768px)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return wide && !reduce;
}
function getServerSnapshot() {
  return false;
}

export default function ScrollSceneClient() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!enabled) {
    // Fallback for mobile / reduced-motion: static gradient orb, hero only.
    return (
      <div className="pointer-events-none fixed inset-0 z-[1] flex items-center justify-center">
        <div
          className="h-[60vw] max-h-[420px] w-[60vw] max-w-[420px] rounded-full opacity-60 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #7af0ff, #6d8bff 40%, #a06bff 75%, transparent 78%)",
          }}
        />
      </div>
    );
  }

  return <ScrollScene />;
}
