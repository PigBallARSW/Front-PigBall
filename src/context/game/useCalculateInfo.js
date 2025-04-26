import { createContext, useContext, useState, useMemo, useCallback } from "react";

export function useCalculateInfo () {
    const [playersAssist, setPlayersAssist] = useState({
        blue: 0,
        red: 0
      });
      const [playersGoals, setPlayersGoals] = useState({
        blue: 0,
        red: 0
      });
      const [assists, setAssists] = useState([]);
      const calculateGoalNumber = (players) => {
        const goalsNumber = {
            blue: 0,
            red: 0
        }
        players.forEach((player) => {
            if (player.team === 0){
                goalsNumber.blue = goalsNumber.blue+player.goal;
            }
            else{
                goalsNumber.red = goalsNumber.red+player.goal;
            }
        });
        setPlayersGoals(goalsNumber);
      }
    
      const calculateAssistNumber = (gameState) => {
        const assistEvents = gameState.events?.filter((e) => e.second === "GOAL_ASSIST") || [];
        const assistsByTeam = { blue: 0, red: 0 };
        const assistList = [];
      
        assistEvents.forEach((event) => {
          const player = gameState.players?.find((p) => p.id === event.first);
          if (player) {
            if (player.team === 0) assistsByTeam.blue++;
            else if (player.team === 1) assistsByTeam.red++;
            const existing = assistList.find((pl) => pl.id === player.id);
            if (existing) {
                existing.assist++;
            } else {
                assistList.push({ id: player.id, name: player.name, team: player.team, assist: 1 });
            }
          }
        });
        setPlayersAssist(assistsByTeam);
        setAssists(assistList);
      };

  
  return {assists, playersAssist, playersGoals, calculateGoalNumber, calculateAssistNumber};
};