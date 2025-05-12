import { useRef } from "react";
import { Box, Fab, alpha } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

export default function MobileControls({ onMoveStart, onMoveEnd, onActionStart, onActionEnd }) {
  const joystickRef = useRef(null);
  const stickRef = useRef(null);
  const moveDirectionRef = useRef(null);
  const isDraggingRef = useRef(false);

  const getDirection = (dx, dy) => {
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle >= -45 && angle <= 45) return "ArrowRight";
    if (angle > 45 && angle < 135) return "ArrowDown";
    if (angle >= 135 || angle <= -135) return "ArrowLeft";
    if (angle < -45 && angle > -135) return "ArrowUp";
    return null;
  };

  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    const touch = e.touches[0];
    const base = joystickRef.current.getBoundingClientRect();

    const move = (ev) => {
      const t = ev.touches[0];
      const dx = t.clientX - (base.left + base.width / 2);
      const dy = t.clientY - (base.top + base.height / 2);

      const direction = getDirection(dx, dy);
      if (direction !== moveDirectionRef.current) {
        if (moveDirectionRef.current) onMoveEnd(moveDirectionRef.current);
        if (direction) onMoveStart(direction);
        moveDirectionRef.current = direction;
      }

      const stick = stickRef.current;
      const maxDistance = 40;
      const distance = Math.min(Math.hypot(dx, dy), maxDistance);
      const angle = Math.atan2(dy, dx);
      const x = distance * Math.cos(angle);
      const y = distance * Math.sin(angle);

      stick.style.transition = "none"; 
      stick.style.transform = `translate(${x}px, ${y}px)`;
    };

    const end = () => {
      if (moveDirectionRef.current) {
        onMoveEnd(moveDirectionRef.current);
        moveDirectionRef.current = null;
      }

      const stick = stickRef.current;
      isDraggingRef.current = false;
      stick.style.transition = "transform 0.15s ease-out"; 
      stick.style.transform = `translate(0px, 0px)`;

      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };

    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {/* Joystick */}
      <Box
        ref={joystickRef}
        sx={{
          position: "relative",
          width: 150,
          height: 150,
          borderRadius: "50%",
          bgcolor: alpha("#000000", 0.2),
          border: `2px solid ${alpha("#ffffff", 0.3)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
          touchAction: "none",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
        onTouchStart={handleTouchStart}
      >
        {/* Base */}
        <Box
          sx={{
            position: "absolute",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            bgcolor: alpha("#ffffff", 0.1),
            border: `1px solid ${alpha("#ffffff", 0.2)}`,
          }}
        />
        {/* Stick */}
        <Box
          ref={stickRef}
          sx={{
            position: "absolute",
            width: 60,
            height: 60,
            borderRadius: "50%",
            bgcolor: alpha("#ffc107", 0.8),
            boxShadow: `0 0 15px ${alpha("#1976d2", 0.5)}`,
            border: `2px solid ${alpha("#ffffff", 0.8)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 15,
              height: 15,
              borderRadius: "50%",
              bgcolor: alpha("#ffffff", 0.9),
            }}
          />
        </Box>
      </Box>

      {/* Action Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          pointerEvents: "auto",
        }}
      >
        <Fab
          onTouchStart={onActionStart}
          onTouchEnd={onActionEnd}
          color="primary"
          size="large"
          sx={{
            width: 80,
            height: 80,
            bgcolor: alpha("#ffc107", 0.8),
            "&:hover": { bgcolor: alpha("#f9d466", 0.9) },
            boxShadow: "0 0 15px rgba(192, 210, 25, 0.5)",
          }}
        >
          <SportsSoccerIcon sx={{ fontSize: 60 }} />
        </Fab>
      </Box>
    </Box>
  );
}


