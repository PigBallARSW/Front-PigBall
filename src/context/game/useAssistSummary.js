import { useCallback } from "react";

export function useAssistSummary(gameState) {
  const calculate = useCallback((players) => {
    const assistEvents = gameState.events?.filter(e => e.second === "GOAL_ASSIST") || [];
    const playerMap = new Map(players.map(p => [p.id, p]));

    const assistMap = new Map();
    const teamCount = { 0: 0, 1: 0 };

    for (const event of assistEvents) {
      const player = playerMap.get(event.first);
      if (!player) continue;

      teamCount[player.team] += 1;

      if (assistMap.has(player.id)) {
        assistMap.get(player.id).assist += 1;
      } else {
        assistMap.set(player.id, { ...player, assist: 1 });
      }
    }

    return {
      assistsByTeam: teamCount,
      assistsList: Array.from(assistMap.values())
    };
  }, []);

  return calculate;
}
