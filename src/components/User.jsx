import React, { useState } from "react";
import '../styles/game.css';
import { Client } from "@stomp/stompjs";
  
 
export const User = () => {
    const movementState = {
        up: false,
        down: false,
        left: false,
        right: false
      };
       
      // Actualiza el estado cuando se presiona una tecla
      document.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "ArrowUp":
            movementState.up = true;
            break;
          case "ArrowDown":
            movementState.down = true;
            break;
          case "ArrowLeft":
            movementState.left = true;
            break;
          case "ArrowRight":
            movementState.right = true;
            break;
          default:
            break;
        }
      });
       
      // Actualiza el estado cuando se suelta una tecla
      document.addEventListener("keyup", (e) => {
        switch (e.key) {
          case "ArrowUp":
            movementState.up = false;
            break;
          case "ArrowDown":
            movementState.down = false;
            break;
          case "ArrowLeft":
            movementState.left = false;
            break;
          case "ArrowRight":
            movementState.right = false;
            break;
          default:
            break;
        }
      });
       
    // Configurar STOMP sobre WebSockets
const stompClient = new Client({
    brokerURL: "ws://localhost:8080/game", // Asegúrate de que el servidor esté corriendo
    reconnectDelay: 5000, // Reconectar en caso de desconexión
  });
  
  // Manejar conexión STOMP
  stompClient.onConnect = (frame) => {
    console.log("Conectado al WebSocket STOMP");
    const div = document.getElementById("circleGame");
    // Suscribirse para recibir la nueva posición
    stompClient.subscribe("/topic/positions", (message) => {
      var posiciones = JSON.parse(message.body);
                // Actualiza las posiciones de los cuadrados en el frontend
                actualizarPosiciones(posiciones);
    });
    

    function actualizarPosiciones(posiciones) {
      for (var key in posiciones) {
          if (posiciones.hasOwnProperty(key)) {
              let divCircle = document.getElementById(key);
              if (divCircle === null){
                divCircle = document.createElement(div);
                divCircle.className = "circleGame";
                let div = document.getElementById("game");
                div.appendChild(divCircle);
              }
              var posicion = posiciones[key];
              divCircle.style.top = posicion.y + "px";
              divCircle.style.left = posicion.x + "px"; 
          }
      }
  }
  
    // Enviar estado de movimiento cada 50ms
    setInterval(() => {
      if (stompClient.active) {
        stompClient.publish({
          destination: "/app/move",
          body: JSON.stringify(movementState),
        });
      }
    }, 50);
  };
  // Conectar el cliente
  stompClient.activate();

    return (
        <div id="game">
        </div>
    )
}