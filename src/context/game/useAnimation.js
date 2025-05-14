import { useState, useCallback } from "react";

export function useAnimation () {
  const [goalAnimation, setGoalAnimation] = useState({
    show: false,
    player: null,
    team: null,
    event: null
  });

  const addGoalPlayer = useCallback((player) => {
    if (player) {
        setGoalAnimation({
          show: true,
          player: player.name,
          team: player.team,
          event: playerGoal
        });
      } else {
        console.warn("Jugador no encontrado");
      }
  },[]);

  const closeGoalAnimation = useCallback(() => {
    setGoalAnimation((prev) => ({
      ...prev,
      show: false,
    }));
  },[]);

  
  return {goalAnimation, addGoalPlayer, closeGoalAnimation};
};