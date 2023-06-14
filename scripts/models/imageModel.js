import { MediaModel } from "./mediaModel.js";

export class ImageModel extends MediaModel {
  constructor(data) {
    super(data);
    this._image = data.image;
  }

  get media() {
    const img = document.createElement("img");
    img.setAttribute("src", `${this.path + this._image}`);
    img.setAttribute("alt", this.title);
    return img;
  }
}
