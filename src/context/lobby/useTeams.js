import { useEffect, useState } from "react";

export function useTeams(players, currentUser, creatorName) {
    const [teamAPlayers, setTeamAPlayers] = useState([]);
    const [teamBPlayers, setTeamBPlayers] = useState([]);
    const [host, setHost] = useState(false);
    
    useEffect(() => {
        if (players) {
            const teamA = players.filter((player) => player.team === 0);
            const teamB = players.filter((player) => player.team === 1);
            setTeamAPlayers(teamA);
            setTeamBPlayers(teamB);
            const isHost = currentUser === creatorName;
            setHost(isHost);
        }
    }, [players.length]);

    return {teamAPlayers, teamBPlayers, host}
}