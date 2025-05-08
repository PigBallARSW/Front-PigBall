import { useState, useRef, useCallback } from 'react';

export function useFpsTracker(frameRate = 60, maxDataPoints = 30) {
  const [fps, setFps] = useState(0);
  const [fpsHistory, setFpsHistory] = useState([]);
  const lastTimeRef = useRef(performance.now());

  const signalFramesReached = useCallback(() => {
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    const calculatedFps = Math.round((frameRate * 1000) / delta);

    setFps(calculatedFps);
    setFpsHistory(prev => {
      const timestamp = new Date().toLocaleTimeString('en-US', {
        hour12: false, minute: '2-digit', second: '2-digit'
      });
      const newHistory = [...prev, { time: timestamp, fps: calculatedFps, target: frameRate }];
      return newHistory.length > maxDataPoints
        ? newHistory.slice(newHistory.length - maxDataPoints)
        : newHistory;
    });

    lastTimeRef.current = now;
  }, [frameRate, maxDataPoints]);

  return { fps, fpsHistory, signalFramesReached };
}
