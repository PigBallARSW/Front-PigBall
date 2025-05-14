import { useEffect } from "react";
import { useUserLogin } from "../../Modules/useUserLogin";
import { useUser } from "../user/userContext";
import { useGoal } from "./useGoal";
import { useCalculateInfo } from "./useCalculateInfo";

export function useSummary(gameState) {
    const {usersCharacters} = useUserLogin()
    const {playerData} = useUser()
    const {playersGoal, updatesGoal} = useGoal()
    const {assists, playersAssist, playersGoals, calculateGoalNumber, calculateAssistNumber} = useCalculateInfo()
    useEffect(() => {
    const fetchCustomizations = async () => {
      const players = []
      if(playerData.authenticated){
        const users = gameState.players.map((p) => p.id)
        let characters = await usersCharacters(users)
        if(characters){
            gameState.players.forEach((player) => {
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
                players.push(data)
            });
        }
      }else{
        gameState.players.forEach((player) => {
          const data = {
              id: player.id,
              name: player.name,
              team: player.team,
              x: player.x,
              y: player.y,
              image: null,
              borderColor: null,
              centerColor: null,
              iconType: null,
              iconColor: null
          };
          players.push(data)
        });
      }
      updatesGoal(gameState, players)
      calculateGoalNumber(playersGoal);
      calculateAssistNumber(gameState, players);
    }
    fetchCustomizations()
  }, [])

  return {playersGoal, assists, playersAssist, playersGoals}
};