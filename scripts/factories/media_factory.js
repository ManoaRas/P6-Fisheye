import { MediaView } from "../views/media_view.js";
import { MediaModel } from "../models/media_model.js";

export class MediaFactory {
  constructor(data) {
    this._data = new MediaModel(data);
    return new MediaView(this._data);
  }
}
