import { useRef, useEffect } from "react";
import isEqual from "lodash.isequal";

export function useDraw (players, ball, drawSoccerField, borderX, borderY) {
    const canvasRef = useRef(null);
    
    function useDeepCompareMemoize(value) {
      const ref = useRef();
    
      if (!isEqual(ref.current, value)) {
        ref.current = value;
      }
    
      return ref.current;
    }

    const memoizedPlayers = useDeepCompareMemoize(players);
    const memoizedBall = useDeepCompareMemoize(ball);

    useEffect(() => {
      console.log("hola");
        const canvas = canvasRef.current;
        if (!canvas) return;
    
        const handleResize = () => {
          if (!canvas) return;
    
          const FIELD_WIDTH = borderX;
          const FIELD_HEIGHT = borderY;
          const MARGIN = 30;
          const GOAL_WIDTH = 40;
    
          const CANVAS_WIDTH = FIELD_WIDTH + MARGIN * 2 + GOAL_WIDTH * 2;
          const CANVAS_HEIGHT = FIELD_HEIGHT + MARGIN * 2;
    
          const stageWidth = window.innerWidth;
          const stageHeight = window.innerHeight;
    
          const scale = Math.min(stageWidth / CANVAS_WIDTH, stageHeight / CANVAS_HEIGHT);
    
          canvas.style.width = `${CANVAS_WIDTH * scale}px`;
          canvas.style.height = `${CANVAS_HEIGHT * scale}px`;
    
          canvas.style.position = "absolute";
          canvas.style.left = "50%";
          canvas.style.top = "50%";
          canvas.style.transform = "translate(-50%, -50%)";
    
          canvas.width = CANVAS_WIDTH;
          canvas.height = CANVAS_HEIGHT;
    
          const ctx = canvas.getContext("2d");
          if (ctx) drawSoccerField(ctx, FIELD_WIDTH, FIELD_HEIGHT, MARGIN, GOAL_WIDTH, memoizedPlayers, memoizedBall);
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [memoizedPlayers, memoizedBall, drawSoccerField, borderX, borderY]);
  return {canvasRef}
}