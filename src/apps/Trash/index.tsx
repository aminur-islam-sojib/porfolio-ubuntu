"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";

export default function TrashApp() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center font-sans text-white space-y-3">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
        <Trash2 className="w-8 h-8" />
      </div>
      <div>
        <h1 className="text-base font-semibold">Trash is Empty</h1>
        <p className="text-xs text-zinc-400 max-w-xs mt-1">
          No deleted items or discarded portfolio files.
        </p>
      </div>
    </div>
  );
}

