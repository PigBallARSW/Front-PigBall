import { Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para dibujar al jugador
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.player - Lista de los jugadores
 * @returns {JSX.Element} Componente para dibujar al jugador
 */
export const Player =  React.memo(({ player }) => {
    const playerRadius = 20;
    const xPos = player.x;
    const yPos = player.y;
    return (
        <>
            <Graphics
                x={xPos}
                y={yPos}
                draw={g => {
                    g.clear();

                    const fillColor = player.team === 0 ? 0x0000FF : 0xFF0000; 
                    g.beginFill(fillColor);
                    g.lineStyle(2, player.kicking ? 0xFFFFFF : 0x000000); 
                    g.drawCircle(0, 0, playerRadius);
                    g.endFill();
                }}
            />
            <Text
                text={player.name}
                anchor={0.5}
                x={xPos}
                y={yPos + playerRadius + 12}
                style={
                    new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 12,
                        fill: player.team === 0 ? 'blue' : 'red',
                        align: 'center',
                    })
                }
            />
        </>
    );
})

Player.propTypes = {
  player: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      team: PropTypes.number.isRequired,
      sessionId: PropTypes.string.isRequired,
      kicking: PropTypes.bool,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
};