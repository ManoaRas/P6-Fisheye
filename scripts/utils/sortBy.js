import { SortByViews } from '../views/sortBy.js';
import { MediaFactory } from '../factories/media.js';
import { LightBoxUtils } from '../utils/lightBox.js';

export class SortByUtil {
  constructor(data) {
    this.data = data;
    this._path = "assets/medias/";
    this._sortByViews = new SortByViews();
  }

  #handleSortbyPopularity(a, b) {
    const likesA = parseInt(a.likes);
    const likesB = parseInt(b.likes);
    if (likesA < likesB) return -1;
    if (likesA > likesB) return 1;
    return 0
  }

  #handleSortbyDate(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0
  }

  #handleSortbyTitle(a, b) {
    const titleA = a.title;
    const titleB = b.title;
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0
  }

  _handleSortby(sortbyValue) {
    switch(sortbyValue) {
      case 'Popularité':
        this.data.sort(this.#handleSortbyPopularity);
        break;
      case 'Date':
        this.data.sort(this.#handleSortbyDate);
        break;
      case 'Titre':
        this.data.sort(this.#handleSortbyTitle);
        break;
    }

    const mediasSection = document.querySelector('.medias-section');
    mediasSection.innerHTML = ''; // Clear the existing content before appending sorted elements
    this.data.forEach((media) => {
      const photographerMediasModel = new MediaFactory(media);
      mediasSection.append(photographerMediasModel.mediaCardDOM());
    });

    // Relancer la lightbox après le nouveau tri
    const lightBoxUtils = new LightBoxUtils(this.data);
    lightBoxUtils.init();
  }

  sortByData() {
    this._sortByViews.sortByDOM();
    const list = document.querySelector(".sortby__list");

    const sortByButtonElement = document.querySelector('.sortby__btn');
    sortByButtonElement.addEventListener('click', () => {
      sortByButtonElement.classList.toggle('open');
      list.classList.toggle('open');
    });

    const sortByValueElement = document.querySelector('.sortby__btn--value');
    const sortByItemsElements = document.querySelectorAll('.sortby__list--item');
    sortByItemsElements.forEach((element) => element.addEventListener('click', () => {
      sortByButtonElement.classList.toggle('open');
      list.classList.toggle('open');
      this._handleSortby(element.textContent);
      sortByValueElement.textContent = element.textContent;
    }));
  }
}
