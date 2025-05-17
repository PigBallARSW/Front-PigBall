import { Stage } from "@pixi/react";
import React, { useCallback, useEffect, useState } from "react";
import { ContainerField } from "./ContainerField";
import PropTypes from 'prop-types';
import { MAPS } from "../../../utils/styles";

/**
 * Componente de dibujo
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.players - Lista de los jugadores
 * @param {Object} props.ball - balon del juego
 * @param {number} props.borderX - ancho de el mapa
 * @param {number} props.borderY - alto de el mapa
 * * @param {any} props.wrapperRef - tamaño del contenedor del juego
 * @returns {JSX.Element} dibujo de la cancha
 */
export const Field = ({ players, ball, borderX, borderY, wrapperRef, style }) => {
  const background = MAPS[style].background
    const calculateCanvasSize = useCallback(() => {
      const options = { backgroundColor: background, antialias: true };
      if (!wrapperRef.current) return { width: window.innerWidth, height: window.innerHeight, options: options };
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      return { width, height, options };
    },[wrapperRef]);
  
    const [canvasSize, setCanvasSize] = useState(calculateCanvasSize);
    const updateCanvasSize = useCallback(() => {
      setCanvasSize(calculateCanvasSize());
    }, [calculateCanvasSize]);
  
    useEffect(() => {
      updateCanvasSize(); 
      window.addEventListener('resize', updateCanvasSize);
      return () => window.removeEventListener('resize', updateCanvasSize);
    }, [updateCanvasSize]);
  
    return (
      <Stage {...canvasSize}>
        <ContainerField
          canvasSize={canvasSize}
          borderX={borderX}
          borderY={borderY}
          players={players}
          ball={ball}
          style ={style}
        />
      </Stage>
    );
  };
  Field.propTypes = {
    players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      team: PropTypes.number.isRequired,
      sessionId: PropTypes.string.isRequired,
      kicking: PropTypes.bool,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired,
    ball: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      velocityX: PropTypes.number.isRequired,
      velocityY: PropTypes.number.isRequired
    }).isRequired,
    borderX: PropTypes.number.isRequired,
    borderY: PropTypes.number.isRequired,        
  wrapperRef: PropTypes.shape({                
    current: PropTypes.any
  }).isRequired,
  style: PropTypes.string.isRequired
};
