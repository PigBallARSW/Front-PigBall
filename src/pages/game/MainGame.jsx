import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { usePlayerStats } from "../../components/user/playerStats";
import { SoccerField } from "../../components/game/SoccerField";
import { useNavigate, useParams } from "react-router-dom";
import { WaitingRoom } from "../../components/lobby/WaitingRoom";
  
export const MainGame = () => {
  const { id } = useParams();
  const playerStats = usePlayerStats();
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const stompClient = useRef(null);
  const FRAME_RATE = 60;
  const navigate = useNavigate();
  const playersRef = useRef([]);

  const handleStartGame = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: `/app/start/${id}`
      });
    } else {
      console.error("No conectado al broker, no se pudo iniciar el juego.");
    }
  };
  const handleLeaveGame = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: `/app/leave/${id}`
      });
  
      navigate("/homepage/lobby")
    } else {
      console.error("No conectado al broker, no se pudo dejar el juego.");
    }
  };
  
  const handleMovePlayer = (movementState) => {
    let playerName = playerStats.name || `Player${Math.floor(Math.random() * 1000)}`;
    if (stompClient.current && stompClient.current.connected) {
      const intervalId = setInterval(() => {
        if (stompClient.current && stompClient.current.connected) {
          stompClient.current.publish({
            destination: `/app/play/${id}`,
            body: JSON.stringify({
              player: playerName,
              dx: movementState.current.right - movementState.current.left,
              dy: movementState.current.down - movementState.current.up,
            }),
          });
        } 
        else {
          clearInterval(intervalId);
        }
      }, 1000 / FRAME_RATE);
    } else {
      console.error("No conectado al broker, no se pudo dejar el juego.");
    }
  };

  const isConnected = useRef(false);

useEffect(() => {
  if (isConnected.current) return; 

  let playerName = playerStats.name || `Player${Math.floor(Math.random() * 1000)}`;
  const brokerUrl = process.env.REACT_APP_API_GAME_URL || process.env.REACT_APP_API_GAME_URL_LOCAL || "wss://backendeci.duckdns.org:8080/pigball";
  const client = new Client({
    brokerURL: brokerUrl,
    onConnect: () => {
      isConnected.current = true; 

      client.subscribe(`/topic/players/${id}`, (message) => {
        playersRef.current = JSON.parse(message.body);
        setPlayers([...playersRef.current]); 
      });

      client.publish({
        destination: `/app/join/${id}`,
        body: JSON.stringify({ name: playerName }),
      });

      client.subscribe(`/topic/started/${id}`, (message) => {
        setGameStarted(true);
      });

      client.subscribe(`/topic/play/${id}`, (message) => {
        setPlayers(JSON.parse(message.body).players);
      });

    },
    onStompError: (frame) => console.error("Error STOMP:", frame.body),
    onWebSocketError: (error) => console.error("Error WebSocket:", error),
  });

  client.activate();
  stompClient.current = client;

  return () => {
    if (client.active) {
      client.deactivate();
      isConnected.current = false;
    }
  };
}, [id, playerStats.name]); 
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

