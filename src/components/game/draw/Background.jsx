import { Sprite } from "@pixi/react";
import { Texture } from "@pixi/core"
import backgroundAsset from '../../../assets/images/cesped2.png'
import React, { useMemo } from "react";


const BackgroundSpriteComponent = ({width, height}) => {
    const backgroundTexture = useMemo(() => Texture.from(backgroundAsset),[])
    
    return (
        <Sprite
          texture={backgroundTexture}
          width={width}
          height={height}
        />
      );
}

export const BackgroundSprite = React.memo(BackgroundSpriteComponent);
