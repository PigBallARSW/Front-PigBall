import { Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js';

export const BallDirectionArrow = ({ player, ball, threshold = 150 }) => {
  if (!ball || !player) return null;

  const dx = ball.x - player.x;
  const dy = ball.y - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < threshold) return null; // No mostrar si está cerca

  const angle = Math.atan2(dy, dx);

  const arrowLength = 30;
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

