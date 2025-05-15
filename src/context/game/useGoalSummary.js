import { useCallback } from "react";

export function useGoalSummary(state) {

  const calculateGoals = useCallback((players) => {
    const goalEvents = state.events?.filter(
          (e) => e.second === "GOAL_SCORED" || e.second === "SELF_GOAL_SCORED"
    ) || [];
    const playerMap = new Map(players.map(p => [p.id, p]));

    const goalsMap = new Map();
    const teamCount = { 0: 0, 1: 0 };
    let topScorer = null;
    for (const event of goalEvents) {
      const player = playerMap.get(event.first);
      if (!player) continue;

      teamCount[player.team] += 1;
      let updatedPlayer;
      if (goalsMap.has(player.id)) {
        updatedPlayer = goalsMap.get(player.id)
        updatedPlayer.goal += 1;
      } else {
        updatedPlayer = { ...player, goal: 1 };
        goalsMap.set(player.id, updatedPlayer);
      }
      if (!topScorer || updatedPlayer.goal > topScorer.goal) {
      topScorer = updatedPlayer;
      }
    }

    return {
      goalByTeam: teamCount,
      goalsList: Array.from(goalsMap.values()),
      scorer : topScorer
    };
  }, []);

  return calculateGoals;
}
