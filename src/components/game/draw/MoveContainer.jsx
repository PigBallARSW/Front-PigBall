import { Container} from "@pixi/react";
import { useMoveGame } from "../../../context/game/useMoveGame";
import React from "react";



export const MoveContainer = React.memo(({ movePlayer, children }) => {
    useMoveGame(movePlayer);
    return (
        <Container>
            {children}
        </Container>
    );
})
