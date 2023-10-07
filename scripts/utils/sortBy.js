import { SortByViews } from '../views/sortBy.js';
import { MediaFactory } from '../factories/media.js';
import { LightBoxUtils } from '../utils/lightBox.js';
import { LikesUtils } from '../utils/likes.js';

export class SortByUtil {
  constructor(photographer, media) {
    this._photographer = photographer;
    this._media = media;
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
        this._media.sort(this.#handleSortbyPopularity);
        break;
      case 'Date':
        this._media.sort(this.#handleSortbyDate);
        break;
      case 'Titre':
        this._media.sort(this.#handleSortbyTitle);
        break;
    }

    // When handle sort then set up medias and likes with new sort paramater
    const mediasSection = document.querySelector('.medias-section');
    mediasSection.innerHTML = ''; // Clear the existing content before appending sorted elements
    this._media.forEach((media) => {
      const photographerMediasModel = new MediaFactory(media);
      mediasSection.append(photographerMediasModel.mediaCardDOM());
    });

    // Reattach like event handlers after sorting
    const likesUtils = new LikesUtils(this._photographer);
    likesUtils.init();

    // Relancer la lightbox après le nouveau tri
    const lightBoxUtils = new LightBoxUtils(this._media);
    lightBoxUtils.init();
  }

  sortByData() {
    this._sortByViews.sortByDOM();
    const list = document.querySelector(".sortby__list");
    const sortByButtonElement = document.querySelector('.sortby__btn');
    const sortByValueElement = document.querySelector('.sortby__btn--value');
    const sortByItemsElements = document.querySelectorAll('.sortby__list--item');

    // Variable pour suivre l'index actuel de l'élément sélectionné
    let selectedIndex = 0;

    // Fonction pour mettre à jour la sélection
    const updateSelection = () => {
      sortByItemsElements.forEach((element, index) => {
        element.classList.toggle('selected', index === selectedIndex);
      });
    };

    // Gestionnaire d'événement pour ouvrir/fermer le dropdown
    const toggleDropdown = () => {
      sortByButtonElement.classList.toggle('open');
      list.classList.toggle('open');

      if (list.classList.contains('open')) {
        // Réinitialiser la sélection lorsque le dropdown est ouvert
        selectedIndex = 0;
        updateSelection();
      }
    };

    sortByButtonElement.addEventListener('click', toggleDropdown);

    // Gestionnaire d'événement pour la navigation au clavier
    document.addEventListener('keydown', (e) => {
      if (list.classList.contains('open')) {
        if (e.key === 'ArrowDown') {
          // Flèche vers le bas : déplacer la sélection vers le bas
          selectedIndex = Math.min(selectedIndex + 1, sortByItemsElements.length - 1);
          updateSelection();
        } else if (e.key === 'ArrowUp') {
          // Flèche vers le haut : déplacer la sélection vers le haut
          selectedIndex = Math.max(selectedIndex - 1, 0);
          updateSelection();
        } else if (e.key === 'Enter') {
          // Touche Entrée : appliquer la sélection
          const selectedElement = sortByItemsElements[selectedIndex];
          this._handleSortby(selectedElement.textContent);
          sortByValueElement.textContent = selectedElement.textContent;
          toggleDropdown();
        } else if (e.key === 'Escape') {
          // Touche Échap : fermer le dropdown
          toggleDropdown();
        }
      }
    });

    // Gestionnaire d'événement pour les éléments de la liste
    sortByItemsElements.forEach((element, index) => {
      element.addEventListener('click', () => {
        this._handleSortby(element.textContent);
        sortByValueElement.textContent = element.textContent;
        toggleDropdown();
      });

      element.addEventListener('mouseenter', () => {
        selectedIndex = index;
        updateSelection();
      });
    });
  }
}
