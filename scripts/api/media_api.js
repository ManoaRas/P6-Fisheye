import { Api } from "./api.js";

export class MediaApi {
  constructor() {
    this.api = new Api();
  }

  async getMedias() {
    const medias = await this.api.get();
    return medias;
  }

  async getMediaByPhotographerId(id) {
    const medias = (await this.getMedias()).medias;
    const mediasList = [];

    medias.find(media => {
      media.photographerId === parseInt(id) && mediasList.push(media);
    });

    return mediasList;
  }
}
