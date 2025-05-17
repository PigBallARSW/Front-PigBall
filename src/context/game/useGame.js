import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import { useAlert } from "../alert/AlertContext";
import { useUser } from "../user/userContext";
import { useFpsTracker } from './useFpsTracker';
import {
  handlePlayersMessage,
  handleStartedMessage,
  handlePlayMessage,
  handleGoalMessage,
  subscribeToTopics
} from "../../utils/gameBrokerHandlers"

export function useGame(id, addGoal, setLoading) {
  const { showAlert } = useAlert();
  const { playerData } = useUser();
  const [players, setPlayers] = useState([]);
  const [ball, setBall] = useState(null);
  const [gameState, setGameState] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const stompClient = useRef(null);
  const isConnected = useRef(false);
  const navigate = useNavigate();
  const messageCountRef = useRef(0);
  const FRAME_RATE = 60;
  const { signalFramesReached, fps, fpsHistory } = useFpsTracker();

  const playerName = useMemo(() => {
    const finalName = playerData?.username;
    sessionStorage.setItem("usarname", playerData?.username);
    return finalName;
  }, [playerData?.username]);

  const playerId = useMemo(() => {
    return playerData?.id || `guest-${Math.floor(Math.random() * 10000000)}`;
  }, [playerData?.id]);


  const connectToBroker = useCallback(() => {
    const brokerUrl =
      process.env.REACT_APP_API_GAME_URL ||
      process.env.REACT_APP_API_GAME_URL_LOCAL ||
      "wss://www.eci-pigball.online/pigball";

    const client = new Client({
      brokerURL: brokerUrl,
      onConnect: () => {
      isConnected.current = true;
      client.publish({
          destination: `/app/join/${id}`,
          body: JSON.stringify({ name: playerName, id: playerId }),
        });
        
        const handlers = {
          players: handlePlayersMessage(setGameState, setGameStarted),
          started: handleStartedMessage(setGameState, setGameStarted, setLoading),
          play: handlePlayMessage(setPlayers, setBall, messageCountRef, signalFramesReached, FRAME_RATE),
          goal: handleGoalMessage(setGameState, addGoal),
        };


        subscribeToTopics(client, id, handlers);
      },
      onStompError: (frame) => console.error("STOMP error:", frame.body),
      onWebSocketError: (error) => console.error("WebSocket error:", error),
      onWebSocketClose: () => console.warn("WebSocket closed")
    });

    client.activate();
    stompClient.current = client;
  }, [id, playerName, playerId, signalFramesReached, addGoal, setLoading]);

  const handleStartGame = useCallback(() => {
    setLoading(true);
    if (stompClient.current?.connected) {
      stompClient.current.publish({ destination: `/app/start/${id}` });
    } else {
      showAlert("Not connected to broker, game could not be started.", "error");
    }
  }, [id, showAlert, setLoading]);

  const handleLeaveGame = useCallback(() => {
    if (stompClient.current?.connected) {
      stompClient.current.publish({ destination: `/app/leave/${id}` });
    }
    navigate("/homepage/lobby");
    showAlert("You have left the room", "info");
  }, [id, navigate, showAlert]);

  const handleMovePlayer = useCallback((movementState) => {
    if (!stompClient.current?.connected) {
      showAlert("Not connected to broker", "error");
      return () => {};
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
      }
    }, 1000 / FRAME_RATE);

    return () => clearInterval(intervalId);
  }, [id, playerName, showAlert]);

  useEffect(() => {
    connectToBroker();
    return () => {
      isConnected.current = false;
      stompClient.current?.deactivate();
    };
  }, [connectToBroker]);

  return {
    players,
    ball,
    gameStarted,
    gameState,
    fps,
    fpsHistory,
    handleStartGame,
    handleLeaveGame,
    handleMovePlayer,
    selectedStyle: gameState?.style,
  };
}




