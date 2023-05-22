import { ImageModel } from "../models/image.js";
import { VideoModel } from "../models/video.js";
import { MediaTemplate } from "../templates/media_template.js";

export class MediaFactory {
  constructor(data) {
    if (data.image !== undefined) {
      this._data = new ImageModel(data);
    } else {
      this._data = new VideoModel(data);
    }
    return new MediaTemplate(this._data);
  }
}
