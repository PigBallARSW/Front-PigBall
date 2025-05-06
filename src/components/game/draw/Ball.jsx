import { Graphics } from '@pixi/react';
import React from 'react';

export const Ball = React.memo(({ fieldX, fieldY, ball }) => {
    if (!ball) return null;
    const ballRadius = 10;
    const xPos = ball.x;
    const yPos = ball.y;
    return (
        <Graphics
            x={xPos}
            y={yPos}
            draw={g => {
                g.clear();
                g.beginFill(0xFFFFFF); 
                g.lineStyle(2, 0x000000); 
                g.drawCircle(0, 0, ballRadius);
                g.endFill();
            }}
        />
    );
})