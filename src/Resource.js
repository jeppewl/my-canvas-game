import sky from "./assets/sprites/sky.png";
import ground from "./assets/sprites/ground.png";
import hero from "./assets/sprites/hero-sheet.png";
import shadow from "./assets/sprites/shadow.png";

class Resources {
  constructor() {
    const base = import.meta.env.BASE_URL;
    this.toLoad = {
      sky,
      ground,
      hero,
      shadow,
    };

    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resources = new Resources();
