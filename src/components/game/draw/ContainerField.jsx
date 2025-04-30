import { Container, Sprite } from "@pixi/react";
import { Texture } from "@pixi/core"
import backgroundAsset from '../../../assets/images/cesped2.png'
import { useMemo } from "react";
import { FieldDraw } from "./FieldDraw";
import { MoveContainer } from "./MoveContainer";
import { Player } from "./Player";
import { Ball } from "./Ball";
import { Camera } from "./Camera";
import { Background, BackgroundSprite } from "./Background";

export const ContainerField = ({canvasSize,borderX, borderY, movePlayer, players, ball, children}) => {
    const MARGIN = 0;
    const GOAL_WIDTH = borderX * 0.03;
    const CANVAS_WIDTH = borderX + MARGIN * 2 + GOAL_WIDTH * 2;
    const CANVAS_HEIGHT = borderY + MARGIN * 2;
    const fieldX = MARGIN + GOAL_WIDTH;
    const fieldY = MARGIN;
    const baseScale = Math.min(
        canvasSize.width / CANVAS_WIDTH,
        canvasSize.height / CANVAS_HEIGHT
    );
    const scale = Math.max(0.45, Math.min(baseScale, 1));

    return (
        <Container>
            <Camera players={players} canvasSize={canvasSize} CANVAS_WIDTH={borderX} CANVAS_HEIGHT={borderY} scale={scale}>
                <Container x={fieldX} y={fieldY}>
                    <BackgroundSprite width={borderX} height={borderY} />
                    <FieldDraw fieldWidth={borderX} fieldHeight={borderY} goalWidth={GOAL_WIDTH} />
                </Container>
                <MoveContainer 
                    movePlayer={movePlayer}
                >
                {players.map((player, index) => (
                    <Player key={index} fieldX={fieldX} fieldY={fieldY} player={player} />
                ))}
                    <Ball fieldX={fieldX} fieldY={fieldY} ball={ball} />
                </MoveContainer>
            </Camera>
        </Container>
    )
}