import { Container} from "@pixi/react";
import { useMoveGame } from "../../../context/game/useMoveGame";
import React from "react";



export const MoveContainer = React.memo(({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
})
