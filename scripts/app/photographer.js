import { MediaApi } from '../api/media.js';
import { PhotographerApi } from '../api/photographer.js';
import { MediaFactory } from "../factories/media.js";
import { PhotographerModel } from "../models/photographer.js";
import { ContactFormUtil } from "../utils/contactForm.js";

class PhotographerApp {
  constructor() {
    this.currentUrl = new URL(document.location.href).searchParams;
    this.id = this.currentUrl.get("id");
  }

  displayData(photographer, mediaList) {
    // Header photographer info
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerModel = new PhotographerModel(photographer);
    photographerHeader.append(photographerModel.getPhotographerInfos());

    // Media photographer info
    const photographerMedia = document.querySelector(".medias-section");
    mediaList.map(media => {
      const photographerMediasModel = new MediaFactory(media);
      photographerMedia.append(photographerMediasModel.mediaCardDOM());
    });
  };

  contactFormData() {
    const contactFormUtil = new ContactFormUtil();
    contactFormUtil.contactFormData()
  }

  async init() {
    // init api
    const photographerApi = new PhotographerApi();
    const mediaApi = new MediaApi();

    // init photographer data
    const media = await mediaApi.getMediaByPhotographerId(this.id);
    const photographer = await photographerApi.getPhotographerById(this.id);
    this.displayData(photographer, media);
    this.contactFormData()
  }
}

new PhotographerApp().init();
