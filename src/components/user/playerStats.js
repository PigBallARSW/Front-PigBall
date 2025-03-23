import { useMsal } from "@azure/msal-react";

export const usePlayerStats = () => {
    const { accounts } = useMsal();
    const playerName = accounts.length > 0 ? accounts[0].name : "Player"; 
    return {
        name: playerName,
        matchesPlayed: 120,
        matchesWon: 78,
        matchesLost: 42,
        score: 2340,
        level: 15,
        winRate: 65,
    };
};
