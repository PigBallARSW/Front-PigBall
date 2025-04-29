import { Graphics } from '@pixi/react';

export const Ball = ({ fieldX, fieldY, ball }) => {
    if (!ball) return null;

    const ballRadius = 10;
    const xPos = fieldX + ball.x;
    const yPos = fieldY + ball.y;
    return (
        <Graphics
            x={xPos}
            y={yPos}
            draw={g => {
                g.clear();
                g.beginFill(0x000000, 0.5);
                g.drawCircle(2, 2, ballRadius); 
                g.endFill();
                g.beginFill(0xFFFFFF); 
                g.lineStyle(2, 0x000000); 
                g.drawCircle(0, 0, ballRadius);
                g.endFill();
            }}
        />
    );
};