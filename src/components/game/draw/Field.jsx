import { Stage } from "@pixi/react";
import React, { useCallback, useEffect, useState } from "react";
import { ContainerField } from "./ContainerField";

export const Field = ({ players, ball, borderX, borderY, movePlayer, wrapperRef }) => {
    const calculateCanvasSize = () => {
      if (!wrapperRef.current) return { width: window.innerWidth, height: window.innerHeight, options: {} };
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      const options = { backgroundColor: 0x3a642d, antialias: true };
      return { width, height, options };
    };
  
    const [canvasSize, setCanvasSize] = useState(calculateCanvasSize);
    const updateCanvasSize = useCallback(() => {
      setCanvasSize(calculateCanvasSize());
    }, [wrapperRef]);
  
    useEffect(() => {
      updateCanvasSize(); // Initial resize
      window.addEventListener('resize', updateCanvasSize);
      return () => window.removeEventListener('resize', updateCanvasSize);
    }, [updateCanvasSize]);
  
    return (
      <Stage {...canvasSize}>
        <ContainerField
          canvasSize={canvasSize}
          borderX={borderX}
          borderY={borderY}
          movePlayer={movePlayer}
          players={players}
          ball={ball}
        />
      </Stage>
    );
  };
  