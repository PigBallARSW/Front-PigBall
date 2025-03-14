import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";

const Game = () => {
  const [players, setPlayers] = useState([]);
  const stompClient = useRef(null);
  const movementState = useRef({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  const FRAME_RATE = 60; // frames por segundo

  // Registrar eventos de teclado para actualizar movementState
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          movementState.current.up = true;
          break;
        case "ArrowDown":
          movementState.current.down = true;
          break;
        case "ArrowLeft":
          movementState.current.left = true;
          break;
        case "ArrowRight":
          movementState.current.right = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowUp":
          movementState.current.up = false;
          break;
        case "ArrowDown":
          movementState.current.down = false;
          break;
        case "ArrowLeft":
          movementState.current.left = false;
          break;
        case "ArrowRight":
          movementState.current.right = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Conectar al STOMP broker al montar el componente
  useEffect(() => {
    const playerName = window.prompt("Ingrese su nombre:");
    if (!playerName) {
      alert("Debe ingresar un nombre para conectarse.");
      return;
    }

    // Obtiene el broker URL desde la variable de entorno o usa un valor por defecto
    const brokerUrl =
      process.env.REACT_APP_BROKER_URL || "ws://localhost:8080/pigball";
    console.log("Conectando al broker:", brokerUrl);
    const client = new Client({
      brokerURL: brokerUrl,
      onConnect: (frame) => {
        console.log("Conectado:", frame);

        // Suscribirse a actualizaciones del juego
        client.subscribe("/topic/play", (message) => {
          const gameData = JSON.parse(message.body);
          // Se actualizan las posiciones de los jugadores
          setPlayers(gameData.players);
        });

        // Suscribirse para saber cuando un jugador se une
        client.subscribe("/topic/playerJoined", (message) => {
          const playersList = JSON.parse(message.body);
          console.log("Lista de jugadores actualizada:", playersList);
          setPlayers(playersList);
        });

        // Enviar el nombre del jugador al backend
        client.publish({
          destination: "/app/join",
          body: JSON.stringify({ 
            name: playerName, 
            x: 0,
            y: 0
          }),
        });

        // Enviar el estado de movimiento periódicamente
        setInterval(() => {
          if (client.active) {
            client.publish({
              destination: "/app/play",
              body: JSON.stringify({
                player: playerName,
                dx: movementState.current.right - movementState.current.left,
                dy: movementState.current.down - movementState.current.up,
              }),
            });
          }
        }, 1000 / FRAME_RATE);
      },
      onStompError: (frame) => {
        console.error("Error del broker: " + frame.headers["message"]);
        console.error("Detalles adicionales: " + frame.body);
      },
      onWebSocketError: (error) => {
        console.error("Error en el websocket:", error);
      },
    });

    client.activate();
    stompClient.current = client;

    // Desconectar al desmontar el componente
    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, []);

  return (
    <div>
      <h1>Juego en vivo</h1>
      {/* El tablero se muestra con posición relativa */}
      <div
        id="board"
        style={{
          position: "relative",
          width: "800px",
          height: "600px",
          border: "1px solid #000",
          margin: "0 auto",
        }}
      >
        {players.map((player) => (
          <div
            key={player.name}
            id={`${player.name}_player`}
            style={{
              position: "absolute",
              top: player.y,
              left: player.x,
              width: "20px",
              height: "20px",
              backgroundColor: "red",
              borderRadius: "50%",
              textAlign: "center",
              lineHeight: "20px",
              color: "#fff",
              fontSize: "10px",
            }}
          >
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
