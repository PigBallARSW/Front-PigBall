import { useEffect, useState } from "react";

export function useTeams(players, currentUser, creatorName) {
    const [teamAPlayers, setTeamAPlayers] = useState([]);
    const [teamBPlayers, setTeamBPlayers] = useState([]);
    const [host, setHost] = useState(false);
    useEffect(() => {
        if (players) {
            const teamA = players.filter((player) => player.team === 0);
            const teamB = players.filter((player) => player.team === 1);
            /*if(user){
                let existing = teamA.find((p) => p.id === user.id);
                if (!existing) {
                    existing = teamB.find((p) => p.id === user.id);
                }
                if (existing) {
                    existing.won = user.gamesWon;
                }
            }*/
            setTeamAPlayers(teamA);
            setTeamBPlayers(teamB);
            const isHost = currentUser === creatorName;
            setHost(isHost);
        }
    }, [players, creatorName, currentUser]);

    return {teamAPlayers, teamBPlayers, host}
}