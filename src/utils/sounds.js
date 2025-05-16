export const playSound = (src, volume = 1.0) => {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch((e) => console.error("Audio playback failed:", e));
  return audio;
};
