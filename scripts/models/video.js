import { MediaModel } from "./media.js";

export class VideoModel extends MediaModel {
  constructor(data) {
    super(data);
    this._video = data.video;
  }

  get media() {
    const extension = this._video.split(".")[1];

    const video = document.createElement("video");
    video.classList.add("media");
    video.setAttribute("tabindex", "-1");

    const source = document.createElement("source");
    source.setAttribute("src", `${this.path + this._video}`);
    source.setAttribute("type", `video/${extension}`);

    const track = document.createElement("track");
    track.setAttribute("src", "captions/vtt/captions_fr.vtt");
    track.setAttribute("kind", "captions");
    track.setAttribute("srclang", "fr");
    track.setAttribute("label", "french_captions");
    track.setAttribute("default", "true");

    video.append(source, track);
    return video
  }
}
