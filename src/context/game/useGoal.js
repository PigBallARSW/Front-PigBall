import { createContext, useContext, useState, useMemo, useCallback } from "react";

export function useGoal () {
  const [goalAnimation, setGoalAnimation] = useState({
    show: false,
    player: null,
    team: null,
  });
  const [playersGoal, setPlayersGoal] = useState([]);

  const addGoal = useCallback((state) => {
    const goalEvents = state.events?.filter(
      (e) => e.second === "GOAL_SCORED" || e.second === "SELF_GOAL_SCORED"
    );

    const lastGoal = goalEvents?.[goalEvents.length - 1];
    if (!lastGoal) return;

    const playerId = lastGoal.first;
    const player = state.players?.find((p) => p.id === playerId);
    if (player) {
      setGoalAnimation({
        show: true,
        player: player.name,
        team: player.team,
      });
      setPlayersGoal((prevGoals) => {
        const existing = prevGoals.find((p) => p.id === player.id);
        if (existing) {
          return prevGoals.map((p) =>
            p.id === player.id ? { ...p, goal: p.goal + 1 } : p
          );
        } else {
          return [...prevGoals, { id: player.id, name: player.name, team: player.team, goal: 1 }];
        }
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

  
  return {goalAnimation, addGoal, closeGoalAnimation, playersGoal};
};

