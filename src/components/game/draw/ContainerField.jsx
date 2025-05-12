import { Container } from "@pixi/react";
import React from "react";
import { FieldDraw } from "./FieldDraw";
import { MoveContainer } from "./MoveContainer";
import { Player } from "./Player";
import { Ball } from "./Ball";
import { Camera } from "./Camera";
import TileSpriteComponent from "./TileImage";
import { BallDirectionArrow } from "./BallDirectionArrow";

export const ContainerField = React.memo(function ContainerField({canvasSize,borderX, borderY, movePlayer, players, ball, children}) {
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

    const EXTRA_MARGIN_FACTOR = 0.08; 
    const MAP_WIDTH = CANVAS_WIDTH * (1 + EXTRA_MARGIN_FACTOR);
    const MAP_HEIGHT = CANVAS_HEIGHT * (1 + EXTRA_MARGIN_FACTOR);

    return (
        <Container>
            <Camera players={players} canvasSize={canvasSize} CANVAS_WIDTH={CANVAS_WIDTH} CANVAS_HEIGHT={CANVAS_HEIGHT} MAP_WIDTH={MAP_WIDTH} MAP_HEIGHT={MAP_HEIGHT} scale={scale}>
                <Container x={fieldX + (MAP_WIDTH - CANVAS_WIDTH) / 2} y={fieldY + (MAP_HEIGHT - CANVAS_HEIGHT) / 2}>
                    <TileSpriteComponent width={borderX} height={borderY} />
                    <FieldDraw fieldWidth={borderX} fieldHeight={borderY} goalWidth={GOAL_WIDTH} />
                <MoveContainer 
                    movePlayer={movePlayer}
                >
                {players.map((player, index) => (
                    <>
                    <Player key={index} player={player} />
                    <BallDirectionArrow player={player} ball={ball} />
                    </>
                ))}
                    <Ball fieldX={fieldX} fieldY={fieldY} ball={ball} />
                </MoveContainer>
                </Container>
            </Camera>
        </Container>
    )
})