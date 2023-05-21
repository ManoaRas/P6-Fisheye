export class MediaModel {
  constructor(data) {
    this._data = data;
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._path = "assets/medias/";
    // console.log(data)
  }

  get id() { return this._id; }

  get photographerId() { return this._photographerId; }

  get title() { return this._title; }

  get likes() { return this._likes; }

  get date() { return this._date; }

  get price() { return this._price; }

  get path() { return this._path; }

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
