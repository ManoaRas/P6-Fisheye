export class MediaView {
  constructor(data) {
    this._data = data;
    console.log(data)
  }

  _setImage(path, medias, title) {
    const img = document.createElement("img");
    img.setAttribute("src", `${path + medias}`);
    img.setAttribute("alt", title);
    return img;
  }

  _setVideo(path, medias, extension) {
    const video = document.createElement("video");
    video.classList.add("media");
    video.setAttribute("tabindex", "-1");
    const source = document.createElement("source");
    source.setAttribute("src", `${path + medias}`);
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

  _setTitle(title) {
    // Element in caption
    const dataTitle = document.createElement("span");
    dataTitle.classList.add("title");
    dataTitle.textContent = `${title}`

    return dataTitle;
  }

  _setLikes(likes) {
    // Element in caption
    const dataLikes = document.createElement("span");
    dataLikes.classList.add("like-text");
    dataLikes.textContent = `${likes}`;

    return dataLikes;
  }

  _setIcon() {
    // Element in caption
    const dataIcon = document.createElement("span");
    dataIcon.classList.add("like-icon");
    dataIcon.setAttribute("aria-label", "like");
    dataIcon.setAttribute("role", "button");
    dataIcon.setAttribute("tabindex", "0");

    const icon = document.createElement("i");
    icon.classList.add("far");
    icon.classList.add("fa-heart");

    dataIcon.append(icon);

    return dataIcon;
  }

  _createArticle(id, likes, date, title) {
    const article = document.createElement("article");
    article.setAttribute("data-id", id);
    article.setAttribute("data-user-like", "false");
    article.setAttribute("data-likes", likes);
    article.setAttribute("data-date", date);
    article.setAttribute("data-title", title);

    return article;
  }

  _createCaption(title, likes) {
    const caption = document.createElement("p");
    caption.classList.add("caption");

    const captionTitle = this._setTitle(title);
    const captionLikes = this._setLikes(likes);
    const captionIcon = this._setIcon();

    caption.append(captionTitle, captionLikes, captionIcon);

    return caption;
  }

  _createLink(title, path, image, video) {
    const link = document.createElement("a");
    link.classList.add("lnk-media");
    link.classList.add("open");
    link.href = "#";
    link.setAttribute("aria-label", title + "closeup view");

    const figure = document.createElement('figure');
    figure.classList.add('media');

    let media = undefined
    if (image) {
      media = this._setImage(path, image, title)
    } else {
      const extension = video.split(".")[1];
      media = this._setVideo(path, video, extension)
    }

    console.log(media)

    figure.append(media);
    link.append(figure);
    return link
  }

  getMediaCardDOM() {
    const article = this._createArticle(this._data.id, this._data.likes, this._data.date, this._data.title);
    const caption = this._createCaption(this._data.title, this._data.likes);
    const link = this._createLink(this._data.title, this._data.path, this._data.image, this._data.video);
    article.append(link, caption);
    return article;
  }
}
