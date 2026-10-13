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
  type: number; // 0, 1, 2
  alive: boolean;
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

interface PowerUp {
  x: number;
  y: number;
  type: "triple" | "speed" | "life";
  vy: number;
}

interface Bunker {
  x: number;
  y: number;
  hp: number;
}

export function TerminalShooter({ onExit }: TerminalShooterProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // High score from local storage (lazy initializer avoids effect setState)
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
  const [score, setScore] = React.useState<number>(0);
  const [gameState, setGameState] = React.useState<"start" | "playing" | "paused" | "gameover" | "victory">("start");
  const [isMuted, setIsMuted] = React.useState<boolean>(() => soundFx.getMuted());

  // Mutable game state ref to avoid React state lag during 60fps loop
  const gameRef = React.useRef({
    player: {
      x: 300,
      y: 380,
      width: 32,
      height: 20,
      speed: 5,
      tripleShotTimer: 0,
      speedTimer: 0,
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
    score: 0,
    lives: 3,
    state: "start" as "start" | "playing" | "paused" | "gameover" | "victory",
    canvasWidth: 640,
    canvasHeight: 440,
  });

  const saveHighScore = React.useCallback((currentScore: number) => {
    setHighScore((prev) => {
      const newHigh = Math.max(prev, currentScore);
      if (typeof window !== "undefined") {
        localStorage.setItem("ubuntu_terminal_shooter_high_score", newHigh.toString());
      }
      return newHigh;
    });
  }, []);

  // Initialize stars and bunkers
  const initLevel = React.useCallback((currentWave: number) => {
    const g = gameRef.current;
    g.wave = currentWave;

    // Stars
    if (g.stars.length === 0) {
      g.stars = Array.from({ length: 45 }, () => ({
        x: Math.random() * g.canvasWidth,
        y: Math.random() * g.canvasHeight,
        speed: 0.2 + Math.random() * 0.8,
        char: Math.random() > 0.7 ? "*" : Math.random() > 0.4 ? "+" : ".",
      }));
    }

    // Enemies grid: 6 columns x 4 rows
    const cols = 6;
    const rows = 4;
    const enemySpacingX = 52;
    const enemySpacingY = 32;
    const startX = (g.canvasWidth - cols * enemySpacingX) / 2;
    const startY = 60;

    const newEnemies: Enemy[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let type = 0;
        let pts = 10;
        if (r === 0) {
          type = 2; // Boss
          pts = 30;
        } else if (r === 1) {
          type = 1; // Elite
          pts = 20;
        }
        newEnemies.push({
          x: startX + c * enemySpacingX,
          y: startY + r * enemySpacingY,
          type,
          alive: true,
          points: pts,
        });
      }
    }
    g.enemies = newEnemies;
    g.enemyDirection = 1;
    g.enemySpeed = 0.8 + currentWave * 0.25;
    g.bullets = [];
    g.powerUps = [];

    // Bunkers: 3 positions
    const bunkerCount = 3;
    const bunkerWidth = 48;
    const bunkerSpacing = (g.canvasWidth - bunkerCount * bunkerWidth) / (bunkerCount + 1);
    g.bunkers = Array.from({ length: bunkerCount }, (_, i) => ({
      x: bunkerSpacing * (i + 1) + bunkerWidth * i,
      y: g.canvasHeight - 90,
      hp: 12, // takes 12 hits
    }));

    g.player.x = g.canvasWidth / 2 - g.player.width / 2;
    g.player.y = g.canvasHeight - 45;
  }, []);

  const startGame = React.useCallback(() => {
    const g = gameRef.current;
    g.score = 0;
    g.lives = 3;
    setScore(0);
    initLevel(1);
    g.state = "playing";
    setGameState("playing");
  }, [initLevel]);

  // Handle player firing
  const fireBullet = React.useCallback(() => {
    const g = gameRef.current;
    if (g.state !== "playing") return;

    const now = Date.now();
    const cooldown = g.player.speedTimer > 0 ? 160 : 250;
    if (now - g.lastFireTime < cooldown) return;
    g.lastFireTime = now;

    soundFx.playLaser();

    if (g.player.tripleShotTimer > 0) {
      // Triple spread
      g.bullets.push(
        { x: g.player.x + g.player.width / 2, y: g.player.y - 4, vx: 0, vy: -7, isEnemy: false },
        { x: g.player.x + 4, y: g.player.y - 4, vx: -2, vy: -6.5, isEnemy: false },
        { x: g.player.x + g.player.width - 4, y: g.player.y - 4, vx: 2, vy: -6.5, isEnemy: false }
      );
    } else {
      // Standard twin beam
      g.bullets.push({
        x: g.player.x + g.player.width / 2,
        y: g.player.y - 4,
        vx: 0,
        vy: -7,
        isEnemy: false,
      });
    }
  }, []);

  // Mouse / Pointer movement tracking to move fighter with mouse pointer
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
    if (gameState === "start" || gameState === "gameover" || gameState === "victory") {
      startGame();
    } else if (gameState === "playing") {
      g.isPointerDown = true;
      fireBullet();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    updatePlayerPositionFromPointer(e.clientX);
  };

  const handlePointerUp = () => {
    gameRef.current.isPointerDown = false;
  };

  const handlePointerLeave = () => {
    gameRef.current.isPointerDown = false;
  };

  // Global pointer up listener to prevent stuck fire on drag outside
  React.useEffect(() => {
    const handleGlobalPointerUp = () => {
      gameRef.current.isPointerDown = false;
    };
    window.addEventListener("pointerup", handleGlobalPointerUp);
    return () => window.removeEventListener("pointerup", handleGlobalPointerUp);
  }, []);

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
        saveHighScore(g.score);
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
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [fireBullet, onExit, saveHighScore, startGame]);

  // Main 60FPS Game Loop
  React.useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    initLevel(1);

    const spawnExplosion = (x: number, y: number, color = "#FF6D3B") => {
      const g = gameRef.current;
      soundFx.playExplosion();
      const chars = ["*", "+", "#", "x", "•"];
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3.5;
        g.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          char: chars[Math.floor(Math.random() * chars.length)],
          color,
          life: 20 + Math.random() * 15,
          maxLife: 35,
        });
      }
    };

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

      if (g.state !== "playing") return;

      // Player Movement (Keyboard fallback)
      const playerSpeed = g.player.speedTimer > 0 ? 7 : 5;
      if (g.keys.left) {
        g.player.x = Math.max(10, g.player.x - playerSpeed);
      }
      if (g.keys.right) {
        g.player.x = Math.min(g.canvasWidth - g.player.width - 10, g.player.x + playerSpeed);
      }

      // Continuous firing while pointer is pressed down
      if (g.isPointerDown) {
        fireBullet();
      }

      // Timers decrement
      if (g.player.tripleShotTimer > 0) g.player.tripleShotTimer--;
      if (g.player.speedTimer > 0) g.player.speedTimer--;
      if (g.player.invulnerableTimer > 0) g.player.invulnerableTimer--;

      // 3. Update Bullets
      for (let i = g.bullets.length - 1; i >= 0; i--) {
        const b = g.bullets[i];
        b.x += b.vx;
        b.y += b.vy;

        // Out of bounds
        if (b.y < 0 || b.y > g.canvasHeight) {
          g.bullets.splice(i, 1);
          continue;
        }

        // Bullet vs Bunker collision (Ubuntu Firewalls)
        // Friendly player bullets pass through our firewalls to attack hostile targets.
        // Incoming hostile enemy lasers get absorbed and damage the firewall.
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
              spawnExplosion(b.x, b.y, "#887968");
              break;
            }
          }
          if (hitBunker) {
            g.bullets.splice(i, 1);
            continue;
          }
        }

        // Player bullet vs Enemies & UFO
        if (!b.isEnemy) {
          let hitEnemy = false;

          // Swept bullet bounding box so fast/diagonal bullets never tunnel through enemies
          const bulletLeft = b.x - 6;
          const bulletRight = b.x + 8;
          const bulletTop = Math.min(b.y - 12, b.y - 12 + b.vy);
          const bulletBottom = Math.max(b.y + 4, b.y + 4 - b.vy);

          // Iterate bottom-to-top so frontmost enemies closest to the cannon get hit first
          for (let eIdx = g.enemies.length - 1; eIdx >= 0; eIdx--) {
            const enemy = g.enemies[eIdx];
            if (!enemy.alive) continue;

            // Enemy visual bounds (5 characters: ~42px wide, ~22px tall)
            const enemyLeft = enemy.x - 2;
            const enemyRight = enemy.x + 44;
            const enemyTop = enemy.y;
            const enemyBottom = enemy.y + 24;

            // AABB Overlap check
            if (
              bulletRight >= enemyLeft &&
              bulletLeft <= enemyRight &&
              bulletBottom >= enemyTop &&
              bulletTop <= enemyBottom
            ) {
              enemy.alive = false;
              hitEnemy = true;
              g.score += enemy.points;
              setScore(g.score);
              saveHighScore(g.score);

              spawnExplosion(enemy.x + 20, enemy.y + 11, "#E95420");

              // Chance of PowerUp drop (15%)
              if (Math.random() < 0.15) {
                const types: Array<"triple" | "speed" | "life"> = ["triple", "speed", "life"];
                g.powerUps.push({
                  x: enemy.x + 16,
                  y: enemy.y + 10,
                  type: types[Math.floor(Math.random() * types.length)],
                  vy: 1.8,
                });
              }
              break;
            }
          }

          // Player bullet vs UFO (Full 11-char sprite width ~88px)
          if (g.ufo && !hitEnemy) {
            const ufoLeft = g.ufo.x - 4;
            const ufoRight = g.ufo.x + 92;
            const ufoTop = g.ufo.y;
            const ufoBottom = g.ufo.y + 26;

            if (
              bulletRight >= ufoLeft &&
              bulletLeft <= ufoRight &&
              bulletBottom >= ufoTop &&
              bulletTop <= ufoBottom
            ) {
              g.score += g.ufo.points;
              setScore(g.score);
              saveHighScore(g.score);
              spawnExplosion(g.ufo.x + 44, g.ufo.y + 12, "#47D472");
              g.ufo = null;
              hitEnemy = true;
            }
          }

          if (hitEnemy) {
            g.bullets.splice(i, 1);
            continue;
          }
        } else {
          // Enemy bullet vs Player
          if (
            g.player.invulnerableTimer <= 0 &&
            b.x >= g.player.x &&
            b.x <= g.player.x + g.player.width &&
            b.y >= g.player.y &&
            b.y <= g.player.y + g.player.height
          ) {
            g.lives -= 1;
            soundFx.playHit();
            spawnExplosion(g.player.x + 16, g.player.y + 10, "#DF382C");
            g.player.invulnerableTimer = 90; // invulnerable for 1.5s
            g.bullets.splice(i, 1);

            if (g.lives <= 0) {
              g.state = "gameover";
              setGameState("gameover");
            }
            continue;
          }
        }
      }

      // 4. Update PowerUps
      for (let i = g.powerUps.length - 1; i >= 0; i--) {
        const pu = g.powerUps[i];
        pu.y += pu.vy;

        // Catch powerup
        if (
          pu.x + 12 >= g.player.x &&
          pu.x <= g.player.x + g.player.width &&
          pu.y + 12 >= g.player.y &&
          pu.y <= g.player.y + g.player.height
        ) {
          soundFx.playPowerup();
          if (pu.type === "triple") g.player.tripleShotTimer = 450; // 7.5 seconds
          if (pu.type === "speed") g.player.speedTimer = 450;
          if (pu.type === "life") {
            g.lives = Math.min(5, g.lives + 1);
          }
          g.powerUps.splice(i, 1);
          continue;
        }

        if (pu.y > g.canvasHeight) {
          g.powerUps.splice(i, 1);
        }
      }

      // 5. Update Enemies Movement
      const livingEnemies = g.enemies.filter((e) => e.alive);

      // Check Victory Condition
      if (livingEnemies.length === 0) {
        g.score += 500 * g.wave;
        setScore(g.score);
        saveHighScore(g.score);
        soundFx.playPowerup();
        initLevel(g.wave + 1);
        return;
      }

      // Increase speed as enemies decrease
      const remainingPct = livingEnemies.length / g.enemies.length;
      const currentSpeed = (g.enemySpeed + (1 - remainingPct) * 1.6) * g.enemyDirection;

      let edgeReached = false;
      for (const e of livingEnemies) {
        e.x += currentSpeed;
        if (e.x < 15 || e.x + 36 > g.canvasWidth - 15) {
          edgeReached = true;
        }
      }

      if (edgeReached) {
        g.enemyDirection *= -1;
        for (const e of livingEnemies) {
          e.y += 14;
          // Check if enemies reached the player
          if (e.y + 22 >= g.player.y) {
            g.lives = 0;
            g.state = "gameover";
            setGameState("gameover");
          }
        }
      }

      // 6. Enemy Random Shooting
      g.enemyShootTimer++;
      const shootInterval = Math.max(30, 75 - g.wave * 8);
      if (g.enemyShootTimer > shootInterval) {
        g.enemyShootTimer = 0;
        const shooter = livingEnemies[Math.floor(Math.random() * livingEnemies.length)];
        if (shooter) {
          g.bullets.push({
            x: shooter.x + 18,
            y: shooter.y + 20,
            vx: (Math.random() - 0.5) * 0.8,
            vy: 3.5 + g.wave * 0.4,
            isEnemy: true,
          });
        }
      }

      // 7. Update UFO
      g.ufoTimer++;
      if (!g.ufo && g.ufoTimer > 600) {
        g.ufoTimer = 0;
        g.ufo = {
          x: -60,
          y: 28,
          speed: 2.2,
          points: 150 + Math.floor(Math.random() * 3) * 50,
        };
      }
      if (g.ufo) {
        g.ufo.x += g.ufo.speed;
        if (g.ufo.x > g.canvasWidth + 60) {
          g.ufo = null;
        }
      }
    };

    const render = () => {
      const g = gameRef.current;
      ctx.clearRect(0, 0, g.canvasWidth, g.canvasHeight);

      // Background: Deep Aubergine terminal hue
      ctx.fillStyle = "#220419";
      ctx.fillRect(0, 0, g.canvasWidth, g.canvasHeight);

      // CRT Scanline Pattern
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let y = 0; y < g.canvasHeight; y += 4) {
        ctx.fillRect(0, y, g.canvasWidth, 2);
      }

      // Render Starfield
      ctx.font = "11px 'Ubuntu Mono', monospace";
      for (const star of g.stars) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fillText(star.char, star.x, star.y);
      }

      // Render Bunkers (Firewalls)
      ctx.font = "12px 'Ubuntu Mono', monospace";
      for (const bunker of g.bunkers) {
        if (bunker.hp > 0) {
          const alpha = bunker.hp / 12;
          ctx.fillStyle = `rgba(180, 100, 50, ${alpha})`;
          ctx.fillText("[######]", bunker.x, bunker.y + 10);
          ctx.fillText("[##  ##]", bunker.x, bunker.y + 20);
        }
      }

      // Render UFO
      if (g.ufo) {
        ctx.font = "bold 13px 'Ubuntu Mono', monospace";
        ctx.fillStyle = "#FF6D3B";
        ctx.fillText("<==[UFO]==>", g.ufo.x, g.ufo.y + 12);
      }

      // Render Enemies
      for (const e of g.enemies) {
        if (!e.alive) continue;
        ctx.font = "bold 13px 'Ubuntu Mono', monospace";
        if (e.type === 2) {
          ctx.fillStyle = "#FF79C6"; // Dreadnought
          ctx.fillText("(O_O)", e.x, e.y + 14);
        } else if (e.type === 1) {
          ctx.fillStyle = "#8BE9FD"; // Elite
          ctx.fillText("[o.o]", e.x, e.y + 14);
        } else {
          ctx.fillStyle = "#47D472"; // Grunt
          ctx.fillText("</^\\>", e.x, e.y + 14);
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
        } else {
          ctx.fillStyle = "#FF5555";
          ctx.fillText("[♥+1]", pu.x, pu.y + 10);
        }
      }

      // Render Bullets
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

      // Render Player Ship
      if (g.state === "playing" || g.state === "paused") {
        if (g.player.invulnerableTimer % 6 < 3) {
          ctx.font = "bold 14px 'Ubuntu Mono', monospace";
          ctx.fillStyle = "#47D472";
          ctx.fillText("  ▲  ", g.player.x, g.player.y);
          ctx.fillStyle = "#E95420";
          ctx.fillText("</▲\\>", g.player.x, g.player.y + 12);

          // Thruster flame animation
          if (Math.random() > 0.4) {
            ctx.fillStyle = "#FFB86C";
            ctx.font = "10px 'Ubuntu Mono', monospace";
            ctx.fillText(" v ", g.player.x + 8, g.player.y + 22);
          }
        }
      }

      // HUD Top Header in canvas
      ctx.fillStyle = "rgba(40, 10, 30, 0.75)";
      ctx.fillRect(0, 0, g.canvasWidth, 24);
      ctx.fillStyle = "#47D472";
      ctx.font = "11px 'Ubuntu Mono', monospace";
      ctx.fillText(`SCORE: ${g.score.toString().padStart(6, "0")}`, 14, 16);
      ctx.fillStyle = "#FFB86C";
      ctx.fillText(`HIGH: ${Math.max(g.score, highScore).toString().padStart(6, "0")}`, 160, 16);
      ctx.fillStyle = "#50FA7B";
      ctx.fillText(`WAVE: ${g.wave}`, 310, 16);
      ctx.fillStyle = "#FF5555";
      ctx.fillText(`LIVES: ${"♥ ".repeat(Math.max(0, g.lives))}`, 420, 16);

      // Active Buffs Indicator
      if (g.player.tripleShotTimer > 0) {
        ctx.fillStyle = "#FFB86C";
        ctx.fillText("[TRIPLE SHOT]", 530, 16);
      } else if (g.player.speedTimer > 0) {
        ctx.fillStyle = "#50FA7B";
        ctx.fillText("[SPEED BOOST]", 530, 16);
      }

      // Overlays
      if (g.state === "start") {
        ctx.fillStyle = "rgba(10, 0, 10, 0.85)";
        ctx.fillRect(0, 24, g.canvasWidth, g.canvasHeight - 24);

        ctx.fillStyle = "#E95420";
        ctx.font = "bold 20px 'Ubuntu Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("UBUNTU TERMINAL INVADERS", g.canvasWidth / 2, 130);

        ctx.fillStyle = "#47D472";
        ctx.font = "13px 'Ubuntu Mono', monospace";
        ctx.fillText("KERNEL DEFENDER MISSION", g.canvasWidth / 2, 160);

        ctx.fillStyle = "#B0B0B0";
        ctx.font = "12px 'Ubuntu Mono', monospace";
        ctx.fillText("[Mouse Move or A / D / ← →] Move Spaceship", g.canvasWidth / 2, 210);
        ctx.fillText("[Click or SPACEBAR] Fire Dual Plasma", g.canvasWidth / 2, 235);
        ctx.fillText("[P] Pause Game   •   [Q / ESC] Quit to Bash", g.canvasWidth / 2, 260);

        ctx.fillStyle = "#FFB86C";
        ctx.font = "bold 14px 'Ubuntu Mono', monospace";
        ctx.fillText(">>> MOVE MOUSE OR CLICK TO START <<<", g.canvasWidth / 2, 320);
        ctx.textAlign = "left";
      } else if (g.state === "paused") {
        ctx.fillStyle = "rgba(10, 0, 10, 0.75)";
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
        ctx.fillText("KERNEL PANIC: MISSION FAILED", g.canvasWidth / 2, 140);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "14px 'Ubuntu Mono', monospace";
        ctx.fillText(`FINAL SCORE: ${g.score}`, g.canvasWidth / 2, 185);
        ctx.fillText(`WAVE REACHED: ${g.wave}`, g.canvasWidth / 2, 210);

        ctx.fillStyle = "#47D472";
        ctx.font = "bold 14px 'Ubuntu Mono', monospace";
        ctx.fillText("PRESS [SPACE] TO REBOOT & PLAY AGAIN", g.canvasWidth / 2, 270);
        ctx.fillStyle = "#B0B0B0";
        ctx.font = "12px 'Ubuntu Mono', monospace";
        ctx.fillText("OR PRESS [Q] TO RETURN TO TERMINAL BASH", g.canvasWidth / 2, 300);
        ctx.textAlign = "left";
      }
    };

    const loop = () => {
      update();
      render();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [fireBullet, highScore, initLevel, saveHighScore]);

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
            onClick={() => onExit(score)}
            className="hover:text-[var(--ubuntu-orange)] transition-colors flex items-center gap-1 text-[11px]"
            title="Exit game to bash prompt"
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
            onPointerDown={() => {
              gameRef.current.keys.left = true;
            }}
            onPointerUp={() => {
              gameRef.current.keys.left = false;
            }}
            onPointerLeave={() => {
              gameRef.current.keys.left = false;
            }}
            className="w-11 h-9 rounded-lg bg-white/10 active:bg-[var(--ubuntu-orange)] text-white font-bold flex items-center justify-center text-sm shadow-md transition-colors"
            title="Move Left (A)"
          >
            ◀
          </button>
          <button
            type="button"
            onPointerDown={() => {
              gameRef.current.keys.right = true;
            }}
            onPointerUp={() => {
              gameRef.current.keys.right = false;
            }}
            onPointerLeave={() => {
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
              onClick={() => onExit(score)}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
              title="Quit to Terminal Bash (Q)"
            >
              <X className="w-3.5 h-3.5" />
              <span>QUIT (BASH)</span>
            </button>
          </div>
        ) : (
          <div className="hidden sm:block text-[11px] text-zinc-400">
            [Mouse / A / D] Move • [Click / SPACE] Fire • [P] Pause
          </div>
        )}

        {/* Action Fire Button */}
        <button
          type="button"
          onClick={() => {
            if (gameState === "start" || gameState === "gameover") {
              startGame();
            } else {
              fireBullet();
            }
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
