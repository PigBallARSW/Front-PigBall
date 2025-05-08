import {create} from "zustand";

export const useGoalPlayers = create((set) => ({
  goalScorers: [],

  addOrUpdateScorer: (player) =>
    set((state) => {
      const existingPlayer = state.goalScorers.find((p) => p.id === player.id);
      if (existingPlayer) {
        return {
          goalScorers: state.goalScorers.map((p) =>
            p.id === player.id ? { ...p, goal: p.goal + 1 } : p
          ),
        };
      } else {
        return {
          goalScorers: [...state.goalScorers, { ...player, goal: 1 }],
        };
      }
    }),

  resetGoals: () => set({ goalScorers: [] }),
}));


