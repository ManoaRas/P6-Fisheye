import { PhotographerApi } from "../api/photographer_api.js";
import { PhotographerModel } from "../models/photographer_model.js";

class IndexApp {
  async displayData(photographers) {
    const photographersSection = document.querySelector(".photographers-index");
    photographers.photographers.map((photographer) => {
      const photographerModel = new PhotographerModel(photographer);
      photographersSection.append(photographerModel.getUserCardDOM());
    });
  }

  async init() {
    const photographerApi = new PhotographerApi();
    this.displayData(await photographerApi.getPhotographers());
  };
}

new IndexApp().init();
