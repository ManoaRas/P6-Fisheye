export class MediaView {
  constructor(data) {
    this.data = data;
  }

  _setTitle(title) {
    const dataTitle = document.createElement("span");
    dataTitle.classList.add("title");
    dataTitle.textContent = `${title}`
    return dataTitle;
  }

  _setLikes(likes) {
    const dataLikes = document.createElement("span");
    dataLikes.classList.add("like-text");
    dataLikes.textContent = `${likes}`;
    return dataLikes;
  }

  _setIcon() {
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
    article.classList.add("media_card");
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

  _createLink(title, media) {
    const link = document.createElement("a");
    link.classList.add("lnk-media");
    link.classList.add("open");
    link.href = "#";
    link.setAttribute("aria-label", title + "closeup view");

    const figure = document.createElement('figure');
    figure.classList.add('media');
    figure.appendChild(media);
    link.append(figure);
    return link
  }

  mediaCardDOM() {
    const article = this._createArticle(this.data.id, this.data.likes, this.data.date, this.data.title);
    const caption = this._createCaption(this.data.title, this.data.likes);
    const link = this._createLink(this.data.title, this.data.media);
    article.append(link, caption);
    return article;
  }
}
