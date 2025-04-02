import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { usePlayerStats } from "../../components/user/playerStats";
import { SoccerField } from "../../components/game/SoccerField";
import { useNavigate, useParams } from "react-router-dom";
import { WaitingRoom } from "../../components/lobby/WaitingRoom";
import { useGame } from "../../context/game/useGame";
  
export const MainGame = () => {
  const { id } = useParams();
  const {players, gameStarted, handleStartGame, handleLeaveGame,handleMovePlayer, playerStats} = useGame(id);
  return (
    <main>
      {gameStarted ? (
        <SoccerField players={players}  movePlayer ={handleMovePlayer}/>
      ) : (
        <WaitingRoom currentUser = {playerStats.name} id={id} onStartGame={handleStartGame} players={players} leaveRoom={handleLeaveGame}/>
      )}
    </main>
  );
};

