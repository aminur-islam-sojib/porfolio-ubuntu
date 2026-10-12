---
name: motion-performance
description: 60fps performance profiling and hardware-accelerated motion guidelines
---

# Motion & Performance Skill Specification

## 1. Animation Rules
1. **Never animate layout properties**: Never animate `top`, `left`, `width`, `height`, `margin`, or `padding`.
2. **Only animate composited properties**:
   - `transform: translate3d(...)` / `scale(...)`
   - `opacity`
3. Add `will-change: transform` during active drag states, and remove it on pointer release.
4. Use React 19 / Next.js compiler optimizations and `memo` around window frames so dragging window A does not trigger component renders in window B.

## 2. Accessibility & Prefers-Reduced-Motion
- Use `useReducedMotion` hook.
- When `prefers-reduced-motion` is active:
  - Instant window snap without transition.
  - Disable bounce/spring physics.
  - Keep opacity transitions minimal or instant.

