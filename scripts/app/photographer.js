import { MediaApi } from '../api/media.js';
import { PhotographerApi } from '../api/photographer.js';
import { MediaFactory } from "../factories/media.js";
import { PhotographerModel } from "../models/photographer.js";
import { ContactFormUtil } from "../utils/contactForm.js";
import { LightBoxUtils } from '../utils/lightBox.js';
import { LikesUtils } from '../utils/likes.js';
import { SortByUtil } from "../utils/sortBy.js";

class PhotographerApp {
  constructor() {
    this.currentUrl = new URL(document.location.href).searchParams;
    this.id = this.currentUrl.get("id");
  }

  _photographerHeaders(photographer) {
    // Header photographer info
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerModel = new PhotographerModel(photographer);
    photographerHeader.append(photographerModel.getPhotographerInfos());
  }

  _photographerMedias(mediaList) {
    // Media photographer info
    const photographerMedia = document.querySelector(".medias-section");
    mediaList.map(media => {
      const photographerMediasModel = new MediaFactory(media);
      photographerMedia.append(photographerMediasModel.mediaCardDOM());
    });
  }

  _photographerSortBy(mediaList) {
    const sortby = new SortByUtil(mediaList);
    sortby.sortByData();
  }

  _contactFormData() {
    const contactFormUtil = new ContactFormUtil();
    contactFormUtil.contactFormData();
  }

  _likesData(photographer) {
    const likeUtils = new LikesUtils(photographer);
    likeUtils.init();
  }

  _lightboxData(mediaList) {
    const lightBoxUtils = new LightBoxUtils(mediaList);
    lightBoxUtils.init();
  }


  displayData(photographer, mediaList) {
    this._photographerHeaders(photographer);
    this._photographerMedias(mediaList);
    this._photographerSortBy(mediaList);
    this._contactFormData();
    this._likesData(photographer);
    this._lightboxData(mediaList);
  }

  async init() {
    // init api
    const photographerApi = new PhotographerApi();
    const mediaApi = new MediaApi();

    // init photographer data
    const media = await mediaApi.getMediaByPhotographerId(this.id);
    const photographer = await photographerApi.getPhotographerById(this.id);

    if (media || photographer) {
      this.displayData(photographer, media);
    } else {
      console.error("No media found for the photographer.");
    }
  }
}

new PhotographerApp().init();
