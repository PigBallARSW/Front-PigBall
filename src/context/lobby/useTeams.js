import { useCallback, useState } from "react";
import { useUser } from "../user/userContext";
import { useCustomizedPlayers } from "../game/useCustomizedPlayers";

export function useTeams(gameState) {
    const {playerData} = useUser();
    const [teamAPlayers, setTeamAPlayers] = useState([]);
    const [teamBPlayers, setTeamBPlayers] = useState([]);
    const getCustomizedPlayers = useCustomizedPlayers(gameState)
    const fetchCustomizations = useCallback(async (players) => {
        const teamA = []
        const teamB = []
        if (players && playerData?.authenticated) {
            const users = players.map((p) => p.id)
            let characters = await getCustomizedPlayers(users)
            teamA = characters.filter((p) => p.team === 0)
            teamB = characters.filter((p) => p.team === 1)
        }
        setTeamAPlayers(teamA);
        setTeamBPlayers(teamB);
    },[])

    return {teamAPlayers, teamBPlayers, fetchCustomizations}
}