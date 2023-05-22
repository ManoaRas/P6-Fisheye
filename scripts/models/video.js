import { MediaModel } from "./media_model.js";

export class VideoModel extends MediaModel {
  constructor(data) {
    super(data);
    this._video = data.video;
    this.extension = this._video.split(".")[1];
  }

  get media() {
    return `
      <video class="media" tabindex="-1">
        <source src="${this.path + this._video}" type="video/${this.extension}">
        <track src="captions/vtt/captions_fr.vtt" kind="captions" srclang="fr" label="french_captions" default="true">
      </video>
    `;
  }
}
