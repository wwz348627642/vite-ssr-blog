import { LinearFilter, LoadingManager, sRGBEncoding, Texture, TextureLoader } from "three";

const texture = {
  nav: ['/images/about.png', '/images/article.png', '/images/pet.png'],
  noise: '/images/noise.png',
  skill: '/images/skill.png',
}

export const manage = new LoadingManager();

const textureLoader = new TextureLoader(manage);

class Loader {
  
  public navImage: Array<Texture> = [];
  public noiseImage?: Texture;
  public skillImage?: Texture;
  public load () {
    this.navImage = texture.nav.map(nav => textureLoader.load(nav));
    this.noiseImage = textureLoader.load(texture.noise);
    this.skillImage = textureLoader.load(texture.skill);
  }

}

export const loader = new Loader();


