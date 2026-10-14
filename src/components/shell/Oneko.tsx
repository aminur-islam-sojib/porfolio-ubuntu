"use client";

import * as React from "react";
import { useSystemStore } from "@/store/system";

type SpriteCoords = [number, number];

const SPRITE_SETS: Record<string, SpriteCoords[]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

export function Oneko() {
  const onekoEnabled = useSystemStore((state) => state.onekoEnabled);
  const nekoRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!onekoEnabled) return;

    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReducedMotion) return;

    let nekoPosX = 64;
    let nekoPosY = 64;
    let mousePosX = window.innerWidth / 2;
    let mousePosY = window.innerHeight / 2;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    const nekoSpeed = 10;
    let animationFrameId: number;
    let lastTimestamp = 0;

    const setSprite = (name: string, frame: number) => {
      if (!nekoRef.current) return;
      const set = SPRITE_SETS[name] || SPRITE_SETS.idle;
      const sprite = set[frame % set.length];
      nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    };

    const resetIdleAnimation = () => {
      idleAnimation = null;
      idleAnimationFrame = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosX = e.clientX;
      mousePosY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosX = e.touches[0].clientX;
        mousePosY = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const idle = () => {
      idleTime += 1;

      // Every ~15-20 seconds of idleness, pick an animation
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
        const available = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) available.push("scratchWallW");
        if (nekoPosY < 32) available.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) available.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) available.push("scratchWallS");

        idleAnimation = available[Math.floor(Math.random() * available.length)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
          } else {
            setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          }
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchSelf":
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
          setSprite(idleAnimation, Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    };

    const frame = () => {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        // Show surprise alert frame before springing into action
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = "";
      direction += diffY > 0 ? "N" : "";
      direction += diffY < 0 ? "S" : "";
      direction += diffX > 0 ? "W" : "";
      direction += diffX < 0 ? "E" : "";

      setSprite(direction, frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      if (nekoRef.current) {
        nekoRef.current.style.transform = `translate3d(${nekoPosX - 16}px, ${nekoPosY - 16}px, 0)`;
      }
    };

    const loop = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      if (timestamp - lastTimestamp > 100) {
        lastTimestamp = timestamp;
        frame();
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onekoEnabled]);

  if (!onekoEnabled) return null;

  return (
    <div
      ref={nekoRef}
      id="oneko"
      aria-hidden="true"
      title="oneko desktop cat"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        backgroundImage: "url('/oneko.gif')",
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: 999999,
        willChange: "transform",
      }}
    />
  );
}

