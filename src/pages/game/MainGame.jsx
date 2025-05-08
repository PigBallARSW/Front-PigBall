import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { WaitingRoom } from "../../components/lobby/WaitingRoom";
import { useGame } from "../../context/game/useGame";
import {GameContainer} from "../../components/game/GameContainer";
import { GoalAnimation } from "../../components/game/GoalAnimation";
import { useGoal } from "../../context/game/useGoal";
  
export const MainGame = () => {
  const { id } = useParams();
  const { goalAnimation, playersGoal, addGoal, closeGoalAnimation } = useGoal();
  
  const {players, ball, gameStarted, gameState, fps, fpsHistory, handleStartGame, handleLeaveGame,handleMovePlayer} = useGame(id, addGoal);
  
  if(!gameState){
    return <p>Cargando...</p>
  }
  return (
    <>
      {gameStarted ? (
        <>
        <GameContainer id={id} players={players} ball={ball} movePlayer ={handleMovePlayer} gameState={gameState} leaveRoom={handleLeaveGame} playersGoal={playersGoal} fps={fps} fpsHistory={fpsHistory}/>
        {goalAnimation.show && (
          <GoalAnimation player={goalAnimation.player} team={goalAnimation.team} onClose={closeGoalAnimation} goalState={goalAnimation.event}/>
        )}
        </>
      ) : (
        <WaitingRoom  onStartGame={handleStartGame} players={players} leaveRoom={handleLeaveGame} roomData={gameState}/>
      )}
    </>
  );
};

