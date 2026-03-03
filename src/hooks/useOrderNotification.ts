import { useEffect, useRef, useState, useCallback } from 'react';

const SOUND_ENABLED_KEY = 'order_sound_enabled';

function getSoundEnabled(): boolean {
  try {
    const val = localStorage.getItem(SOUND_ENABLED_KEY);
    return val === null ? true : val === 'true';
  } catch { return true; }
}

/**
 * Plays a notification sound when new pending orders appear.
 * Returns { soundEnabled, toggleSound } for UI controls.
 */
export const useOrderNotification = (pendingCount: number) => {
  const prevCount = useRef(pendingCount);
  const [soundEnabled, setSoundEnabled] = useState(getSoundEnabled);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(SOUND_ENABLED_KEY, String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    if (pendingCount > prevCount.current && soundEnabled) {
      const newOrders = pendingCount - prevCount.current;
      for (let i = 0; i < newOrders; i++) {
        setTimeout(() => playNotificationSound(), i * 600);
      }
    }
    prevCount.current = pendingCount;
  }, [pendingCount, soundEnabled]);

  return { soundEnabled, toggleSound };
};

function playNotificationSound() {
  try {
    const ctx = new AudioContext();

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

    setTimeout(() => ctx.close(), 1500);
  } catch {
    // AudioContext not available
  }
}
