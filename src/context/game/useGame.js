import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import { useAlert } from "../alert/AlertContext";
import { useUser } from "../user/userContext";
import _ from "lodash";
import { useFpsTracker } from './useFpsTracker';

export function useGame(id, addGoal) {
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
    const storedName = sessionStorage.getItem("usarname") || `Guest${Math.floor(Math.random() * 10000000)}`;
    const finalName = playerData?.username || storedName;
    sessionStorage.setItem("usarname", finalName);
    return finalName;
  }, [playerData?.username]);

  const playerId = useMemo(() => {
    return playerData?.id || `guest-${Math.floor(Math.random() * 10000000)}`;
  }, [playerData?.id]);

  const connectToBroker = useCallback(() => {
    const brokerUrl = process.env.REACT_APP_API_GAME_URL || process.env.REACT_APP_API_GAME_URL_LOCAL || "wss://piggame.duckdns.org:8080/pigball";

    const client = new Client({
      brokerURL: brokerUrl,
      onConnect: () => {
        isConnected.current = true;

        client.subscribe(`/topic/players/${id}`, (message) => {
          const body = JSON.parse(message.body);
          setPlayers(prev => _.isEqual(prev, body.players) ? prev : body.players);
          setGameState(body);
          if (body.startTime !== null) setGameStarted(true);
        });

        client.publish({
          destination: `/app/join/${id}`,
          body: JSON.stringify({ name: playerName, id: playerId }),
        });

        client.subscribe(`/topic/started/${id}`, (message) => {
          setGameState(JSON.parse(message.body));
          setGameStarted(true);
        });

        client.subscribe(`/topic/play/${id}`, (message) => {
          const data = JSON.parse(message.body);
          setPlayers(prev => _.isEqual(prev, data.players) ? prev : data.players);
          setBall(prev => _.isEqual(prev, data.ball) ? prev : data.ball);

          messageCountRef.current += 1;
          if (messageCountRef.current >= FRAME_RATE) {
            signalFramesReached();
            messageCountRef.current = 0;
          }
        });

        client.subscribe(`/topic/goal/${id}`, (message) => {
          const newState = JSON.parse(message.body);
          setGameState(prev => _.isEqual(prev, newState) ? prev : newState);
          addGoal(newState)
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.body);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
      },
      onWebSocketClose: () => {
        console.warn("WebSocket closed");
      }
    });

    client.activate();
    stompClient.current = client;
  }, [id, playerName, playerId, signalFramesReached, addGoal]);


  const handleStartGame = useCallback(() => {
    if (stompClient.current?.connected) {
      stompClient.current.publish({ destination: `/app/start/${id}` });
    } else {
      showAlert("Not connected to broker, game could not be started.", "error");
    }
  }, [id, showAlert]);

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
  };
}



