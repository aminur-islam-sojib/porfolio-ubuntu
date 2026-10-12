"use client";

import * as React from "react";
import { useSystemStore, SystemNotification } from "@/store/system";
import { Bell, X } from "lucide-react";

export function NotificationToast() {
  const notifications = useSystemStore((state) => state.notifications);

  // Auto-dismiss top notification after 5 seconds
  React.useEffect(() => {
    if (notifications.length === 0) return;
    const topId = notifications[0].id;
    const timer = setTimeout(() => {
      useSystemStore.getState().dismissNotification(topId);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notifications]);

  if (notifications.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-[36px] left-1/2 -translate-x-1/2 z-[99998] flex flex-col items-center gap-2 pointer-events-none max-w-sm w-full px-4 select-none animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {notifications.slice(0, 3).map((notif: SystemNotification) => (
        <div
          key={notif.id}
          className="pointer-events-auto w-full p-3.5 rounded-xl bg-[#242424]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-start gap-3 text-white text-xs"
        >
          <div className="w-7 h-7 rounded-full bg-[var(--ubuntu-orange)]/20 border border-[var(--ubuntu-orange)]/30 flex items-center justify-center shrink-0">
            <Bell className="w-3.5 h-3.5 text-[var(--ubuntu-orange)]" />
          </div>
          <div className="flex-1 space-y-0.5 min-w-0">
            <span className="font-semibold block truncate">{notif.title}</span>
            <span className="text-[11px] text-zinc-300 block leading-tight">
              {notif.message}
            </span>
          </div>
          <button
            type="button"
            onClick={() => useSystemStore.getState().dismissNotification(notif.id)}
            aria-label="Dismiss notification"
            className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

