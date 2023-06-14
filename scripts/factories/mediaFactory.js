import { ImageModel } from "../models/imageModel.js";
import { VideoModel } from "../models/videoModel.js";
import { MediaView } from "../views/mediaView.js";

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
