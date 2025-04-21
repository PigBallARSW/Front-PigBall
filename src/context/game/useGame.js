import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import { useAlert } from "../alert/AlertContext";
import { useUser } from "../user/userContext";

export function useGame(id) {
  const { showAlert } = useAlert();
  const playerStats = useUser();
  const [players, setPlayers] = useState([]);
  const [ball, setBall] = useState(null);
  const [gameState, setGameState] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const stompClient = useRef(null);
  const FRAME_RATE = 60;
  const navigate = useNavigate();
  const playersRef = useRef([]);
  const isConnected = useRef(false);

  const playerName = useMemo(() => {
    const storedName = sessionStorage.getItem("username");
    return playerStats?.username || storedName || `Guest${Math.floor(Math.random() * 10000000)}`;
  }, [playerStats?.username]);

  const handleStartGame = useCallback(() => {
    if (stompClient.current?.connected) {
      stompClient.current.publish({
        destination: `/app/start/${id}`
      });
    } else {
      showAlert("Not connected to broker, game could not be started.", "error");
    }
  }, [id, showAlert]);

  const handleLeaveGame = useCallback(() => {
    if (stompClient.current?.connected) {
      stompClient.current.publish({
        destination: `/app/leave/${id}`
      });
      navigate("/homepage/lobby");
      showAlert("You have left the room", "info");
    } else {
      showAlert("Not connected to broker, could not quit game.", "error");
    }
  }, [id, navigate, showAlert]);

  const handleMovePlayer = useCallback((movementState) => {
    if (!stompClient.current?.connected) {
      showAlert("Not connected to broker", "error");
      return;
    }

    const intervalId = setInterval(() => {
      if (stompClient.current?.connected) {
        stompClient.current.publish({
          destination: `/app/play/${id}`,
          body: JSON.stringify({
            player: playerName,
            dx: movementState.current.right - movementState.current.left,
            dy: movementState.current.down - movementState.current.up,
            isKicking: movementState.current.isKicking,
          }),
        });
      } else {
        clearInterval(intervalId);
      }
    }, 1000 / FRAME_RATE);

    return () => clearInterval(intervalId);
  }, [id, playerName, showAlert]);

  useEffect(() => {
    if (isConnected.current) return;

    const brokerUrl = process.env.REACT_APP_API_GAME_URL || 
                     process.env.REACT_APP_API_GAME_URL_LOCAL || 
                     "wss://backendeci.duckdns.org:8080/pigball";

    const client = new Client({
      brokerURL: brokerUrl,
      onConnect: () => {
        isConnected.current = true;

        // Join game first
        client.publish({
          destination: `/app/join/${id}`,
          body: JSON.stringify({ name: playerName }),
        });

        // Set up subscriptions
        const playersSub = client.subscribe(`/topic/players/${id}`, (message) => {
          playersRef.current = JSON.parse(message.body);
          setPlayers(prevPlayers => 
            JSON.stringify(prevPlayers) === JSON.stringify(playersRef.current) 
              ? prevPlayers 
              : [...playersRef.current]
          );
        });

        const startedSub = client.subscribe(`/topic/started/${id}`, (message) => {
          const newState = JSON.parse(message.body);
          setGameState(prev => JSON.stringify(prev) === JSON.stringify(newState) ? prev : newState);
          setGameStarted(true);
        });

        const playSub = client.subscribe(`/topic/play/${id}`, (message) => {
          const data = JSON.parse(message.body);
          setPlayers(prev => JSON.stringify(prev) === JSON.stringify(data.players) ? prev : data.players);
          setBall(prev => JSON.stringify(prev) === JSON.stringify(data.ball) ? prev : data.ball);
        });

        const goalSub = client.subscribe(`/topic/goal/${id}`, (message) => {
          const newState = JSON.parse(message.body);
          setGameState(prev => JSON.stringify(prev) === JSON.stringify(newState) ? prev : newState);
        });

        return () => {
          playersSub.unsubscribe();
          startedSub.unsubscribe();
          playSub.unsubscribe();
          goalSub.unsubscribe();
        };
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
  }, [id, playerName]); 

  return { 
    players, 
    ball, 
    gameStarted, 
    gameState, 
    handleStartGame, 
    handleLeaveGame, 
    handleMovePlayer 
  };
}