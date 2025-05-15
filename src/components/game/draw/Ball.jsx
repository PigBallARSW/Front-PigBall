import { Graphics } from '@pixi/react';
import React from 'react';
import PropTypes from 'prop-types';
/**
 * Componente para resumir el juego
 * @param {Object} props - Propiedades del componente
 * @param {number} props.fieldX - Ancho de la cancha
 * @param {number} props.fieldY - Alto de la cancha
 * @param {Object} props.ball - balon del juego
 * @returns {JSX.Element} Resume el juego
 */
export const Ball = React.memo(({ ball }) => {
    if (!ball) return null;
    const ballRadius = 10;
    const xPos = ball.x;
    const yPos = ball.y;
    return (
        <Graphics
            x={xPos}
            y={yPos}
            draw={g => {
                g.clear();
                g.beginFill(0xFFFFFF); 
                g.lineStyle(2, 0x000000); 
                g.drawCircle(0, 0, ballRadius);
                g.endFill();
            }}
        />
    );
})

Ball.propTypes = {
    ball: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        velocityX: PropTypes.number.isRequired,
        velocityY: PropTypes.number.isRequired
    }).isRequired,
};