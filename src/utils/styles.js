import backgroundAsset from '../assets/images/tile2.png'; 
import backgroundAsset2 from '../assets/images/tile3.png'; 
import backgroundAsset3 from '../assets/images/tile4.png'; 
export const MAPS = {
  classic: {
    tileTexture: backgroundAsset,
    background: 0x477339,
    lineColor: 0xb4d6a8,
    goalColor: 0xFFFFFF,
    goalNetColor: 0xF5F5F5,
  },
  urban: {
    tileTexture: backgroundAsset2,
    background: 0x444342,
    lineColor: 0x000000,
    goalColor: 0x000000,
    goalNetColor: 0x000000,
  },
  dessert: {
    tileTexture: backgroundAsset3,
    background: 0xc2b26f,
    lineColor: 0x714a05,
    goalColor: 0x714a05,
    goalNetColor: 0x714a05,
  },
};
