import { Container } from "@pixi/react";
import React from "react";
import { FieldDraw } from "./FieldDraw";
import { MoveContainer } from "./MoveContainer";
import { Player } from "./Player";
import { Ball } from "./Ball";
import { Camera } from "./Camera";
import TileSpriteComponent from "./TileImage";
import { BallDirectionArrow } from "./BallDirectionArrow";
import PropTypes from 'prop-types';

/**
 * Componente de dibujo
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.players - Lista de los jugadores
 * @param {Object} props.ball - balon del juego
 * @param {Object} props.canvasSize - tamaño del canvas
 * @param {number} props.borderX - ancho del mapa
 * @param {number} props.borderY - alto del mapa
 * @returns {JSX.Element} dibujo de la cancha
 */
export const ContainerField = React.memo(function ContainerField({canvasSize,borderX, borderY,  players, ball}) {
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

    const EXTRA_MARGIN_FACTOR = 0.05; 
    const MAP_WIDTH = CANVAS_WIDTH * (1 + EXTRA_MARGIN_FACTOR);
    const MAP_HEIGHT = CANVAS_HEIGHT * (1 + EXTRA_MARGIN_FACTOR);

    return (
        <Container>
            <Camera players={players} canvasSize={canvasSize} CANVAS_WIDTH={CANVAS_WIDTH} CANVAS_HEIGHT={CANVAS_HEIGHT} MAP_WIDTH={MAP_WIDTH} MAP_HEIGHT={MAP_HEIGHT} scale={scale} ball={ball}>
                <Container x={(MAP_WIDTH - borderX) / 2} y={(MAP_HEIGHT - borderY) / 2}>
                    <TileSpriteComponent width={borderX} height={borderY} />
                    <FieldDraw fieldWidth={borderX} fieldHeight={borderY} goalWidth={GOAL_WIDTH} />
                <MoveContainer>
                {players.map((player,i) => (
                    <>
                    <Player key={player.id +"-"+i} player={player} />
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

ContainerField.propTypes = {
  players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        team: PropTypes.number.isRequired,
        sessionId: PropTypes.string.isRequired,
        kicking: PropTypes.bool,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    ).isRequired,
     ball: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        velocityX: PropTypes.number.isRequired,
        velocityY: PropTypes.number.isRequired
      }).isRequired,
  canvasSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  borderX: PropTypes.number.isRequired,
  borderY: PropTypes.number.isRequired
};