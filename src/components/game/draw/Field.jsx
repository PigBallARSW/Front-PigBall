import { Stage } from "@pixi/react";
import React, { useCallback, useEffect, useState } from "react";
import { ContainerField } from "./ContainerField";

export const Field = ({ players, ball, borderX, borderY, movePlayer }) => {
    const calculateCanvasSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const options = { backgroundColor: 0x3a642d, antialias: true };
        return { width, height, options };
    };
    const [canvasSize, setCanvasSize] = useState(calculateCanvasSize);
    const updateCanvasSize = useCallback(() => {
        setCanvasSize(calculateCanvasSize());
    }, []);
       
    useEffect(() => {
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, [updateCanvasSize]);

    return (
        <Stage  {...canvasSize}>
            <ContainerField canvasSize={canvasSize} borderX={borderX} borderY={borderY} movePlayer={movePlayer} players={players} ball={ball} />
        </Stage>
    );
}