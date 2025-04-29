import { useRef } from 'react'
import { Container, useTick } from '@pixi/react'
import { useUser } from '../../../context/user/userContext'

// Interpolación suave
const lerp = (start, end) => {
  return start + (end - start) * 0.03
}
const ZOOM = 1.5;

export const Camera = ({ players, canvasSize, CANVAS_WIDTH, CANVAS_HEIGHT, children }) => {
    const containerRef = useRef(null);
    const user = useUser();
    const currentUser = user?.username || sessionStorage.getItem("usarname");
    const playerPosition = players.find((p) => p.name === currentUser);
    const lastPlayerPosition = useRef({ x: 0, y: 0 });
    const cameraPosition = useRef({ x: 0, y: 0 });

    useTick(() => {
      if (containerRef.current && playerPosition) {
        const halfScreenW = canvasSize.width / 2;
        const halfScreenH = canvasSize.height / 2;

        // Target donde queremos centrar
        let targetX = halfScreenW - playerPosition.x * ZOOM;
        let targetY = halfScreenH - playerPosition.y * ZOOM;

        // LÍMITES PARA QUE NO SALGA DEL CAMPO
        const maxOffsetX = 0;
        const minOffsetX = canvasSize.width - CANVAS_WIDTH * ZOOM;
        const maxOffsetY = 0;
        const minOffsetY = canvasSize.height - CANVAS_HEIGHT * ZOOM;

        // Aplicar límites
        targetX = Math.min(maxOffsetX, Math.max(targetX, minOffsetX));
        targetY = Math.min(maxOffsetY, Math.max(targetY, minOffsetY));

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


