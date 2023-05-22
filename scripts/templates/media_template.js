export class MediaTemplate {
  constructor(data) {
    this._data = data;
  }

  getMediaCardDOM() {
    return `
      <article data-id="${this._data.id}" data-user-like="false" data-likes="${this._data.likes}" data-date="${this._data.date}" data-title="${this._data.title}">
        <a class="lnk-media open" href="#" aria-label="${this._data.title}, closeup view">
          ${this._data.media}
        </a>
        <p class="caption">
          <span class="title">${this._data.title}</span>
          <span class="like-text">${this._data.likes}</span>
          <span class="like-icon" aria-label="like" role="button" tabindex="0"><i class="far fa-heart"></i></span>
        </p>
      </article>
    `;
  }
}
