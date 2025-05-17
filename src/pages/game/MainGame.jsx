import React, {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WaitingRoom } from "../../components/lobby/WaitingRoom";
import { useGame } from "../../context/game/useGame";
import {GameContainer} from "../../components/game/GameContainer";
import { GoalAnimation } from "../../components/game/GoalAnimation";
import { useGoalPlayer } from "../../context/game/useGoalPlayer";
import {LoadResponse} from "../../components/Load/LoadResponse";
import LoadingGame from "../../components/Load/LoadingGame";
import { useAlert } from "../../context/alert/AlertContext";
import { playSound } from "../../utils/sounds";
  
export const MainGame = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const{showAlert} = useAlert();
  const { goalAnimation, addGoal, closeGoalAnimation } = useGoalPlayer();
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
  
  useEffect(() => {
    playSound("/sounds/stadium.mp3",0.01)
  },[gameState?.players.length])

  if(loading){
    return <LoadingGame /> 
  }

  if(!gameState){
    return <LoadResponse open={true} message="Loading room..." onClose={closePage}/>
  }


  return (
      gameStarted  ? (
        <>
        <GameContainer id={id} players={players} ball={ball} movePlayer ={handleMovePlayer} gameState={gameState} leaveRoom={handleLeaveGame} fps={fps} fpsHistory={fpsHistory}/>
        {goalAnimation.show && (
          <GoalAnimation player={goalAnimation.player} team={goalAnimation.team} onClose={closeGoalAnimation} goalState={goalAnimation.event}/>
        )}
        </>
      ) : (
        <WaitingRoom  onStartGame={startGame} leaveRoom={handleLeaveGame} roomData={gameState}/>
      )
  );
};

