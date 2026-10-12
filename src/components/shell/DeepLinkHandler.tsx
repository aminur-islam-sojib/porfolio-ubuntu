"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useWindowStore } from "@/store/windows";

function DeepLinkHandlerInner() {
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const app = searchParams.get("app");
    const project = searchParams.get("project");

    if (app) {
      useWindowStore.getState().openWindow(app);
    } else if (project) {
      useWindowStore.getState().openWindow("projects");
    }
  }, [searchParams]);

  return null;
}

export function DeepLinkHandler() {
  return (
    <React.Suspense fallback={null}>
      <DeepLinkHandlerInner />
    </React.Suspense>
  );
}
