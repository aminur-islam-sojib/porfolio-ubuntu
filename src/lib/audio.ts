/**
 * Synthesizes an authentic warm Ubuntu login sound using Web Audio API oscillators.
 * Zero external audio files required, 0KB asset payload, pure math and synthesis.
 */
export function playUbuntuStartupChime(): void {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Classic pentatonic Ubuntu notes: D4, F#4, A4, D5 (or warm marimba chords)
    const notes = [
      { freq: 293.66, time: 0.0, dur: 1.2, gain: 0.15 }, // D4
      { freq: 369.99, time: 0.12, dur: 1.1, gain: 0.14 }, // F#4
      { freq: 440.0, time: 0.24, dur: 1.2, gain: 0.15 }, // A4
      { freq: 587.33, time: 0.38, dur: 1.8, gain: 0.2 }, // D5
    ];

    notes.forEach(({ freq, time, dur, gain: targetGain }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + time);

      // Warm marimba/acoustic attack & decay envelope
      gainNode.gain.setValueAtTime(0.0001, now + time);
      gainNode.gain.exponentialRampToValueAtTime(targetGain, now + time + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });

    // Cleanup audio context after notes finish
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 2500);
  } catch (err) {
    // Ignore autoplay or audio context errors
    console.debug("Audio playback skipped:", err);
  }
}
