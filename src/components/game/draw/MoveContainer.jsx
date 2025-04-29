import { Container, Sprite } from "@pixi/react";
import { useMoveGame } from "../../../context/game/useMoveGame";
import { useUser } from "../../../context/user/userContext";
import { Camera } from "./Camera";



export const MoveContainer = ({ movePlayer, children }) => {
    useMoveGame(movePlayer);
    return (
        <Container>
            {children}
        </Container>
    );
};
