import { useRef } from 'react'
import { Container, useTick } from '@pixi/react'
import { useUser } from '../../../context/user/userContext'

const lerp = (start, end) => start + (end - start) * 0.03;
const ZOOM = 1;

export const Camera = ({ players, canvasSize, CANVAS_WIDTH, CANVAS_HEIGHT, children }) => {
  const containerRef = useRef(null);
  const user = useUser();
  const currentUser = user?.username || sessionStorage.getItem("usarname");
  const playerPosition = players.find((p) => p.name === currentUser);
  const cameraPosition = useRef({ x: 0, y: 0 });

  useTick(() => {
    if (containerRef.current && playerPosition) {
      const halfScreenW = canvasSize.width / 2;
      const halfScreenH = canvasSize.height / 2;

      // Centrar al jugador sin límites
      const targetX = halfScreenW - playerPosition.x * ZOOM;
      const targetY = halfScreenH - playerPosition.y * ZOOM;

      cameraPosition.current.x = lerp(cameraPosition.current.x, targetX);
      cameraPosition.current.y = lerp(cameraPosition.current.y, targetY);

      containerRef.current.x = cameraPosition.current.x;
      containerRef.current.y = cameraPosition.current.y;
    }
  });

  return (
    <Container ref={containerRef} scale={ZOOM}>
      {children}
    </Container>
  );
};



