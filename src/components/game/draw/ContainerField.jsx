import { Container, Sprite } from "@pixi/react";
import { Texture } from "@pixi/core"
import backgroundAsset from '../../../assets/images/cesped2.png'
import { useMemo } from "react";
import { FieldDraw } from "./FieldDraw";
import { MoveContainer } from "./MoveContainer";
import { Player } from "./Player";
import { Ball } from "./Ball";
import { Camera } from "./Camera";
import { BackgroundSprite } from "./Background";

export const ContainerField = ({canvasSize,borderX, borderY, movePlayer, players, ball, children}) => {
    const backgroundTexture = useMemo(() => Texture.from(backgroundAsset),[])
    const MARGIN = 30;
    const GOAL_WIDTH = 40;
    const CANVAS_WIDTH = borderX + MARGIN * 2 + GOAL_WIDTH * 2;
    const CANVAS_HEIGHT = borderY + MARGIN * 2;
    const fieldX = MARGIN + GOAL_WIDTH;
    const fieldY = MARGIN;
    const scale = Math.min(canvasSize.width / CANVAS_WIDTH, canvasSize.height / CANVAS_HEIGHT);
    return (
        <Container 
        scale={scale} pivot={{ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }}
        position={{ x: canvasSize.width / 2, y: canvasSize.height / 2 }}>
            {children}
                <BackgroundSprite
                texture={backgroundTexture}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                />
                <FieldDraw fieldX={fieldX} fieldY={fieldY} GOAL_WIDTH={GOAL_WIDTH} borderX={borderX} borderY={borderY} />
                <MoveContainer 
                    movePlayer={movePlayer}
                >
                {players.map((player, index) => (
                    <Player key={index} fieldX={fieldX} fieldY={fieldY} player={player} />
                ))}
                    <Ball fieldX={fieldX} fieldY={fieldY} ball={ball} />
                </MoveContainer>
            
        </Container>
    )
}