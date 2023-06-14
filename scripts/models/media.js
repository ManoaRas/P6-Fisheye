export class MediaModel {
  constructor(data) {
    this._data = data;
    this._date = data.date;
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._path = "assets/medias/";
    this._likes = data.likes;
    this._price = data.price;
  }

  get date() { return this._date; }
  get id() { return this._id; }
  get photographerId() { return this._photographerId; }
  get title() { return this._title; }
  get path() { return this._path; }
  get video() { return this._video }
  get likes() { return this._likes; }
  get price() { return this._price; }
}
