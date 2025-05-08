import { useEffect, useState } from "react";
import { useUserLogin } from "../../Modules/useUserLogin";

export function useTeams() {
    const [teamAPlayers, setTeamAPlayers] = useState([]);
    const [teamBPlayers, setTeamBPlayers] = useState([]);
    const {usersCharacters} = useUserLogin();
    const fetchCustomizations = async (players) => {
        const teamA = []
        const teamB = []
        if (players) {
            const users = players.map((p) => p.id)
            let characters = await usersCharacters(users)
            if(characters){
                players.forEach((player) => {
                    const custom = characters.find((p) => p.id === player.id);
                    const data = {
                        id: player.id,
                        name: player.name,
                        team: player.team,
                        x: player.x,
                        y: player.y,
                        gamesWon: custom.gamesWon,
                        image: custom.image,
                        borderColor: custom.borderColor,
                        centerColor: custom.centerColor,
                        iconType: custom.iconType,
                        iconColor: custom.iconColor
                    };

                    if (player.team === 0) teamA.push(data);
                    else if (player.team === 1) teamB.push(data);
                });
                console.log(teamA, teamB)
                setTeamAPlayers(teamA);
                setTeamBPlayers(teamB);
            }
        }
    }

    return {teamAPlayers, teamBPlayers, fetchCustomizations}
}