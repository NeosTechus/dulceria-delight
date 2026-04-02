import { useEffect, useRef, useState, useCallback } from 'react';

const SOUND_ENABLED_KEY = 'order_sound_enabled';

function getSoundEnabled(): boolean {
  try {
    const val = localStorage.getItem(SOUND_ENABLED_KEY);
    return val === null ? true : val === 'true';
  } catch { return true; }
}

/**
 * Plays a loud, continuous alarm when pending orders exist.
 * The alarm loops every 2 seconds until all pending orders are handled.
 * Returns { soundEnabled, toggleSound, isAlarming } for UI controls.
 */
export const useOrderNotification = (pendingCount: number) => {
  const [soundEnabled, setSoundEnabled] = useState(getSoundEnabled);
  const [isAlarming, setIsAlarming] = useState(false);
  const alarmRef = useRef<{ ctx: AudioContext; interval: ReturnType<typeof setInterval> } | null>(null);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(SOUND_ENABLED_KEY, String(next));
      return next;
    });
  }, []);

  const stopAlarm = useCallback(() => {
    if (alarmRef.current) {
      clearInterval(alarmRef.current.interval);
      try { alarmRef.current.ctx.close(); } catch {}
      alarmRef.current = null;
    }
    setIsAlarming(false);
  }, []);

  useEffect(() => {
    if (pendingCount > 0 && soundEnabled) {
      if (alarmRef.current) return; // already alarming

      try {
        const ctx = new AudioContext();

        const playAlarmBurst = () => {
          try {
            // Loud 3-tone urgent alarm
            const playTone = (freq: number, startTime: number, duration: number) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);

              osc.type = 'square'; // harsher, louder than sine
              osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

              gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
              gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + startTime + 0.02);
              gain.gain.setValueAtTime(0.5, ctx.currentTime + startTime + duration - 0.05);
              gain.gain.linearRampToValueAtTime(0, ctx.currentTime + startTime + duration);

              osc.start(ctx.currentTime + startTime);
              osc.stop(ctx.currentTime + startTime + duration);
            };

            // Urgent repeating pattern: high-low-high-low
            playTone(1200, 0, 0.15);
            playTone(800, 0.18, 0.15);
            playTone(1200, 0.36, 0.15);
            playTone(800, 0.54, 0.15);
            playTone(1400, 0.72, 0.25);
          } catch {}
        };

        playAlarmBurst();
        const interval = setInterval(playAlarmBurst, 2000);
        alarmRef.current = { ctx, interval };
        setIsAlarming(true);
      } catch {}
    } else {
      stopAlarm();
    }

    return () => {}; // don't stop on unmount — let it ring until orders are handled
  }, [pendingCount, soundEnabled, stopAlarm]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAlarm();
  }, [stopAlarm]);

  return { soundEnabled, toggleSound, isAlarming, stopAlarm };
};
