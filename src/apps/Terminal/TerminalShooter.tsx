"use client";

import * as React from "react";
import { soundFx } from "@/apps/Terminal/sound";
import { Volume2, VolumeX, X, Play, RotateCcw } from "lucide-react";

interface TerminalShooterProps {
  onExit: (finalScore: number) => void;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isEnemy: boolean;
}

interface Enemy {
  x: number;
  y: number;
  type: number; // 0: Grunt, 1: Elite, 2: Dreadnought (Boss)
  alive: boolean;
  hp: number;
  maxHp: number;
  points: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
  life: number;
  maxLife: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

interface PowerUp {
  x: number;
  y: number;
  type: "triple" | "speed" | "life" | "shield";
  vy: number;
}

interface Bunker {
  x: number;
  y: number;
  hp: number;
}

export function TerminalShooter({ onExit }: TerminalShooterProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // High score from local storage
  const [highScore, setHighScore] = React.useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ubuntu_terminal_shooter_high_score");
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) return parsed;
      }
    }
    return 0;
  });

  const [gameState, setGameState] = React.useState<"start" | "playing" | "paused" | "gameover" | "victory">("start");
  const [isMuted, setIsMuted] = React.useState<boolean>(() => soundFx.getMuted());

  // Mutable game state ref to ensure 60fps performance without React re-render lag
  const gameRef = React.useRef({
    player: {
      x: 300,
      y: 395,
      width: 36,
      height: 22,
      speed: 6,
      tripleShotTimer: 0,
      speedTimer: 0,
      shieldTimer: 0,
      invulnerableTimer: 0,
    },
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    enemyDirection: 1,
    enemyStepDownTimer: 0,
    enemySpeed: 1,
    enemyShootTimer: 0,
    ufo: null as { x: number; y: number; speed: number; points: number } | null,
    ufoTimer: 0,
    particles: [] as Particle[],
    floatingTexts: [] as FloatingText[],
    powerUps: [] as PowerUp[],
    bunkers: [] as Bunker[],
    stars: [] as { x: number; y: number; speed: number; char: string }[],
    keys: {
      left: false,
      right: false,
      fire: false,
    },
    isPointerDown: false,
    lastFireTime: 0,
    wave: 1,
    waveBannerTimer: 0,
    combo: {
      count: 0,
      timer: 0,
    },
    shakeTimer: 0,
    score: 0,
    highScore: 0,
    lives: 3,
    state: "start" as "start" | "playing" | "paused" | "gameover" | "victory",
    canvasWidth: 640,
    canvasHeight: 440,
  });

  // Sync high score to gameRef on mount
  React.useEffect(() => {
    gameRef.current.highScore = highScore;
  }, [highScore]);

  // Particle helper
  const spawnExplosion = (x: number, y: number, color = "#FF6D3B", count = 14) => {
    const g = gameRef.current;
    const chars = ["*", "+", "#", "x", "•", "°"];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 3.8;
      g.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        char: chars[Math.floor(Math.random() * chars.length)],
        color,
        life: 18 + Math.random() * 16,
        maxLife: 34,
      });
    }
  };

  const spawnFloatingText = (x: number, y: number, text: string, color = "#FFB86C") => {
    gameRef.current.floatingTexts.push({
      x,
      y,
      text,
      color,
      life: 45,
      maxLife: 45,
    });
  };

  // Initialize stars once
  const initStars = React.useCallback(() => {
    const g = gameRef.current;
    if (g.stars.length === 0) {
      g.stars = Array.from({ length: 48 }, () => ({
        x: Math.random() * g.canvasWidth,
        y: Math.random() * g.canvasHeight,
        speed: 0.25 + Math.random() * 0.9,
        char: Math.random() > 0.75 ? "*" : Math.random() > 0.4 ? "+" : ".",
      }));
    }
  }, []);

  // Initialize level and enemy fleet
  const initLevel = React.useCallback((currentWave: number, isNewSession = false) => {
    const g = gameRef.current;
    g.wave = currentWave;
    g.waveBannerTimer = 110; // 1.8s banner

    const cols = 6;
    const rows = 4;
    const enemySpacingX = 54;
    const enemySpacingY = 32;
    const startX = (g.canvasWidth - cols * enemySpacingX) / 2;
    const startY = 65;

    const newEnemies: Enemy[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let type = 0;
        let pts = 10;
        let hp = 1;
        if (r === 0) {
          type = 2; // Boss Dreadnought
          pts = 30;
          hp = 2; // Takes 2 hits
        } else if (r === 1) {
          type = 1; // Elite Invader
          pts = 20;
          hp = 1;
        }
        newEnemies.push({
          x: startX + c * enemySpacingX,
          y: startY + r * enemySpacingY,
          type,
          alive: true,
          hp,
          maxHp: hp,
          points: pts,
        });
      }
    }
    g.enemies = newEnemies;
    g.enemyDirection = 1;
    g.enemySpeed = 0.9 + currentWave * 0.22;
    g.bullets = [];
    g.powerUps = [];

    // Bunkers (Ubuntu Defensive Firewalls)
    if (isNewSession || g.bunkers.length === 0) {
      const bunkerCount = 3;
      const bunkerWidth = 48;
      const bunkerSpacing = (g.canvasWidth - bunkerCount * bunkerWidth) / (bunkerCount + 1);
      g.bunkers = Array.from({ length: bunkerCount }, (_, i) => ({
        x: bunkerSpacing * (i + 1) + bunkerWidth * i,
        y: g.canvasHeight - 95,
        hp: 12,
      }));
    } else {
      // Partial shield repair between waves
      g.bunkers = g.bunkers.map((b) => ({
        ...b,
        hp: Math.min(12, b.hp + 4),
      }));
    }

    // Only center player when beginning a brand new session, NOT on wave clear
    if (isNewSession) {
      g.player.x = g.canvasWidth / 2 - g.player.width / 2;
      g.player.y = g.canvasHeight - 45;
      g.player.tripleShotTimer = 0;
      g.player.speedTimer = 0;
      g.player.shieldTimer = 0;
      g.player.invulnerableTimer = 0;
      g.combo.count = 0;
      g.combo.timer = 0;
    }
  }, []);

  const startGame = React.useCallback(() => {
    const g = gameRef.current;
    g.score = 0;
    g.lives = 3;
    initLevel(1, true);
    g.state = "playing";
    setGameState("playing");
  }, [initLevel]);

  // Handle player firing with twin plasma or triple spread
  const fireBullet = React.useCallback(() => {
    const g = gameRef.current;
    if (g.state !== "playing") return;

    const now = Date.now();
    const cooldown = g.player.speedTimer > 0 ? 140 : 220;
    if (now - g.lastFireTime < cooldown) return;
    g.lastFireTime = now;

    soundFx.playLaser();

    // Muzzle flash particles
    spawnExplosion(g.player.x + g.player.width / 2, g.player.y - 4, "#E95420", 3);

    if (g.player.tripleShotTimer > 0) {
      // Triple angled beam
      g.bullets.push(
        { x: g.player.x + g.player.width / 2, y: g.player.y - 6, vx: 0, vy: -8, isEnemy: false },
        { x: g.player.x + 4, y: g.player.y - 4, vx: -2.4, vy: -7.5, isEnemy: false },
        { x: g.player.x + g.player.width - 4, y: g.player.y - 4, vx: 2.4, vy: -7.5, isEnemy: false }
      );
    } else {
      // Twin wingtip plasma bolts
      g.bullets.push(
        { x: g.player.x + 8, y: g.player.y - 4, vx: 0, vy: -8, isEnemy: false },
        { x: g.player.x + g.player.width - 8, y: g.player.y - 4, vx: 0, vy: -8, isEnemy: false }
      );
    }
  }, []);

  // Smooth pointer tracking across canvas coordinate space
  const updatePlayerPositionFromPointer = React.useCallback((clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0) return;

    const scaleX = canvas.width / rect.width;
    const mouseCanvasX = (clientX - rect.left) * scaleX;
    const g = gameRef.current;
    const targetX = mouseCanvasX - g.player.width / 2;
    g.player.x = Math.max(10, Math.min(g.canvasWidth - g.player.width - 10, targetX));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const g = gameRef.current;
    updatePlayerPositionFromPointer(e.clientX);
    if (g.state === "start" || g.state === "gameover" || g.state === "victory") {
      startGame();
    } else if (g.state === "playing") {
      g.isPointerDown = true;
      fireBullet();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameRef.current.state === "playing") {
      updatePlayerPositionFromPointer(e.clientX);
    }
  };

  const handlePointerUp = () => {
    gameRef.current.isPointerDown = false;
  };

  const handlePointerLeave = () => {
    gameRef.current.isPointerDown = false;
  };

  // Global window pointer listener so rapid swiping or dragging outside canvas tracks reliably
  React.useEffect(() => {
    const handleGlobalPointerUp = () => {
      gameRef.current.isPointerDown = false;
    };
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (gameRef.current.isPointerDown && gameRef.current.state === "playing") {
        updatePlayerPositionFromPointer(e.clientX);
      }
    };

    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointermove", handleGlobalPointerMove);
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointermove", handleGlobalPointerMove);
    };
  }, [updatePlayerPositionFromPointer]);

  // Keyboard controls listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const g = gameRef.current;

      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        g.keys.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        g.keys.right = true;
      }
      if (e.key === " " || e.key === "Spacebar" || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        if (g.state === "paused") {
          g.state = "playing";
          setGameState("playing");
        } else if (g.state === "start" || g.state === "gameover" || g.state === "victory") {
          startGame();
        } else if (g.state === "playing") {
          g.keys.fire = true;
          fireBullet();
        }
      }
      if (e.key === "p" || e.key === "P") {
        if (g.state === "playing") {
          g.state = "paused";
          setGameState("paused");
        } else if (g.state === "paused") {
          g.state = "playing";
          setGameState("playing");
        }
      }
      if (e.key === "q" || e.key === "Q" || e.key === "Escape") {
        onExit(g.score);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        g.keys.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        g.keys.right = false;
      }
      if (e.key === " " || e.key === "Spacebar" || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        g.keys.fire = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [fireBullet, onExit, startGame]);

  // Main 60FPS Game Loop — RUNS ONCE ON MOUNT TO PREVENT TEAR-DOWN RESETS
  React.useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    initStars();
    initLevel(1, true);

    const update = () => {
      const g = gameRef.current;

      // 1. Update Stars
      for (const star of g.stars) {
        star.y += star.speed;
        if (star.y > g.canvasHeight) {
          star.y = 0;
          star.x = Math.random() * g.canvasWidth;
        }
      }

      // 2. Update Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0) {
          g.particles.splice(i, 1);
        }
      }

      // 3. Update Floating Score Popups
      for (let i = g.floatingTexts.length - 1; i >= 0; i--) {
        const ft = g.floatingTexts[i];
        ft.y -= 0.65;
        ft.life -= 1;
        if (ft.life <= 0) {
          g.floatingTexts.splice(i, 1);
        }
      }

      // 4. Update Combo Timer
      if (g.combo.timer > 0) {
        g.combo.timer -= 1;
        if (g.combo.timer <= 0) {
          g.combo.count = 0;
        }
      }

      // Wave banner decrement
      if (g.waveBannerTimer > 0) {
        g.waveBannerTimer -= 1;
      }

      if (g.state !== "playing") return;

      // Player Movement (Keyboard fallback)
      const playerSpeed = g.player.speedTimer > 0 ? 8 : 5.8;
      if (g.keys.left) {
        g.player.x = Math.max(10, g.player.x - playerSpeed);
      }
      if (g.keys.right) {
        g.player.x = Math.min(g.canvasWidth - g.player.width - 10, g.player.x + playerSpeed);
      }

      // Auto-fire while mouse pointer or Space key is held down
      if (g.isPointerDown || g.keys.fire) {
        fireBullet();
      }

      // Buff timers
      if (g.player.tripleShotTimer > 0) g.player.tripleShotTimer--;
      if (g.player.speedTimer > 0) g.player.speedTimer--;
      if (g.player.shieldTimer > 0) g.player.shieldTimer--;
      if (g.player.invulnerableTimer > 0) g.player.invulnerableTimer--;

      // 5. Update Bullets & Collisions
      for (let i = g.bullets.length - 1; i >= 0; i--) {
        const b = g.bullets[i];
        b.x += b.vx;
        b.y += b.vy;

        // Out of bounds check
        if (b.y < -10 || b.y > g.canvasHeight + 10 || b.x < -10 || b.x > g.canvasWidth + 10) {
          g.bullets.splice(i, 1);
          continue;
        }

        // Bullet vs Bunker (Ubuntu Defensive Firewalls)
        if (b.isEnemy) {
          let hitBunker = false;
          for (const bunker of g.bunkers) {
            if (
              bunker.hp > 0 &&
              b.x >= bunker.x - 4 &&
              b.x <= bunker.x + 52 &&
              b.y >= bunker.y &&
              b.y <= bunker.y + 26
            ) {
              bunker.hp -= 1;
              hitBunker = true;
              spawnExplosion(b.x, b.y, "#887968", 5);
              soundFx.playHit();
              break;
            }
          }
          if (hitBunker) {
            g.bullets.splice(i, 1);
            continue;
          }
        }

        // Player bullet collisions
        if (!b.isEnemy) {
          let hit = false;

          // Bullet vs Enemy Bullet Deflection (Shoot down incoming enemy lasers!)
          for (let ebIdx = g.bullets.length - 1; ebIdx >= 0; ebIdx--) {
            const eb = g.bullets[ebIdx];
            if (!eb.isEnemy) continue;

            if (Math.abs(b.x - eb.x) < 9 && Math.abs(b.y - eb.y) < 14) {
              g.bullets.splice(ebIdx, 1);
              hit = true;
              spawnExplosion((b.x + eb.x) / 2, (b.y + eb.y) / 2, "#FFB86C", 7);
              soundFx.playDeflect();
              g.score += 5;
              spawnFloatingText(b.x, b.y - 6, "+5 DEFLECT", "#50FA7B");
              break;
            }
          }

          if (hit) {
            g.bullets.splice(i, 1);
            continue;
          }

          // Player bullet vs Alien Invaders
          for (let eIdx = g.enemies.length - 1; eIdx >= 0; eIdx--) {
            const enemy = g.enemies[eIdx];
            if (!enemy.alive) continue;

            // Accurate AABB collision bounds with swept vertical box
            const enemyLeft = enemy.x - 2;
            const enemyRight = enemy.x + 44;
            const enemyTop = enemy.y;
            const enemyBottom = enemy.y + 24;

            if (
              b.x + 5 >= enemyLeft &&
              b.x - 5 <= enemyRight &&
              b.y + 10 >= enemyTop &&
              b.y - 12 <= enemyBottom
            ) {
              hit = true;
              enemy.hp -= 1;

              if (enemy.hp <= 0) {
                // ENEMY DESTROYED!
                enemy.alive = false;

                // Combo multiplier calculation
                g.combo.count++;
                g.combo.timer = 130;
                const mult = Math.min(4, 1 + Math.floor(g.combo.count / 3));
                const earnedPoints = enemy.points * mult;
                g.score += earnedPoints;

                // Sync high score in memory & storage without triggering React re-render loops
                if (g.score > g.highScore) {
                  g.highScore = g.score;
                  if (typeof window !== "undefined") {
                    localStorage.setItem("ubuntu_terminal_shooter_high_score", g.highScore.toString());
                  }
                }

                spawnFloatingText(
                  enemy.x + 14,
                  enemy.y - 4,
                  `+${earnedPoints}${mult > 1 ? ` (x${mult})` : ""}`,
                  enemy.type === 2 ? "#FF79C6" : enemy.type === 1 ? "#8BE9FD" : "#47D472"
                );

                spawnExplosion(
                  enemy.x + 20,
                  enemy.y + 11,
                  enemy.type === 2 ? "#FF79C6" : enemy.type === 1 ? "#8BE9FD" : "#E95420",
                  enemy.type === 2 ? 22 : 14
                );
                soundFx.playExplosion();

                // Drop power-up chance (30% for Boss, 20% for Elite, 12% for Grunt)
                const dropRate = enemy.type === 2 ? 0.35 : enemy.type === 1 ? 0.2 : 0.12;
                if (Math.random() < dropRate) {
                  const types: Array<"triple" | "speed" | "life" | "shield"> = ["triple", "speed", "life", "shield"];
                  g.powerUps.push({
                    x: enemy.x + 16,
                    y: enemy.y + 10,
                    type: types[Math.floor(Math.random() * types.length)],
                    vy: 1.6,
                  });
                }
              } else {
                // Multi-HP boss damage flash
                spawnExplosion(b.x, b.y, "#FFFFFF", 5);
                soundFx.playHit();
              }
              break;
            }
          }

          // Player bullet vs Bonus Mystery UFO
          if (g.ufo && !hit) {
            const ufoLeft = g.ufo.x - 4;
            const ufoRight = g.ufo.x + 92;
            const ufoTop = g.ufo.y;
            const ufoBottom = g.ufo.y + 26;

            if (
              b.x + 6 >= ufoLeft &&
              b.x - 6 <= ufoRight &&
              b.y + 8 >= ufoTop &&
              b.y - 12 <= ufoBottom
            ) {
              hit = true;
              const ufoPts = g.ufo.points;
              g.score += ufoPts;
              if (g.score > g.highScore) {
                g.highScore = g.score;
                if (typeof window !== "undefined") {
                  localStorage.setItem("ubuntu_terminal_shooter_high_score", g.highScore.toString());
                }
              }

              spawnFloatingText(g.ufo.x + 30, g.ufo.y - 4, `+${ufoPts} UFO BONUS!`, "#FF5555");
              spawnExplosion(g.ufo.x + 44, g.ufo.y + 12, "#FF5555", 26);
              soundFx.playExplosion();
              g.ufo = null;
            }
          }

          if (hit) {
            g.bullets.splice(i, 1);
            continue;
          }
        } else {
          // Enemy bullet vs Player Ship
          if (
            g.player.invulnerableTimer <= 0 &&
            b.x >= g.player.x &&
            b.x <= g.player.x + g.player.width &&
            b.y >= g.player.y &&
            b.y <= g.player.y + g.player.height
          ) {
            g.bullets.splice(i, 1);
            g.shakeTimer = 8; // Screen shake

            // If shield powerup is active, absorb the blow
            if (g.player.shieldTimer > 0) {
              g.player.shieldTimer = 0;
              g.player.invulnerableTimer = 60;
              spawnExplosion(g.player.x + 18, g.player.y + 11, "#8BE9FD", 18);
              soundFx.playDeflect();
              spawnFloatingText(g.player.x, g.player.y - 10, "SHIELD DEFLECT!", "#8BE9FD");
            } else {
              // Lost a heart
              g.lives -= 1;
              g.combo.count = 0; // Reset combo
              soundFx.playHit();
              spawnExplosion(g.player.x + 18, g.player.y + 11, "#DF382C", 20);
              g.player.invulnerableTimer = 90; // 1.5s invulnerable

              if (g.lives <= 0) {
                g.state = "gameover";
                setHighScore(g.highScore);
                setGameState("gameover");
              }
            }
            continue;
          }
        }
      }

      // 6. Update PowerUps
      for (let i = g.powerUps.length - 1; i >= 0; i--) {
        const pu = g.powerUps[i];
        pu.y += pu.vy;

        // Catch powerup
        if (
          pu.x + 14 >= g.player.x &&
          pu.x <= g.player.x + g.player.width &&
          pu.y + 14 >= g.player.y &&
          pu.y <= g.player.y + g.player.height
        ) {
          soundFx.playPowerup();
          if (pu.type === "triple") {
            g.player.tripleShotTimer = 480; // 8 seconds
            spawnFloatingText(g.player.x, g.player.y - 10, "TRIPLE PLASMA!", "#FFB86C");
          } else if (pu.type === "speed") {
            g.player.speedTimer = 480;
            spawnFloatingText(g.player.x, g.player.y - 10, "OVERCLOCK SPEED!", "#50FA7B");
          } else if (pu.type === "shield") {
            g.player.shieldTimer = 600; // 10 seconds or until hit
            spawnFloatingText(g.player.x, g.player.y - 10, "ENERGY SHIELD!", "#8BE9FD");
          } else if (pu.type === "life") {
            g.lives = Math.min(5, g.lives + 1);
            spawnFloatingText(g.player.x, g.player.y - 10, "+1 REPAIR HEART!", "#FF5555");
          }
          g.powerUps.splice(i, 1);
          continue;
        }

        if (pu.y > g.canvasHeight + 10) {
          g.powerUps.splice(i, 1);
        }
      }

      // 7. Update Enemies Fleet Movement
      const livingEnemies = g.enemies.filter((e) => e.alive);

      // Check Wave Victory Condition
      if (livingEnemies.length === 0) {
        soundFx.playVictory();
        g.score += 500 * g.wave;
        if (g.score > g.highScore) {
          g.highScore = g.score;
          if (typeof window !== "undefined") {
            localStorage.setItem("ubuntu_terminal_shooter_high_score", g.highScore.toString());
          }
        }
        spawnFloatingText(g.canvasWidth / 2 - 60, g.canvasHeight / 2, `WAVE CLEAR! +${500 * g.wave} PTS`, "#50FA7B");
        initLevel(g.wave + 1, false);
        return;
      }

      // Fleet speed increases as invader count decreases
      const remainingPct = livingEnemies.length / g.enemies.length;
      const currentSpeed = (g.enemySpeed + (1 - remainingPct) * 1.8) * g.enemyDirection;

      let edgeReached = false;
      for (const e of livingEnemies) {
        e.x += currentSpeed;
        if (e.x < 15 || e.x + 40 > g.canvasWidth - 15) {
          edgeReached = true;
        }
      }

      if (edgeReached) {
        g.enemyDirection *= -1;
        for (const e of livingEnemies) {
          e.y += 14;
          // Check if invaders breached defensive perimeter
          if (e.y + 22 >= g.player.y) {
            g.lives = 0;
            g.state = "gameover";
            setHighScore(g.highScore);
            setGameState("gameover");
          }
        }
      }

      // 8. Enemy Bombardment (Random Fire)
      g.enemyShootTimer++;
      const shootInterval = Math.max(26, 68 - g.wave * 7);
      if (g.enemyShootTimer > shootInterval) {
        g.enemyShootTimer = 0;
        const shooter = livingEnemies[Math.floor(Math.random() * livingEnemies.length)];
        if (shooter) {
          g.bullets.push({
            x: shooter.x + 20,
            y: shooter.y + 20,
            vx: (Math.random() - 0.5) * 0.9,
            vy: 3.6 + g.wave * 0.35,
            isEnemy: true,
          });
        }
      }

      // 9. Update Mystery UFO
      g.ufoTimer++;
      if (!g.ufo && g.ufoTimer > 650) {
        g.ufoTimer = 0;
        g.ufo = {
          x: -90,
          y: 30,
          speed: 2.3,
          points: 150 + Math.floor(Math.random() * 3) * 50,
        };
        soundFx.playUfo();
      }
      if (g.ufo) {
        g.ufo.x += g.ufo.speed;
        if (g.ufo.x > g.canvasWidth + 90) {
          g.ufo = null;
        }
      }
    };

    const render = () => {
      const g = gameRef.current;

      ctx.save();

      // Screen shake translation on damage
      if (g.shakeTimer > 0) {
        g.shakeTimer--;
        const shakeX = (Math.random() - 0.5) * 6;
        const shakeY = (Math.random() - 0.5) * 6;
        ctx.translate(shakeX, shakeY);
      }

      ctx.clearRect(0, 0, g.canvasWidth, g.canvasHeight);

      // Deep Terminal Aubergine background
      ctx.fillStyle = "#220419";
      ctx.fillRect(0, 0, g.canvasWidth, g.canvasHeight);

      // CRT Scanline Pattern
      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      for (let y = 0; y < g.canvasHeight; y += 4) {
        ctx.fillRect(0, y, g.canvasWidth, 2);
      }

      // Render Starfield
      ctx.font = "11px 'Ubuntu Mono', monospace";
      for (const star of g.stars) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fillText(star.char, star.x, star.y);
      }

      // Render Bunkers (Ubuntu Defensive Firewalls)
      ctx.font = "12px 'Ubuntu Mono', monospace";
      for (const bunker of g.bunkers) {
        if (bunker.hp > 0) {
          const alpha = bunker.hp / 12;
          ctx.fillStyle = `rgba(180, 100, 50, ${alpha})`;
          ctx.fillText("[######]", bunker.x, bunker.y + 10);
          ctx.fillText("[##  ##]", bunker.x, bunker.y + 20);
        }
      }

      // Render Mystery UFO
      if (g.ufo) {
        ctx.font = "bold 13px 'Ubuntu Mono', monospace";
        ctx.fillStyle = "#FF5555";
        ctx.fillText("<==[UFO]==>", g.ufo.x, g.ufo.y + 14);
      }

      // Render Alien Invaders with 2-frame marching animation
      const animFrame = Math.floor(Date.now() / 320) % 2;
      for (const e of g.enemies) {
        if (!e.alive) continue;
        ctx.font = "bold 13px 'Ubuntu Mono', monospace";

        if (e.type === 2) {
          // Boss Dreadnought
          ctx.fillStyle = e.hp < e.maxHp ? "#FFB86C" : "#FF79C6";
          const sprite = animFrame === 0 ? "(O_O)" : "(o_o)";
          ctx.fillText(sprite, e.x, e.y + 15);
        } else if (e.type === 1) {
          // Elite Invader
          ctx.fillStyle = "#8BE9FD";
          const sprite = animFrame === 0 ? "[o.o]" : "[*.*]";
          ctx.fillText(sprite, e.x, e.y + 15);
        } else {
          // Grunt Invader
          ctx.fillStyle = "#47D472";
          const sprite = animFrame === 0 ? "</^\\>" : "<\\^/>";
          ctx.fillText(sprite, e.x, e.y + 15);
        }
      }

      // Render PowerUps
      for (const pu of g.powerUps) {
        ctx.font = "bold 12px 'Ubuntu Mono', monospace";
        if (pu.type === "triple") {
          ctx.fillStyle = "#FFB86C";
          ctx.fillText("[3x]", pu.x, pu.y + 10);
        } else if (pu.type === "speed") {
          ctx.fillStyle = "#50FA7B";
          ctx.fillText("[SPD]", pu.x, pu.y + 10);
        } else if (pu.type === "shield") {
          ctx.fillStyle = "#8BE9FD";
          ctx.fillText("[SHD]", pu.x, pu.y + 10);
        } else {
          ctx.fillStyle = "#FF5555";
          ctx.fillText("[♥+1]", pu.x, pu.y + 10);
        }
      }

      // Render Bullets with Arcade Neon Glow
      for (const b of g.bullets) {
        ctx.font = "bold 13px 'Ubuntu Mono', monospace";
        if (b.isEnemy) {
          ctx.fillStyle = "#FF5555";
          ctx.fillText("v", b.x - 3, b.y);
        } else {
          ctx.fillStyle = "#E95420";
          ctx.fillText("▲", b.x - 3, b.y);
        }
      }

      // Render Particles
      for (const p of g.particles) {
        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.font = "12px 'Ubuntu Mono', monospace";
        ctx.fillText(p.char, p.x, p.y);
      }
      ctx.globalAlpha = 1.0;

      // Render Floating Score Popups
      for (const ft of g.floatingTexts) {
        const alpha = ft.life / ft.maxLife;
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = alpha;
        ctx.font = "bold 12px 'Ubuntu Mono', monospace";
        ctx.fillText(ft.text, ft.x, ft.y);
      }
      ctx.globalAlpha = 1.0;

      // Render Player Ship
      if (g.state === "playing" || g.state === "paused") {
        if (g.player.invulnerableTimer % 6 < 3) {
          ctx.font = "bold 14px 'Ubuntu Mono', monospace";
          ctx.fillStyle = "#47D472";
          ctx.fillText("  ▲  ", g.player.x, g.player.y);
          ctx.fillStyle = "#E95420";
          ctx.fillText("</▲\\>", g.player.x, g.player.y + 12);

          // Thruster flame animation
          if (Math.random() > 0.35) {
            ctx.fillStyle = g.player.speedTimer > 0 ? "#50FA7B" : "#FFB86C";
            ctx.font = "10px 'Ubuntu Mono', monospace";
            ctx.fillText(" v ", g.player.x + 8, g.player.y + 22);
          }

          // Active Shield Forcefield Bubble
          if (g.player.shieldTimer > 0) {
            ctx.save();
            ctx.strokeStyle = "rgba(139, 233, 253, 0.75)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(g.player.x + g.player.width / 2, g.player.y + 8, 22, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Wave Announcement Banner
      if (g.waveBannerTimer > 0 && (g.state === "playing" || g.state === "paused")) {
        ctx.fillStyle = "rgba(233, 84, 32, 0.9)";
        ctx.font = "bold 14px 'Ubuntu Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(`>>> WAVE ${g.wave} INCOMING <<<`, g.canvasWidth / 2, 140);
        ctx.textAlign = "left";
      }

      // HUD Top Header
      ctx.fillStyle = "rgba(35, 8, 28, 0.85)";
      ctx.fillRect(0, 0, g.canvasWidth, 24);
      ctx.fillStyle = "#47D472";
      ctx.font = "11px 'Ubuntu Mono', monospace";
      ctx.fillText(`SCORE: ${g.score.toString().padStart(6, "0")}`, 14, 16);
      ctx.fillStyle = "#FFB86C";
      ctx.fillText(`HIGH: ${Math.max(g.score, g.highScore).toString().padStart(6, "0")}`, 155, 16);
      ctx.fillStyle = "#50FA7B";
      ctx.fillText(`WAVE: ${g.wave}`, 295, 16);
      ctx.fillStyle = "#FF5555";
      ctx.fillText(`LIVES: ${"♥ ".repeat(Math.max(0, g.lives))}`, 395, 16);

      // Active Combo Multiplier
      if (g.combo.count >= 2) {
        const mult = Math.min(4, 1 + Math.floor(g.combo.count / 3));
        ctx.fillStyle = "#FFB86C";
        ctx.font = "bold 11px 'Ubuntu Mono', monospace";
        ctx.fillText(`COMBO x${mult}`, 540, 16);
      }

      // Overlays
      if (g.state === "start") {
        ctx.fillStyle = "rgba(10, 0, 10, 0.85)";
        ctx.fillRect(0, 24, g.canvasWidth, g.canvasHeight - 24);

        ctx.fillStyle = "#E95420";
        ctx.font = "bold 20px 'Ubuntu Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("UBUNTU TERMINAL INVADERS", g.canvasWidth / 2, 125);

        ctx.fillStyle = "#47D472";
        ctx.font = "13px 'Ubuntu Mono', monospace";
        ctx.fillText("KERNEL DEFENDER MISSION", g.canvasWidth / 2, 155);

        ctx.fillStyle = "#B0B0B0";
        ctx.font = "12px 'Ubuntu Mono', monospace";
        ctx.fillText("[Mouse Move or A / D / ← →] Move Spaceship", g.canvasWidth / 2, 205);
        ctx.fillText("[Click or Hold SPACEBAR] Fire Dual Plasma", g.canvasWidth / 2, 230);
        ctx.fillText("[P] Pause Game   •   [Q / ESC] Quit to Bash", g.canvasWidth / 2, 255);

        ctx.fillStyle = "#FFB86C";
        ctx.font = "bold 14px 'Ubuntu Mono', monospace";
        ctx.fillText(">>> CLICK OR PRESS SPACE TO START <<<", g.canvasWidth / 2, 320);
        ctx.textAlign = "left";
      } else if (g.state === "paused") {
        ctx.fillStyle = "rgba(10, 0, 10, 0.78)";
        ctx.fillRect(0, 24, g.canvasWidth, g.canvasHeight - 24);

        ctx.fillStyle = "#FFB86C";
        ctx.font = "bold 22px 'Ubuntu Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", g.canvasWidth / 2, g.canvasHeight / 2 - 10);
        ctx.font = "13px 'Ubuntu Mono', monospace";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Press P or SPACE to Resume", g.canvasWidth / 2, g.canvasHeight / 2 + 20);
        ctx.textAlign = "left";
      } else if (g.state === "gameover") {
        ctx.fillStyle = "rgba(20, 0, 10, 0.88)";
        ctx.fillRect(0, 24, g.canvasWidth, g.canvasHeight - 24);

        ctx.fillStyle = "#FF5555";
        ctx.font = "bold 24px 'Ubuntu Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("KERNEL PANIC: MISSION FAILED", g.canvasWidth / 2, 135);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "14px 'Ubuntu Mono', monospace";
        ctx.fillText(`FINAL SCORE: ${g.score}`, g.canvasWidth / 2, 180);
        ctx.fillText(`WAVE REACHED: ${g.wave}`, g.canvasWidth / 2, 205);
        ctx.fillText(`ALL-TIME HIGH: ${Math.max(g.score, g.highScore)}`, g.canvasWidth / 2, 230);

        ctx.fillStyle = "#47D472";
        ctx.font = "bold 14px 'Ubuntu Mono', monospace";
        ctx.fillText("PRESS [SPACE] TO REBOOT & PLAY AGAIN", g.canvasWidth / 2, 280);
        ctx.fillStyle = "#B0B0B0";
        ctx.font = "12px 'Ubuntu Mono', monospace";
        ctx.fillText("OR PRESS [Q] TO RETURN TO TERMINAL BASH", g.canvasWidth / 2, 310);
        ctx.textAlign = "left";
      }

      ctx.restore();
    };

    const loop = () => {
      update();
      render();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Mounted once, totally decoupled from React state updates

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-[#300A24] text-[#47D472] font-mono select-none p-2 sm:p-4 overflow-hidden">
      {/* Arcade Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between pb-2 border-b border-white/10 text-xs text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="text-[var(--ubuntu-orange)] font-bold">ARCADE:</span>
          <span>Ubuntu Terminal Invaders</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isMuted ? "Muted" : "Sound"}</span>
          </button>
          <button
            type="button"
            onClick={() => onExit(gameRef.current.score)}
            className="hover:text-[var(--ubuntu-orange)] transition-colors flex items-center gap-1 text-[11px]"
            title="Exit game to bash prompt (Q)"
          >
            <X className="w-3.5 h-3.5" />
            <span>Quit (Q)</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative flex-1 w-full max-w-2xl flex items-center justify-center my-2 overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#1d0315]">
        <canvas
          ref={canvasRef}
          width={640}
          height={440}
          className="w-full h-full max-h-[440px] aspect-[16/11] object-contain cursor-crosshair touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerUp}
        />
      </div>

      {/* Mobile & Touch Controls Bar */}
      <div className="w-full max-w-2xl pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
        {/* On-screen movement buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onPointerDown={(e) => {
              e.preventDefault();
              gameRef.current.keys.left = true;
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              gameRef.current.keys.left = false;
            }}
            onPointerLeave={(e) => {
              e.preventDefault();
              gameRef.current.keys.left = false;
            }}
            className="w-11 h-9 rounded-lg bg-white/10 active:bg-[var(--ubuntu-orange)] text-white font-bold flex items-center justify-center text-sm shadow-md transition-colors"
            title="Move Left (A)"
          >
            ◀
          </button>
          <button
            type="button"
            onPointerDown={(e) => {
              e.preventDefault();
              gameRef.current.keys.right = true;
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              gameRef.current.keys.right = false;
            }}
            onPointerLeave={(e) => {
              e.preventDefault();
              gameRef.current.keys.right = false;
            }}
            className="w-11 h-9 rounded-lg bg-white/10 active:bg-[var(--ubuntu-orange)] text-white font-bold flex items-center justify-center text-sm shadow-md transition-colors"
            title="Move Right (D)"
          >
            ▶
          </button>
        </div>

        {/* Center state action */}
        {gameState === "start" ? (
          <button
            type="button"
            onClick={startGame}
            className="px-4 py-2 rounded-lg bg-[var(--ubuntu-orange)] text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>START MISSION</span>
          </button>
        ) : gameState === "gameover" ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={startGame}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
              title="Play Again (Space)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>PLAY AGAIN</span>
            </button>
            <button
              type="button"
              onClick={() => onExit(gameRef.current.score)}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
              title="Quit to Terminal Bash (Q)"
            >
              <X className="w-3.5 h-3.5" />
              <span>QUIT (BASH)</span>
            </button>
          </div>
        ) : (
          <div className="hidden sm:block text-[11px] text-zinc-400">
            [Mouse / A / D] Move • [Hold Click / SPACE] Fire • [P] Pause
          </div>
        )}

        {/* Action Fire Button with Continuous Hold */}
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            if (gameRef.current.state === "start" || gameRef.current.state === "gameover") {
              startGame();
            } else {
              gameRef.current.isPointerDown = true;
              fireBullet();
            }
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            gameRef.current.isPointerDown = false;
          }}
          onPointerLeave={(e) => {
            e.preventDefault();
            gameRef.current.isPointerDown = false;
          }}
          className="px-5 h-9 rounded-lg bg-emerald-600 active:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
          title="Fire Plasma Weapon (Space)"
        >
          <span>🔥 FIRE</span>
        </button>
      </div>
    </div>
  );
}