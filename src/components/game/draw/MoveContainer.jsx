import { Container, Sprite } from "@pixi/react";
import { useMoveGame } from "../../../context/game/useMoveGame";
import { Camera } from "./Camera";
import React from "react";



export const MoveContainer = React.memo(({ movePlayer, children }) => {
    useMoveGame(movePlayer);
    return (
        <Container>
            {children}
        </Container>
    );
})
