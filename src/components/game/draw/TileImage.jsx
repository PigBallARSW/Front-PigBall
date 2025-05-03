import { TilingSprite } from '@pixi/react';
import { Texture } from "@pixi/core";
import { useMemo } from 'react';
import backgroundAsset from '../../../assets/images/tile.png'; 

const TileSpriteComponent = ({ width, height }) => {
  const texture = useMemo(() => Texture.from(backgroundAsset), []);

  return (
    <TilingSprite
      texture={texture}
      width={width}
      height={height}
      tint={0xb6eba6}
    />
  );
};

export default TileSpriteComponent;
