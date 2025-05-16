import { useCallback, useState } from "react";
import { useUser } from "../user/userContext";
import { useCustomizedPlayers } from "../game/useCustomizedPlayers";

export function useTeams(gameState) {
    const {playerData} = useUser();
    const [teamAPlayers, setTeamAPlayers] = useState([]);
    const [teamBPlayers, setTeamBPlayers] = useState([]);
    const getCustomizedPlayers = useCustomizedPlayers(gameState)
    const fetchCustomizations = useCallback(async (players) => {
        let teamA = []
        let teamB = []
        if (players && playerData) {
            const users = players.map((p) => p.id)
            let characters = await getCustomizedPlayers(users)
            teamA = characters.filter((p) => p.team === 0)
            teamB = characters.filter((p) => p.team === 1)
        }
        setTeamAPlayers(teamA);
        setTeamBPlayers(teamB);
    },[playerData, getCustomizedPlayers])

    return {teamAPlayers, teamBPlayers, fetchCustomizations}
}