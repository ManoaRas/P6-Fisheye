import { ImageModel } from "../models/image.js";
import { VideoModel } from "../models/video.js";
import { MediaView } from "../views/media.js";

export class MediaFactory {
  constructor(data) {
    if (data.image !== undefined) {
      this.data = new ImageModel(data);
    } else {
      this.data = new VideoModel(data);
    }
    return new MediaView(this.data);
  }
}
