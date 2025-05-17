import { useCallback } from "react";
import { useUserLogin } from "../../Modules/useUserLogin";

export function useCustomizedPlayers(gameState) {
  const { usersCharacters } = useUserLogin();

  const getCustomizedPlayers = useCallback(async () => {
    const players = gameState?.players ?? [];
    if (players.length === 0) return [];

    const userIds = players?.map(p => p.id);
    const characters = await usersCharacters(userIds);
    const characterMap = new Map((characters ?? []).map(c => [c.id, c]));

    const customizedPlayers = players.map(player => {
      const custom = characterMap.get(player.id) || {};
      return {
        id: player.id,
        name: player.name,
        team: player.team,
        image: custom.image ?? null,
        borderColor: custom.borderColor ?? null,
        centerColor: custom.centerColor ?? null,
        iconType: custom.iconType ?? null,
        iconColor: custom.iconColor ?? null,
        gamesWon: custom.gamesWon ?? null
      };
    });
    return customizedPlayers
  }, [gameState?.players, usersCharacters]);

  return getCustomizedPlayers;
}
