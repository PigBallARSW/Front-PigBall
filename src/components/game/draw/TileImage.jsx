import { TilingSprite } from '@pixi/react';
import { Texture } from "@pixi/core";
import React, { useMemo } from 'react';
import backgroundAsset from '../../../assets/images/tile3.png'; 
import PropTypes from 'prop-types';
import { MAPS } from '../../../utils/styles';
/**
 * Componente para cargar el tile
 * @param {number} props.width - ancho de el mapa
 * @param {number} props.height - alto de el mapa
 * @returns {JSX.Element} fondo de la cancha
 */
const TileSpriteComponent = ({ width, height, style }) => {
  const tileScale = { x: 2, y: 2 }
  const styles = MAPS[style].tileTexture
  const texture = useMemo(() => Texture.from(styles), []);

  return (
    <TilingSprite
      texture={texture}
      width={width}
      height={height}
      tileScale={tileScale}
    />
  );
};

export default React.memo(TileSpriteComponent);

TileSpriteComponent.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};