"use client";

import * as React from "react";
import { useWindowStore } from "@/store/windows";
import { APP_REGISTRY } from "@/apps/registry";
import { Window } from "@/components/window/Window";

export function WindowManager() {
  // Stable array reference to open window IDs
  const openWindowIds = useWindowStore((state) => state.openWindowIds);

  return (
    <div className="pointer-events-none fixed inset-0 z-[50]">
      {openWindowIds.map((id) => {
        const app = APP_REGISTRY[id];
        if (!app || !app.component) return null;
        const Component = app.component;

        return (
          <div key={id} className="pointer-events-auto">
            <Window id={id}>
              <Component />
            </Window>
          </div>
        );
      })}
    </div>
  );
}

