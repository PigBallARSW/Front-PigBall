import React, { useState, useEffect, useRef } from "react"
import {  Box, useMediaQuery, useTheme } from "@mui/material"
import {Scoreboard} from "./Scoreboard"
import {useLobbyService } from "../../Modules/useLobbyService";
import {GoalAnimation} from "./GoalAnimation"
import { useGoal } from "../../context/game/useGoal"
import Summary from "./Summary"
import {TeamDetails} from "./TeamDetails"
import { Field } from "./draw/Field"
//import FPSMeter from "../fps/FPSMeter";
import FPSMeter from "../fps/FPSCounter";

export const GameContainer = React.memo(function GameContainer({ id, players, ball, movePlayer, gameState, leaveRoom, fps, fpsHistory }) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const {finishRoom} = useLobbyService();
  const [hasFinished, setHasFinished] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const fieldWrapperRef = useRef();


  useEffect(() => {
    if (!gameState?.creationTime) return
    if (!gameState?.creationTime || hasFinished) return;
    const startTime = new Date(gameState.startTime)
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = Math.floor((now - startTime.getTime()) / 1000) 
      setElapsedTime(diff);
      if (diff >= 300) { 
        setElapsedTime(300); 
        clearInterval(interval); 
        setShowGameOver(true);
        setHasFinished(true);
      } else {
        setElapsedTime(diff);
      }
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
      {!isMobile &&
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
        <FPSMeter fps={fps} fpsHistory={fpsHistory} />
    </Box>}

    <Box
    ref={fieldWrapperRef}
    sx={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      backgroundColor: '#67a454'
    }}
  >
    <Field
      wrapperRef={fieldWrapperRef}
      players={players}
      ball={ball}
      movePlayer={movePlayer}
      borderX={gameState.borderX}
      borderY={gameState.borderY}
    />
  </Box>

    {showGameOver && (
      <Summary gameState={gameState} onExit={exitGame} onPlayAgain={playAgain} />
    )}
    </>

  )
})
