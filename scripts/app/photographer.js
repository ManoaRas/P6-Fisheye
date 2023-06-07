import { MediaApi } from '../api/media_api.js';
import { PhotographerApi } from '../api/photographer_api.js';
import { MediaFactory } from "../factories/media_factory.js";
import { PhotographerModel } from "../models/photographer_model.js";

class PhotographerApp {
  constructor() {
    this.currentUrl = new URL(document.location.href).searchParams;
    this.id = this.currentUrl.get("id");
  }

  displayData(photographer, mediaList) {
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerModel = new PhotographerModel(photographer);
    photographerHeader.append(photographerModel.getPhotographerInfos());

    const photographerMedia = document.querySelector(".medias-section");
    mediaList.map(media => {
      const photographerMediasModel = new MediaFactory(media);
      photographerMedia.append(photographerMediasModel.getMediaCardDOM());
    });
  };

  async init() {
    const photographerApi = new PhotographerApi();
    const mediaApi = new MediaApi();
    const media = await mediaApi.getMediaByPhotographerId(this.id);
    const photographer = await photographerApi.getPhotographerById(this.id);
    this.displayData(photographer, media);
  }
}

new PhotographerApp().init();
