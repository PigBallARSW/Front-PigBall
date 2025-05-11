import { useState } from "react";
import { useUserLogin } from "../../Modules/useUserLogin";
import { useUser } from "../user/userContext";

export function useTeams() {
    const {playerData} = useUser();
    const [teamAPlayers, setTeamAPlayers] = useState([]);
    const [teamBPlayers, setTeamBPlayers] = useState([]);
    const {usersCharacters} = useUserLogin();
    const fetchCustomizations = async (players) => {
        const teamA = []
        const teamB = []
        if (players && playerData?.authenticated) {
            const users = players.map((p) => p.id)
            let characters = await usersCharacters(users)
            if(characters){
                players.forEach((player) => {
                    let customization = {}
                    const custom = characters.find((p) => p.id === player.id);
                    if(custom){
                        customization = {
                          image: custom.image,
                          borderColor: custom.borderColor,
                          centerColor: custom.centerColor,
                          iconType: custom.iconType,
                          iconColor: custom.iconColor
                        };
                      }else{
                        customization = {
                          image: null,
                          borderColor: null,
                          centerColor: null,
                          iconType: null,
                          iconColor: null
                        };
                      }
                      const data = {
                          id: player.id,
                          name: player.name,
                          team: player.team,
                          x: player.x,
                          y: player.y,
                          ...customization
                      };

                    if (player.team === 0) teamA.push(data);
                    else if (player.team === 1) teamB.push(data);
                });
            }
        }else{
            players.forEach((player) => {
                const data = {
                    id: player.id,
                    name: player.name,
                    team: player.team,
                    x: player.x,
                    y: player.y,
                    gamesWon: null,
                    image: null,
                    borderColor: null,
                    centerColor: null,
                    iconType: null,
                    iconColor: null
                };
                if (player.team === 0) teamA.push(data);
                else if (player.team === 1) teamB.push(data);
            });
        }
        setTeamAPlayers(teamA);
        setTeamBPlayers(teamB);
    }

    return {teamAPlayers, teamBPlayers, fetchCustomizations}
}