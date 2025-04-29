import { Stage } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { ContainerField } from "./ContainerField";
import { Camera } from "./Camera";

export const Field = ({ players, ball, borderX, borderY, movePlayer }) => {
    const MARGIN = 30;
    const GOAL_WIDTH = 40;
    const CANVAS_WIDTH = borderX + MARGIN * 2 + GOAL_WIDTH * 2;
    const CANVAS_HEIGHT = borderY + MARGIN * 2;
    const calculateCanvasSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return { width, height };
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
        <Stage width={canvasSize.width} height={canvasSize.height}>
            <ContainerField canvasSize={canvasSize} borderX={borderX} borderY={borderY} movePlayer={movePlayer} players={players} ball={ball} />
        </Stage>
    );
};