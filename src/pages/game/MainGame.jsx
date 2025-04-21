import React from "react";
import { useParams } from "react-router-dom";
import { WaitingRoom } from "../../components/lobby/WaitingRoom";
import { useGame } from "../../context/game/useGame";
import GameContainer from "../../components/game/GameContainer";
  
export const MainGame = () => {
  const { id } = useParams();
  const {players, ball, gameStarted, gameState, handleStartGame, handleLeaveGame,handleMovePlayer} = useGame(id);
  return (
    <main>
      {gameStarted ? (
        <GameContainer id={id} players={players} ball={ball} movePlayer ={handleMovePlayer} gameState={gameState}/>
      ) : (
        <WaitingRoom  id={id} onStartGame={handleStartGame} players={players} leaveRoom={handleLeaveGame} gameState={gameState}/>
      )}
    </main>
  );
};

