import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WaitingRoom } from "../../components/lobby/WaitingRoom";
import { useGame } from "../../context/game/useGame";
import GameContainer from "../../components/game/GameContainer";
import { useLobbyService } from "../../Modules/useLobbyService";
  
export const MainGame = () => {
  const { id } = useParams();
  const {getAGame} = useLobbyService();
  const [roomData, setRoomData] = useState({
    lobbyName: "",
    creatorName: "",
    maxPlayers: 0,
    privateLobby: false,
    creationTime: 0,
    players: []
  });
  const {players, ball, gameStarted, gameState, handleStartGame, handleLeaveGame,handleMovePlayer} = useGame(id);
  const loadGame = useCallback(async () => {
    if(id){
      const func = (response) => {
        if(response){
          setRoomData(response);
          if(response.status === "IN_PROGRESS" || response.status === "IN_PROGRESS_FULL"){
            handleStartGame();
          }
        }
      }
      await getAGame(func,id);
    }
  },[getAGame]);

  useEffect(() => {
    loadGame();
  },[loadGame]);

  return (
    <main>
      {gameStarted ? (
        <GameContainer players={players} ball={ball} movePlayer ={handleMovePlayer} gameState={gameState}/>
      ) : (
        <WaitingRoom  id={id} onStartGame={handleStartGame} players={players} leaveRoom={handleLeaveGame} roomData={roomData}/>
      )}
    </main>
  );
};

