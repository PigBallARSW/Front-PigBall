import { Graphics, Stage } from "@pixi/react";
import React, { useCallback, useEffect, useState } from "react";
import { ContainerField } from "./ContainerField";
import { Player } from "./Player";

const FieldDrawComponent = ({ fieldX, fieldY, GOAL_WIDTH, borderX,borderY }) => {
    const draw = useCallback((g) => {
        g.clear();
        const fieldWidth = borderX || 1200;
        const fieldHeight = borderY || 900;

        const fieldColorDark = 0x559243;
        const fieldColorLight = 0x6dbe55;
        const lineColor = 0xFFFFFF;
        const goalColor = 0xFFFFFF;
        const goalNetColor = 0xF5F5F5;
    
    
        // Dibujar franjas de césped
        const stripeWidth = fieldWidth / 8;
        for (let i = 0; i < 8; i++) {
            g.beginFill(i % 2 === 0 ? fieldColorLight : fieldColorDark,0.3);
            g.drawRect(fieldX + i * stripeWidth, fieldY, stripeWidth, fieldHeight);
            g.endFill();
        }
    
        // Líneas del campo
        g.lineStyle(2, lineColor);
        g.drawRect(fieldX, fieldY, fieldWidth, fieldHeight);
    
        // Línea central
        g.moveTo(fieldX + fieldWidth / 2, fieldY);
        g.lineTo(fieldX + fieldWidth / 2, fieldY + fieldHeight);
    
        // Círculo central
        const centerX = fieldX + fieldWidth / 2;
        const centerY = fieldY + fieldHeight / 2;
        const centerCircleRadius = 90;
        g.drawCircle(centerX, centerY, centerCircleRadius);
    
        // Punto central
        g.beginFill(lineColor);
        g.drawCircle(centerX, centerY, 3);
        g.endFill();
    
        // Áreas de penalti
        const penaltyAreaWidth = fieldWidth * 0.16;
        const penaltyAreaHeight = fieldHeight * 0.44;
        const penaltyAreaY = fieldY + (fieldHeight - penaltyAreaHeight) / 2;
    
        // Izquierda
        g.lineStyle(2, lineColor);
        g.drawRect(fieldX, penaltyAreaY, penaltyAreaWidth, penaltyAreaHeight);
        // Derecha
        g.drawRect(fieldX + fieldWidth - penaltyAreaWidth, penaltyAreaY, penaltyAreaWidth, penaltyAreaHeight);
    
        // Áreas chicas
        const goalAreaWidth = fieldWidth * 0.06;
        const goalAreaHeight = fieldHeight * 0.22;
        const goalAreaY = fieldY + (fieldHeight - goalAreaHeight) / 2;
    
        // Izquierda
        g.drawRect(fieldX, goalAreaY, goalAreaWidth, goalAreaHeight);
        // Derecha
        g.drawRect(fieldX + fieldWidth - goalAreaWidth, goalAreaY, goalAreaWidth, goalAreaHeight);
    
        // Arcos (fuera de la cancha)
        const goalHeight = fieldHeight * 0.18;
        const goalY = fieldY + (fieldHeight - goalHeight) / 2;
    
        g.lineStyle(3, goalColor);
    
        // Arco izquierdo
        g.drawRect(fieldX - GOAL_WIDTH, goalY, GOAL_WIDTH, goalHeight);
    
        // Arco derecho
        g.drawRect(fieldX + fieldWidth, goalY, GOAL_WIDTH, goalHeight);
    
        // Redes de los arcos
        const netRows = 6;
        const netCols = 4;
        const netSpacingY = goalHeight / netRows;
        const netSpacingX = GOAL_WIDTH / netCols;
    
        g.lineStyle(0.5, goalNetColor);
    
        // Red izquierda
        for (let i = 1; i < netRows; i++) {
            g.moveTo(fieldX - GOAL_WIDTH, goalY + i * netSpacingY);
            g.lineTo(fieldX, goalY + i * netSpacingY);
        }
        for (let i = 1; i < netCols; i++) {
            g.moveTo(fieldX - i * netSpacingX, goalY);
            g.lineTo(fieldX - i * netSpacingX, goalY + goalHeight);
        }
    
        // Red derecha
        for (let i = 1; i < netRows; i++) {
            g.moveTo(fieldX + fieldWidth, goalY + i * netSpacingY);
            g.lineTo(fieldX + fieldWidth + GOAL_WIDTH, goalY + i * netSpacingY);
        }
        for (let i = 1; i < netCols; i++) {
            g.moveTo(fieldX + fieldWidth + i * netSpacingX, goalY);
            g.lineTo(fieldX + fieldWidth + i * netSpacingX, goalY + goalHeight);
        }
    },[borderX, borderY]);
       
    return <Graphics draw={draw} />;
};
export const FieldDraw = React.memo(FieldDrawComponent);