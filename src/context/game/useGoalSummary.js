import { useCallback } from "react";

export function useGoalSummary(state) {

  const calculateGoals = useCallback((players) => {
    const goalEvents = state.events?.filter(
          (e) => e.second === "GOAL_SCORED" || e.second === "SELF_GOAL_SCORED"
    ) || [];
    const playerMap = new Map(players.map(p => [p.id, p]));

    const goalsMap = new Map();
    const teamCount = { 0: 0, 1: 0 };

    for (const event of goalEvents) {
      const player = playerMap.get(event.first);
      if (!player) continue;

      teamCount[player.team] += 1;

      if (goalsMap.has(player.id)) {
        goalsMap.get(player.id).goal += 1;
      } else {
        goalsMap.set(player.id, { ...player, goal: 1 });
      }
    }

    return {
      goalByTeam: teamCount,
      goalsList: Array.from(goalsMap.values())
    };
  }, []);

  return calculateGoals;
}
