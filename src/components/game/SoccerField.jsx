import { useCallback } from "react";
import { useDraw } from "../../context/game/useDraw";
import { useMoveGame } from "../../context/game/useMoveGame";

export const SoccerField = ({ players, ball, movePlayer }) => {
  useMoveGame(movePlayer);
  const drawSoccerField = useCallback((ctx, fieldWidth, fieldHeight, margin, goalWidth, players, ball) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    // Posicionar la cancha en el centro del canvas
    const fieldX = margin + goalWidth;
    const fieldY = margin;
  
    // Colores
    const outerAreaColor = "#2d6a31";
    const fieldColorDark = "#3a8c40";
    const fieldColorLight = "#4CAF50";
    const lineColor = "#FFFFFF";
    const goalColor = "#FFFFFF";
    const goalNetColor = "#F5F5F5";
  
    // Fondo del área total del canvas
    ctx.fillStyle = outerAreaColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    // Dibujar patrones de césped dentro de la cancha
    const stripeWidth = fieldWidth / 8; // 8 franjas de pasto
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? fieldColorLight : fieldColorDark;
      ctx.fillRect(fieldX + i * stripeWidth, fieldY, stripeWidth, fieldHeight);
    }
  
    // Líneas del campo
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(fieldX, fieldY, fieldWidth, fieldHeight);
  
    // Línea central
    ctx.beginPath();
    ctx.moveTo(fieldX + fieldWidth / 2, fieldY);
    ctx.lineTo(fieldX + fieldWidth / 2, fieldY + fieldHeight);
    ctx.stroke();
  
    // Círculo central
    const centerX = fieldX + fieldWidth / 2;
    const centerY = fieldY + fieldHeight / 2;
    const centerCircleRadius = 90;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerCircleRadius, 0, Math.PI * 2);
    ctx.stroke();
  
    // Punto central
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
  
    // Áreas de penalti
    const penaltyAreaWidth = fieldWidth * 0.16;
    const penaltyAreaHeight = fieldHeight * 0.44;
    const penaltyAreaY = fieldY + (fieldHeight - penaltyAreaHeight) / 2;
  
    // Izquierda
    ctx.strokeRect(fieldX, penaltyAreaY, penaltyAreaWidth, penaltyAreaHeight);
    // Derecha
    ctx.strokeRect(fieldX + fieldWidth - penaltyAreaWidth, penaltyAreaY, penaltyAreaWidth, penaltyAreaHeight);
  
    // Área chica dentro del área de penalti
    const goalAreaWidth = fieldWidth * 0.06;
    const goalAreaHeight = fieldHeight * 0.22;
    const goalAreaY = fieldY + (fieldHeight - goalAreaHeight) / 2;
  
    // Izquierda
    ctx.strokeRect(fieldX, goalAreaY, goalAreaWidth, goalAreaHeight);
    // Derecha
    ctx.strokeRect(fieldX + fieldWidth - goalAreaWidth, goalAreaY, goalAreaWidth, goalAreaHeight);
  
    // Dibujar los jugadores DENTRO del área del campo
    players.forEach(player => {
      const playerRadius = 20;
      const x = fieldX + player.x;
      const y = fieldY + player.y;
  
      ctx.beginPath();
      ctx.arc(x, y, playerRadius, 0, Math.PI * 2);
      ctx.fillStyle = player.team === 0 ? "blue" : "red";
  
      // sombra
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
  
      ctx.fill();
      if (player.kicking) {
        ctx.strokeStyle = "white";
      }
      else{
        ctx.strokeStyle = "black";
      }
      ctx.lineWidth = 2;
      ctx.stroke();
  
      // limpiar sombra
      ctx.shadowColor = "transparent";
  
      // texto (nombre del jugador)
      ctx.font = "12px Arial";
      ctx.fillStyle = player.team === 0 ? "blue" : "red";
      ctx.textAlign = "center";
      ctx.fillText(player.name, x, y + playerRadius+12); 
  });
  

    // Dibujar la pelota
    if (ball === undefined) {

    } else {
      const ballRadius = 10;
      ctx.beginPath();
      ctx.arc(fieldX + ball.x, fieldY + ball.y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
    }
    

    // sombra
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    // limpiar sombra
    ctx.shadowColor = "transparent";
    
    // Dibujar los arcos fuera de la cancha
    ctx.strokeStyle = goalColor;
    ctx.lineWidth = 3;
  
    const goalHeight = fieldHeight * 0.18;
    const goalY = fieldY + (fieldHeight - goalHeight) / 2;
  
    // Arco izquierdo
    ctx.strokeRect(fieldX - goalWidth, goalY, goalWidth, goalHeight);
  
    // Arco derecho
    ctx.strokeRect(fieldX + fieldWidth, goalY, goalWidth, goalHeight);
  
    // Dibujar la cuadrícula de la red del arco
    const netRows = 6;
    const netCols = 4;
    const netSpacingY = goalHeight / netRows;
    const netSpacingX = goalWidth / netCols;
  
    ctx.strokeStyle = goalNetColor;
    ctx.lineWidth = 0.5;
  
    // Izquierda
    for (let i = 1; i < netRows; i++) {
      ctx.beginPath();
      ctx.moveTo(fieldX - goalWidth, goalY + i * netSpacingY);
      ctx.lineTo(fieldX, goalY + i * netSpacingY);
      ctx.stroke();
    }
    for (let i = 1; i < netCols; i++) {
      ctx.beginPath();
      ctx.moveTo(fieldX - i * netSpacingX, goalY);
      ctx.lineTo(fieldX - i * netSpacingX, goalY + goalHeight);
      ctx.stroke();
    }
  
    // Derecha
    for (let i = 1; i < netRows; i++) {
      ctx.beginPath();
      ctx.moveTo(fieldX + fieldWidth, goalY + i * netSpacingY);
      ctx.lineTo(fieldX + fieldWidth + goalWidth, goalY + i * netSpacingY);
      ctx.stroke();
    }
    for (let i = 1; i < netCols; i++) {
      ctx.beginPath();
      ctx.moveTo(fieldX + fieldWidth + i * netSpacingX, goalY);
      ctx.lineTo(fieldX + fieldWidth + i * netSpacingX, goalY + goalHeight);
      ctx.stroke();
    }
  },[]);
  const{canvasRef} = useDraw(players,ball,drawSoccerField);

  return (
      <canvas ref={canvasRef} className="block" />
  );
};










