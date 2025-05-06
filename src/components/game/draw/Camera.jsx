import { useRef } from 'react'
import { Container, useTick } from '@pixi/react'
import { useUser } from '../../../context/user/userContext'

const lerp = (start, end, t = 0.03) => start + (end - start) * t;

const getDynamicZoom = (playersCount, canvasWidth, canvasHeight, mapWidth, mapHeight) => {
  const maxZoom = Math.min(canvasWidth / mapWidth, canvasHeight / mapHeight) * 2; 
  const minZoom = 0.9; 
  const zoom = Math.min(maxZoom, minZoom + playersCount * 0.1);
  return Math.max(minZoom, zoom);
};

export const Camera = ({ players, canvasSize, CANVAS_WIDTH, CANVAS_HEIGHT, MAP_WIDTH, MAP_HEIGHT, children }) => {
  const containerRef = useRef(null);
  const user = useUser();
  const currentUser = user?.username || sessionStorage.getItem("usarname");
  const playerPosition = players.find((p) => p.name === currentUser);
  const cameraPosition = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);

  useTick(() => {
    if (containerRef.current && playerPosition) {
      const targetZoom = getDynamicZoom(
        players.length,
        canvasSize.width,
        canvasSize.height,
        MAP_WIDTH,
        MAP_HEIGHT
      );
      zoomRef.current = lerp(zoomRef.current, targetZoom);

      const marginX = (MAP_WIDTH - CANVAS_WIDTH) / 2;
      const marginY = (MAP_HEIGHT - CANVAS_HEIGHT) / 2;

      // Target position to center the player
      let targetX = canvasSize.width / 2 - (playerPosition.x + marginX) * zoomRef.current;
      let targetY = canvasSize.height / 2 - (playerPosition.y + marginY) * zoomRef.current;

      // Calcular límites
      const maxX = 0;
      const maxY = 0;
      const minX = canvasSize.width - MAP_WIDTH * zoomRef.current;
      const minY = canvasSize.height - MAP_HEIGHT * zoomRef.current;

      // Aplicar límites
      targetX = Math.max(minX, Math.min(maxX, targetX));
      targetY = Math.max(minY, Math.min(maxY, targetY));

      cameraPosition.current.x = lerp(cameraPosition.current.x, targetX);
      cameraPosition.current.y = lerp(cameraPosition.current.y, targetY);

      containerRef.current.x = cameraPosition.current.x;
      containerRef.current.y = cameraPosition.current.y;
      containerRef.current.scale.set(zoomRef.current);
    }
  });

  return (
    <Container ref={containerRef}>
      {children}
    </Container>
  );
};






