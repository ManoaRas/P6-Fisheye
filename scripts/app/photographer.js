import { MediaApi } from '../api/media.js';
import { PhotographerApi } from '../api/photographer.js';
import { MediaFactory } from "../factories/media.js";
import { PhotographerModel } from "../models/photographer.js";

import { Subject } from '../subjects/subject.js';
import { ModalSubject } from '../subjects/modal.js';
import { ContactFormObserver } from '../observers/contactForm.js';

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

  async init() {
    // init api
    const photographerApi = new PhotographerApi();
    const mediaApi = new MediaApi();

    // init photographer data
    const media = await mediaApi.getMediaByPhotographerId(this.id);
    const photographer = await photographerApi.getPhotographerById(this.id);
    this.displayData(photographer, media);

    const subject = new Subject();
    const modalSubject = new ModalSubject();

    const contactFormObserver = new ContactFormObserver(modalSubject);

    console.log(subject)
    subject.attach(contactFormObserver);

    subject.dispatch();
  }
}

new PhotographerApp().init();
