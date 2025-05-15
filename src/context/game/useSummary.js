import { useEffect, useState } from "react";
import { useCustomizedPlayers } from "./useCustomizedPlayers";
import { useAssistSummary } from "./useAssistSummary";
import { useGoalSummary } from "./useGoalSummary";

export function useSummary(gameState) {
  const getCustomizedPlayers = useCustomizedPlayers(gameState)
  const calculateAssists = useAssistSummary(gameState)
  const calculateGoals = useGoalSummary(gameState)
  const [playerGoals, setPlayerGoals] = useState([])
  const [assists, setAssists] = useState([])
  const [assistsByTeam, setAssistsByTeam] = useState({ 0: 0, 1: 0 })
  const [teamGoals, setTeamGoals] = useState({ 0: 0, 1: 0 })

  useEffect(() => {
    const loadSummary = async () => {
      const players = await getCustomizedPlayers(); 
      const { goalByTeam, goalsList } = calculateGoals(players);
      const { assistsByTeam, assistsList } = calculateAssists(players);
      setPlayerGoals(goalsList);
      setTeamGoals(goalByTeam);
      setAssistsByTeam(assistsByTeam);
      setAssists(assistsList);
    };

    loadSummary();
  }, []);

  return { teamGoals, playerGoals, assistsByTeam, assists };
}

