import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WaitingRoom } from "../../components/lobby/WaitingRoom";
import { useGame } from "../../context/game/useGame";
import {GameContainer} from "../../components/game/GameContainer";
import { GoalAnimation } from "../../components/game/GoalAnimation";
import { useGoal } from "../../context/game/useGoal";
import LoadResponse from "../../components/Load/LoadResponse";
import LoadingGame from "../../components/Load/LoadingGame";
import { useAlert } from "../../context/alert/AlertContext";
  
export const MainGame = () => {
  const navigate = useNavigate()
  const { id } = useParams();
   const [loading, setLoading] = useState(false)
  const{showAlert} = useAlert();
  const { goalAnimation, playersGoal, addGoal, closeGoalAnimation } = useGoal();
  const {players, ball, gameStarted, gameState, fps, fpsHistory, handleStartGame, handleLeaveGame,handleMovePlayer} = useGame(id, addGoal, setLoading);


  const startGame = () => {
    if (players.length > 1) {
      setLoading(true)
      handleStartGame();
    } else {
      showAlert("There must be at least two members","warning");
    }
  }

  const closePage = () => {
      navigate("/homepage/lobby")
  }

  if(loading){
    return <LoadingGame />
  }

  if(!gameState){
    return <LoadResponse open={true} message="Loading room..." onClose={closePage}/>
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
        <WaitingRoom  onStartGame={startGame} players={players} leaveRoom={handleLeaveGame} roomData={gameState}/>
      )
    }
    </>
  );
};

