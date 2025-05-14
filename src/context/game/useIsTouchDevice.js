import { useEffect, useState } from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const isTouchScreen =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    setIsTouch(isTouchScreen);
  }, []);

  return isTouch;
}
