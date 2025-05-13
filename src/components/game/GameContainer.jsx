import React, { useState, useEffect, useRef } from "react"
import {  Box, Fab, useMediaQuery, useTheme } from "@mui/material"
import {Scoreboard} from "./Scoreboard"
import {useLobbyService } from "../../Modules/useLobbyService";
import Summary from "./Summary"
import { Field } from "./draw/Field"
//import FPSMeter from "../fps/FPSMeter";
import FPSMeter from "../fps/FPSCounter";
import { useMoveGame } from "../../context/game/useMoveGame";
import { useIsTouchDevice } from "../../context/game/useIsTouchDevice";
import MobileControls from "./MobileControls";
import { ExitToApp } from "@mui/icons-material";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { LeaveDialog } from "../dialog/LeaveDialog";

export const GameContainer = React.memo(function GameContainer({ id, players, ball, movePlayer, gameState, leaveRoom, fps, fpsHistory }) {
  const isTouch = useIsTouchDevice();
  const [elapsedTime, setElapsedTime] = useState(0)
  const {finishRoom} = useLobbyService();
  const [hasFinished, setHasFinished] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const fieldWrapperRef = useRef();
  const {onMoveStart,onMoveEnd, onActionStart, onActionEnd} = useMoveGame(movePlayer);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const handleLeaveRoom = () => {
    setIsLeaveDialogOpen(false);
    leaveRoom();
  }
  const OpenLeaveRoom = () => {
    setIsLeaveDialogOpen(true);
  }

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
  return (
    <>
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        top: 8
      }}
    >
      <Scoreboard
        blueScore={gameState?.teams.first || 0}
        redScore={gameState?.teams.second || 0}
        gameTime={formatGameTime()}
      />
    </Box>
    <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
            zIndex: 20,
          }}
        >
          <Fab color="error" onClick={OpenLeaveRoom}
          sx={{
            width: {
              xs: 40,   
              sm: 48,   
              md: 56,   
            },
            height: {
              xs: 40,
              sm: 48,
              md: 56,
            },
            minHeight: "unset", 
          }}>
            <ExitToApp />
          </Fab>
          <Fab color="success"
          sx={{
            width: {
              xs: 40,   
              sm: 48,   
              md: 56,   
            },
            height: {
              xs: 40,
              sm: 48,
              md: 56,
            },
            minHeight: "unset", 
          }}>
            <VolumeOffIcon />
          </Fab>
        </Box>

    {!isMobile && 
        <Box
          sx={{
            position: "absolute",
            left: 8,
            zIndex: 20,
            bottom: isTouch ? "none" : 8,
            top: isTouch ? 8 : "none"
          }}
        >
          <FPSMeter fps={fps} fpsHistory={fpsHistory} showGraph={!isMobile} />
        </Box>
    }
 
    <Box
      ref={fieldWrapperRef}
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
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
      <Summary gameState={gameState} onExit={exitGame} />
    )}
    {isTouch && <MobileControls onMoveStart={onMoveStart} onMoveEnd={onMoveEnd} onActionStart={onActionStart} onActionEnd={onActionEnd} />}
    <LeaveDialog leaveRoom={handleLeaveRoom} isLeaveDialogOpen={isLeaveDialogOpen} setIsLeaveDialogOpen={setIsLeaveDialogOpen} />
    </>
  )
})
