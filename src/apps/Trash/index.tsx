"use client";

import * as React from "react";
import { Trash2, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSystemStore } from "@/store/system";

export default function TrashApp() {
  const [items, setItems] = React.useState([
    { name: "old_draft_portfolio.html", size: "48 KB", date: "Yesterday" },
    { name: "legacy_jquery_script.js", size: "12 KB", date: "2 days ago" },
  ]);

  const handleEmptyTrash = () => {
    setItems([]);
    useSystemStore.getState().addNotification({
      title: "Trash",
      message: "Trash emptied successfully. 0 items remaining.",
    });
  };

  const handleRestore = () => {
    setItems([]);
    useSystemStore.getState().addNotification({
      title: "Trash",
      message: "Restored all items to their original folders.",
    });
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#1E1E1E] text-white font-sans text-xs select-none">
      {/* Top Action Bar */}
      <div className="h-10 px-4 bg-[#252526] border-b border-white/5 flex items-center justify-between">
        <span className="text-zinc-400">
          {items.length} {items.length === 1 ? "item" : "items"} in Trash
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRestore}
            disabled={items.length === 0}
            className="gap-1.5 h-7 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore All</span>
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleEmptyTrash}
            disabled={items.length === 0}
            className="gap-1.5 h-7 text-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty Trash</span>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
            <Trash2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Trash is Empty</h2>
            <p className="text-xs text-zinc-400 max-w-xs mt-1">
              No deleted items or discarded portfolio files.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center gap-2"
            >
              <AlertCircle className="w-10 h-10 text-red-400 opacity-80" />
              <div>
                <span className="font-medium text-white block truncate max-w-[120px]">
                  {item.name}
                </span>
                <span className="text-[10px] text-zinc-400 block">{item.size} • {item.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
