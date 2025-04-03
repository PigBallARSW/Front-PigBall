import { useMsal } from "@azure/msal-react";

export const usePlayerStats = () => {
    const { accounts } = useMsal();
    const playerName = accounts.length > 0 ? accounts[0].name : sessionStorage.getItem('guestPlayerName') || (() => {
        const randomName = "Player" + Math.floor(Math.random() * 1000000);
        sessionStorage.setItem('guestPlayerName', randomName);
        return randomName;
    })();
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
