import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerStats } from "../../components/user/playerStats";
import { Client } from "@stomp/stompjs";
import { useAlert } from "../alert/AlertContext";

export function useGame (id) {
  const {showAlert} = useAlert();
  const playerStats = usePlayerStats();
  const [players, setPlayers] = useState([]);
  const [ball, setBall] = useState(null);
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
      showAlert("Not connected to broker, game could not be started.","error");
    }
  };
  const handleLeaveGame = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: `/app/leave/${id}`
      });
      navigate("/homepage/lobby");
      showAlert("you have left the room", "info");
    } else {
      showAlert("Not connected to broker, could not quit game.","error");
    }
  };
  
  const handleMovePlayer = useCallback((movementState) => {
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
      showAlert("Not connected to broker, could not quit game.","error");
    }
  },[id, playerStats.name, showAlert]);

  const isConnected = useRef(false);

useEffect(() => {
  if (isConnected.current) return; 

  let playerName = playerStats.name || "Player" + Math.floor(Math.random() * 1000);
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
        setBall(JSON.parse(message.body).ball);
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

return{players, ball, gameStarted, handleStartGame, handleLeaveGame, handleMovePlayer, playerStats}

}