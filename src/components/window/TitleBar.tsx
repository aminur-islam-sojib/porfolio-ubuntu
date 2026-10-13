import * as React from "react";
import { AppIcon } from "@/components/shell/AppIcon";
import { WindowControls } from "@/components/window/WindowControls";
import { TitleBarContextMenu } from "@/components/window/TitleBarContextMenu";
import { cn } from "@/lib/cn";

export interface TitleBarProps {
  appId: string;
  title: string;
  isFocused: boolean;
  isMaximized: boolean;
  onMinimize: (e: React.MouseEvent) => void;
  onMaximize: (e: React.MouseEvent) => void;
  onClose: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
}

export function TitleBar({
  appId,
  title,
  isFocused,
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
  onDoubleClick,
}: TitleBarProps) {
  const [contextMenuPos, setContextMenuPos] = React.useState<{ x: number; y: number } | null>(
    null
  );

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        onDoubleClick={onDoubleClick}
        onContextMenu={handleContextMenu}
        className={cn(
          "window-drag-handle h-[var(--titlebar-height)] px-3.5 flex items-center justify-between border-b select-none transition-colors duration-150 cursor-default",
          isFocused
            ? "bg-[var(--color-window-header)] text-[var(--color-text-primary)] border-[var(--color-border-subtle)]"
            : "bg-[var(--color-window-header-inactive)] text-[var(--color-text-secondary)] border-[var(--color-border-subtle)]",
          isMaximized ? "rounded-none" : "rounded-t-[var(--window-radius)]"
        )}
      >
        {/* Left: App Icon & Title */}
        <div className="flex items-center gap-2.5 pointer-events-none min-w-0">
          <AppIcon id={appId} size={18} className="rounded-[4px] shadow-none shrink-0" />
          <span className="text-xs font-medium truncate tracking-normal">
            {title}
          </span>
        </div>

        {/* Right: Window Controls */}
        <WindowControls
          isMaximized={isMaximized}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onClose={onClose}
        />
      </div>

      {contextMenuPos && (
        <TitleBarContextMenu
          x={contextMenuPos.x}
          y={contextMenuPos.y}
          isMaximized={isMaximized}
          onMinimize={() => onMinimize({ stopPropagation: () => {} } as React.MouseEvent)}
          onToggleMaximize={onDoubleClick}
          onClose={() => onClose({ stopPropagation: () => {} } as React.MouseEvent)}
          onDismiss={() => setContextMenuPos(null)}
        />
      )}
    </>
  );
}
