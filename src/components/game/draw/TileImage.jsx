import { TilingSprite } from '@pixi/react';
import { Texture } from "@pixi/core";
import React, { useMemo } from 'react';
import backgroundAsset from '../../../assets/images/tile2.png'; 
import PropTypes from 'prop-types';
/**
 * Componente para cargar el tile
 * @param {number} props.width - ancho de todo el mapa
 * @param {number} props.height - alto de todo el mapa
 * @returns {JSX.Element} fondo de la cancha
 */
const TileSpriteComponent = ({ width, height }) => {
  const tileScale = { x: 2, y: 2 }
  const texture = useMemo(() => Texture.from(backgroundAsset), []);

  return (
    <TilingSprite
      texture={texture}
      width={width}
      height={height}
      tileScale={tileScale}
      tint={0xbdebb0}
    />
  );
};

export default React.memo(TileSpriteComponent);

TileSpriteComponent.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};