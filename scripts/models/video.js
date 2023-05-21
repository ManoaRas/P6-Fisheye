import { MediaModel } from "../models/media.js";

export class VideoModel extends MediaModel {
  constructor(data) {
    super(data);
    this._video = data.video;
  }

  get media() {
    const extension = this._video.split(".")[1];

    return `
      <video class="media" tabindex="-1">
        <source src="${this.path + this._video}" type="video/${extension}">
        <track src="captions/vtt/captions_fr.vtt" kind="captions" srclang="fr" label="french_captions" default="true">
      </video>
    `;
  }
}
