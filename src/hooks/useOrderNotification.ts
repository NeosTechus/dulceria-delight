import { useEffect, useRef } from 'react';

/**
 * Plays a notification sound when new pending orders appear.
 * Uses Web Audio API — no external files needed.
 */
export const useOrderNotification = (pendingCount: number) => {
  const prevCount = useRef(pendingCount);

  useEffect(() => {
    // Only play when pending count increases (new order arrived)
    if (pendingCount > prevCount.current) {
      playNotificationSound();
    }
    prevCount.current = pendingCount;
  }, [pendingCount]);
};

function playNotificationSound() {
  try {
    const ctx = new AudioContext();

    // Two-tone chime: a friendly "ding-dong"
    const playTone = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

      gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + duration);
    };

    // "Ding" - high note
    playTone(880, 0, 0.3);
    // "Dong" - slightly lower
    playTone(660, 0.15, 0.4);
    // Third accent
    playTone(1047, 0.35, 0.3);

    // Clean up after sounds finish
    setTimeout(() => ctx.close(), 1500);
  } catch {
    // AudioContext not available — silently ignore
  }
}
