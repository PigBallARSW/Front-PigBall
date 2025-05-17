import { Graphics } from "@pixi/react";
import React, { useCallback } from "react";
import PropTypes from 'prop-types';
import { useStyle } from "../../../context/style/styleContext";
import { MAPS } from "../../../utils/styles";

/**
 * Componente de dibujo
 * @param {Object} props - Propiedades del componente
 * @param {number} props.fieldWidth - ancho de el mapa
 * @param {number} props.fieldHeight - alto de el mapa
 * @param {number} props.goalWidth - Ancho de la cancha
 * @returns {JSX.Element} dibujo de la cancha
 */
const FieldDrawComponent = ({ fieldWidth, fieldHeight, goalWidth, style }) => {
    const styles = MAPS[style]
    const lineColor = styles.lineColor
    const goalColor = styles.goalColor
    const goalNetColor = styles.goalNetColor
    const draw = useCallback((g) => {
        g.clear();
        const fieldX = 0; 
        const fieldY = 0;
     
        // Líneas del campo
        g.lineStyle(3, lineColor);
        g.drawRect(fieldX, fieldY, fieldWidth, fieldHeight);

        // Línea central
        g.moveTo(fieldX + fieldWidth / 2, fieldY);
        g.lineTo(fieldX + fieldWidth / 2, fieldY + fieldHeight);

        // Círculo central
        const centerX = fieldX + fieldWidth / 2;
        const centerY = fieldY + fieldHeight / 2;
        const centerCircleRadius = Math.min(fieldWidth, fieldHeight) * 0.13;
        g.drawCircle(centerX, centerY, centerCircleRadius);

        // Punto central
        g.beginFill(lineColor);
        g.drawCircle(centerX, centerY, centerCircleRadius * 0.09);
        g.endFill();


        // Áreas de penalti
        const penaltyAreaWidth = fieldWidth * 0.16;
        const penaltyAreaHeight = fieldHeight * 0.5;
        const penaltyAreaY = fieldY + (fieldHeight - penaltyAreaHeight) / 2;
        // Izquierda
        g.lineStyle(3, lineColor);
        g.drawRect(fieldX, penaltyAreaY, penaltyAreaWidth, penaltyAreaHeight);
        // Derecha
        g.drawRect(fieldX + fieldWidth - penaltyAreaWidth, penaltyAreaY, penaltyAreaWidth, penaltyAreaHeight);

        // Áreas chicas
        const goalAreaWidth = fieldWidth * 0.06;
        const goalAreaHeight = fieldHeight * 0.25;
        const goalAreaY = fieldY + (fieldHeight - goalAreaHeight) / 2;

        // Izquierda
        g.drawRect(fieldX, goalAreaY, goalAreaWidth, goalAreaHeight);
        // Derecha
        g.drawRect(fieldX + fieldWidth - goalAreaWidth, goalAreaY, goalAreaWidth, goalAreaHeight);

        // Arcos (fuera de la cancha)
        const goalHeight = fieldHeight * 0.18;
        const goalY = fieldY + (fieldHeight - goalHeight) / 2;

        g.lineStyle(4, goalColor);

        // Arco izquierdo
        g.drawRect(fieldX - goalWidth, goalY, goalWidth, goalHeight);

        // Arco derecho
        g.drawRect(fieldX + fieldWidth, goalY, goalWidth, goalHeight);

        // Redes de los arcos
        const netRows = 6;
        const netCols = 4;
        const netSpacingY = goalHeight / netRows;
        const netSpacingX = goalWidth / netCols;

        g.lineStyle(1, goalNetColor);

        // Red izquierda
        for (let i = 1; i < netRows; i++) {
            g.moveTo(fieldX - goalWidth, goalY + i * netSpacingY);
            g.lineTo(fieldX, goalY + i * netSpacingY);
        }
        for (let i = 1; i < netCols; i++) {
            g.moveTo(fieldX - i * netSpacingX, goalY);
            g.lineTo(fieldX - i * netSpacingX, goalY + goalHeight);
        }

        // Red derecha
        for (let i = 1; i < netRows; i++) {
            g.moveTo(fieldX + fieldWidth, goalY + i * netSpacingY);
            g.lineTo(fieldX + fieldWidth + goalWidth, goalY + i * netSpacingY);
        }
        for (let i = 1; i < netCols; i++) {
            g.moveTo(fieldX + fieldWidth + i * netSpacingX, goalY);
            g.lineTo(fieldX + fieldWidth + i * netSpacingX, goalY + goalHeight);
        }
    }, [fieldWidth, fieldHeight, goalWidth]);

    return <Graphics draw={draw} />;
};
export const FieldDraw = React.memo(FieldDrawComponent);

FieldDrawComponent.propTypes = {
  fieldWidth: PropTypes.number.isRequired,
  fieldHeight: PropTypes.number.isRequired,
  goalWidth: PropTypes.number.isRequired,
};