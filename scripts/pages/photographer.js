import { MediaApi } from '../api/mediaApi.js';
import { PhotographerApi } from '../api/photographerApi.js';
import { MediaFactory } from "../factories/media_factory.js";
import { PhotographerModel } from "../models/photographer.js";

class PhotographerApp {
  constructor() {
    this.currentUrl = new URL(document.location.href).searchParams;
    this.id = this.currentUrl.get("id");
  }

  displayData(photographer, mediaList) {
    // Display data photographer
    // console.log('Photographer :', photographer)
    // console.log('Media :', mediaList)
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerModel = new PhotographerModel(photographer);
    photographerHeader.append(photographerModel.getPhotographerInfos());

    const photographerMedia = document.querySelector(".medias-section");
    mediaList.map(media => {
      const photographerMediasModel = new MediaFactory(media);
      // photographerMedia.append(photographerMediasModel.getMediaCardDOM());
      photographerMedia.innerHTML += photographerMediasModel.getMediaCardDOM();
    });
  };

  async init() {
    const media = await MediaApi.getMediaByPhotographerId(this.id);
    const photographer = await PhotographerApi.getPhotographerById(this.id);
    this.displayData(photographer, media);
  }
}

new PhotographerApp().init();
