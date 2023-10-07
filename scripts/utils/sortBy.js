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

    // Relaunch lightbox after resorting
    const lightBoxUtils = new LightBoxUtils(this._media);
    lightBoxUtils.init();
  }

  // Function to remove the currently selected item from the list
  removeSelectedItem() {
    const sortByValueElement = document.querySelector('.sortby__btn--value');
    const sortByItemsElements = document.querySelectorAll('.sortby__list--item');
    const selectedIndex = Array.from(sortByItemsElements).findIndex((element) =>
      element.textContent === sortByValueElement.textContent
    );
    if (selectedIndex !== -1) {
      sortByItemsElements[selectedIndex].style.display = 'none';
    }
  }

  // Function to show a hidden item
  showHiddenItem(itemText) {
    const sortByItemsElements = document.querySelectorAll('.sortby__list--item');
    const itemToDisplay = Array.from(sortByItemsElements).find(
      (element) => element.textContent === itemText
    );
    if (itemToDisplay) {
      itemToDisplay.style.display = 'block';
    }
  }

  sortByData() {
    this._sortByViews.sortByDOM();
    const list = document.querySelector(".sortby__list");
    const sortByButtonElement = document.querySelector('.sortby__btn');
    const sortByValueElement = document.querySelector('.sortby__btn--value');
    const sortByItemsElements = document.querySelectorAll('.sortby__list--item');

    // Variable to track the current index of the selected item
    let selectedIndex = 0;

    // Function to update the selection
    const updateSelection = () => {
      sortByItemsElements.forEach((element, index) => {
        element.classList.toggle('selected', index === selectedIndex);
      });
    };

    // Event handler to open/close dropdown
    const toggleDropdown = () => {
      sortByButtonElement.classList.toggle('open');
      list.classList.toggle('open');

      if (list.classList.contains('open')) {
        // Reset selection when dropdown is open
        selectedIndex = 0;
        updateSelection();
      }
    };

    sortByButtonElement.addEventListener('click', toggleDropdown);

    // Event manager for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (list.classList.contains('open')) {
        if (e.key === 'ArrowDown') {
          // Down arrow: move selection downwards
          selectedIndex = Math.min(selectedIndex + 1, sortByItemsElements.length - 1);
          updateSelection();
        } else if (e.key === 'ArrowUp') {
          // Up arrow: move selection upwards
          selectedIndex = Math.max(selectedIndex - 1, 0);
          updateSelection();
        } else if (e.key === 'Enter') {
          // Enter key: apply selection
          const selectedElement = sortByItemsElements[selectedIndex];
          this._handleSortby(selectedElement.textContent);
          sortByValueElement.textContent = selectedElement.textContent;
          toggleDropdown();
        } else if (e.key === 'Escape') {
          // Escape key: close dropdown
          toggleDropdown();
        }
      }
    });

    this.removeSelectedItem(); // Call this function to remove the initial selection

    // Event handler for list items
    sortByItemsElements.forEach((element, index) => {
      element.addEventListener('click', () => {
        this._handleSortby(element.textContent);
        const selectedValue = sortByValueElement.textContent;
        sortByValueElement.textContent = element.textContent;
        toggleDropdown();

        // Show the previously hidden item
        if (selectedValue !== element.textContent) {
          this.showHiddenItem(selectedValue);
        }

        element.style.display = 'none'; // Hide the selected item
      });

      element.addEventListener('mouseenter', () => {
        selectedIndex = index;
        updateSelection();
      });
    });
  }
}
