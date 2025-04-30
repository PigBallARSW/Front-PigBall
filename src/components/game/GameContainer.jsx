"use client"
import { useState, useEffect, useRef } from "react"
import {  Box, useTheme, useMediaQuery} from "@mui/material"
import Scoreboard from "./Scoreboard"
import { SoccerField } from "./SoccerField"
import {useLobbyService } from "../../Modules/useLobbyService";
import MobileControls from "./MobileControls"
import { useMoveGame } from "../../context/game/useMoveGame"
import GoalAnimation from "./GoalAnimation"
import { useGoal } from "../../context/game/useGoal"
import Summary from "./Summary"
import TeamDetails from "./TeamDetails"
import { Field } from "./draw/Field"

export default function GameContainer({ id, players, ball, movePlayer, gameState, leaveRoom }) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const {finishRoom} = useLobbyService();
  const [hasFinished, setHasFinished] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { goalAnimation, addGoal, closeGoalAnimation, playersGoal } = useGoal();
  /*const onMoveStart = (direction) => {
    const key = direction.replace("Arrow", "").toLowerCase();
    movementState.current[key] = true;
  };
  const onMoveEnd = (direction) => {
    const key = direction.replace("Arrow", "").toLowerCase();
    movementState.current[key] = false;
  };

  const onActionStart = () => {
    movementState.current.isKicking = true;
  };

  const onActionEnd = () => {
    movementState.current.isKicking = false;
  };*/
  useEffect(() => {
    if (gameState?.events?.length) {
      addGoal(gameState);
    }
  }, [gameState, addGoal,gameState?.events]);

  useEffect(() => {
    if (!gameState?.creationTime) return
    if (!gameState?.creationTime || hasFinished) return;
    const startTime = new Date(gameState.startTime)
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = Math.floor((now - startTime.getTime()) / 1000) 
      setElapsedTime(diff);
      /*if (diff >= 300) { 
        setElapsedTime(300); 
        clearInterval(interval); 
        setShowGameOver(true);
        setHasFinished(true);
      } else {
        setElapsedTime(diff);
      }*/
    }, 1000);
    return () => clearInterval(interval)
  }, [gameState?.creationTime, gameState?.startTime,id,hasFinished,finishRoom]);

  const formatGameTime = () => {
    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  const exitGame = () => {
    finishRoom(id);
    leaveRoom();
  }
  const playAgain = () => {
    alert("Denuevoo");
  }
  return (
    <>
      {goalAnimation.show && (
        <GoalAnimation player={goalAnimation.player} team={goalAnimation.team} onClose={closeGoalAnimation} goalState={goalAnimation.event}/>
      )}
        <Box 
        sx={{ 
          display: "flex", 
          alignItems: "flex-start", 
          width: "100%", 
          justifyContent: "space-between",
          position: "absolute",
          zIndex: 10,
          overflow: "hidden"
        }}
      >
        <Box sx={{width: "18%"}}>
          <TeamDetails gameState={gameState} playersGoal={playersGoal} />
        </Box>
        {/* Centro */}
        <Box 
          sx={{ 
            position: "absolute", 
            left: "50%", 
            transform: "translateX(-50%)",
            zIndex: 1
          }}
        >
          <Scoreboard
            blueScore={gameState?.teams.first || 0}
            redScore={gameState?.teams.second || 0}
            gameTime={formatGameTime()}
          />
        </Box>
        
        {/*<Box sx={{width: "15%"}}>
          <Spectators />
        </Box>*/}
    </Box>

      <Field
      players={players}
      ball={ball}
      movePlayer={movePlayer}
      borderX={gameState.borderX}
      borderY={gameState.borderY}
      />
    {showGameOver && (
      <Summary gameState={gameState} players={playersGoal} onExit={exitGame} onPlayAgain={playAgain} />
    )}
    {/*isMobile && <MobileControls onMoveStart={onMoveStart}
        onMoveEnd={onMoveEnd}
        onActionStart={onActionStart}
        onActionEnd={onActionEnd} />*/}
    </>

  )
}
