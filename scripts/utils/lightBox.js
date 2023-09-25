export class LightBoxUtils {
  constructor(medias) {
    // Data
    this.medias = medias;

    // Document selector
    this.lightBox = document.querySelector('.lightbox')
    this.lightBoxWrapper = document.querySelector('.lightbox_wrapper');
    this.lightBoxMedia = document.querySelector('.lightbox_media');
    this.btnClose = document.querySelector('.btn_close_lightbox');
    this.btnPrevious = document.querySelector('.btn_previous');
    this.btnNext = document.querySelector('.btn_next');
    this.mediaProvider = Array.from(document.querySelectorAll('.media_card a'));

    // Init lightBox
    this.lightBoxMedia.innerHTML = '';
    this.currentIndex = 0;
  }

  _lightBoxTemplate() {
    const currentMedia = this.medias[this.currentIndex];
    console.log(this.medias)
    console.log(this.currentIndex)
    if (currentMedia.hasOwnProperty('image')) {
      this.lightBoxMedia.innerHTML += `
        <img src="./assets/medias/${currentMedia.image}" alt="${currentMedia.title}" style="height: 50vh">
      `;
    } else {
      this.lightBoxMedia.innerHTML += `
        <video controls aria-label="${currentMedia.title}"><source src="./assets/medias/${currentMedia.video}" type="video/mp4" style="height: 50vh"></video>
      `;
    }
    this.lightBoxMedia.innerHTML += `
      <figcaption>${currentMedia.title}</figcaption>
    `;
  };

  _closeLightbox() {
    this.lightBoxWrapper.style.display = 'none';
    this.lightBoxMedia.innerHTML = '';
  };

  _nextMedia() {
    this.currentIndex++;
    if (this.currentIndex > this.medias.length - 1) this.currentIndex = 0;
    this._lightBoxTemplate();
    this._showActiveBtn(this.btnNext);
  };

  _previousMedia() {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = this.medias.length - 1;
    this._lightBoxTemplate();
    this._showActiveBtn(this.btnPrevious);
  };

  _showActiveBtn(btn) {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 100);
  };

  #shortCut() {
    this.lightBox.addEventListener('keyup', (e) => {
      switch(e.key) {
        case 'Escape':
          this._closeLightbox();
          break;
        case 'ArrowLeft':
          this._previousMedia();
          break;
        case 'ArrowRight':
          this._nextMedia();
          break;
      };
    });
  }

  init() {
    this.mediaProvider.forEach((media) => {
      media.addEventListener('click', () => {
        const mediaId = media.parentNode.dataset.id;
        const mediaIndex = this.medias.findIndex((media) => media.id == mediaId);
        this.currentIndex = mediaIndex;
        this.lightBoxWrapper.style.display = 'flex';
        this.btnClose.focus();
        this._lightBoxTemplate(this.currentIndex);
      });
    });
    this.btnPrevious.addEventListener('click', () => this._previousMedia());
    this.btnNext.addEventListener('click', () => this._nextMedia());
    this.btnClose.addEventListener('click', () => this._closeLightbox());
    this.#shortCut();
  }
};
