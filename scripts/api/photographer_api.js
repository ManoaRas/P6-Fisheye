import { Api } from "./api.js";

export class PhotographerApi {
  constructor() {
    this.api = new Api();
  }

  async getPhotographers() {
    const photographers = await this.api.get();
    return photographers;
  }

  async getPhotographerById(id) {
    const photographers = (await this.getPhotographers()).photographers;
    return photographers.find((photographer) => photographer.id === parseInt(id));
  }
}
