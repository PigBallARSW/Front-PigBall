import { useEffect, useRef } from "react";

export function useMoveGame(movePlayer) {
  const movementState = useRef({ up: false, down: false, left: false, right: false, isKicking: false });
  const onMoveStart = (direction) => {
    const key = direction.replace("Arrow", "").toLowerCase();
    movementState.current[key] = true;
  };
  const onMoveEnd = (direction) => {
    const key = direction.replace("Arrow", "").toLowerCase();
    movementState.current[key] = false;
  };

  const onActionStart = () => {
    movementState.current.isKicking = true;
  };

  const onActionEnd = () => {
    movementState.current.isKicking = false;
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) || e.code === "Space") {
        if (e.code === "Space") {
          e.preventDefault(); 
          movementState.current.isKicking = true;
        } else {
          movementState.current[e.key.replace("Arrow", "").toLowerCase()] = true;
        }
      }
    };

    const handleKeyUp = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) || e.code === "Space") {
        if (e.code === "Space") {
          e.preventDefault();
          movementState.current.isKicking = false;
        } else {
          movementState.current[e.key.replace("Arrow", "").toLowerCase()] = false;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    movePlayer(movementState);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [movePlayer]);
  
  return {onMoveStart,onMoveEnd, onActionStart, onActionEnd}
}
