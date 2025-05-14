import { Graphics } from '@pixi/react';
import PropTypes from 'prop-types';

/**
 * Componente de overlay de carga para solicitudes a la API
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.player - Lista de los jugadores
 * @param {Object} props.ball - balon del juego
 * @param {number} props.threshold - Configuracion del juego
 * @returns {JSX.Element} Componente de overlay de carga
 */
export const BallDirectionArrow = ({ player, ball, threshold = 150 }) => {
  if (!ball || !player) return null;

  const dx = ball.x - player.x;
  const dy = ball.y - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < threshold) return null; // No mostrar si está cerca

  const angle = Math.atan2(dy, dx);

  const arrowX = player.x + Math.cos(angle) * 50;
  const arrowY = player.y + Math.sin(angle) * 50;

  return (
    <Graphics
      x={arrowX}
      y={arrowY}
      rotation={angle}
      draw={g => {
        g.clear();
        g.beginFill(0xffc107);
        g.moveTo(0, 0);
        g.lineTo(-10, -5);
        g.lineTo(-10, 5);
        g.lineTo(0, 0);
        g.endFill();
      }}
    />
  );
};

BallDirectionArrow.propTypes = {
  threshold: PropTypes.number,
  player: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      team: PropTypes.number.isRequired,
      sessionId: PropTypes.string.isRequired,
      kicking: PropTypes.bool,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
  ball: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    velocityX: PropTypes.number.isRequired,
    velocityY: PropTypes.number.isRequired
  }).isRequired,
};