import { TilingSprite } from '@pixi/react';
import { Texture } from "@pixi/core";
import React, { useMemo } from 'react';
import backgroundAsset from '../../../assets/images/tile2.png'; 

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
