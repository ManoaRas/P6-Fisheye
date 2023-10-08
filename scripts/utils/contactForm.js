import { HandleContactFormUtil } from '../utils/handleContactForm.js';
import { ContactFormView } from "../views/contactForm.js";

export class ContactFormUtil {
  constructor() {
    this.handleContactFormUtil = new HandleContactFormUtil();
    this.modalView = new ContactFormView();
    this.bodyPage = document.querySelector("body");
    this.photographerModal = document.querySelector(".contact");
    this.contactFormButtonElement = document.querySelector('.contact-me .button');
  }

  #openModal(open, body) {
    open.style.display = "flex";
    open.classList.add('active');
    body.style.overflow = "hidden";

    // Trouvez l'élément à mettre au focus (par exemple, un champ de texte)
    const inputField = open.querySelector('#firstname');

    // Mettez le focus sur l'élément
    if (inputField) {
      inputField.focus();
    }
  }

  #closeModal(close, body) {
    close.style.display = "none";
    close.classList.remove('active');
    body.style.overflow = "auto";
  }

  contactFormData() {
    this.photographerModal.append(this.modalView.contactFormDOM());

    // Modal fermeture
    const closeBtn = document.querySelector('.contact__header--close');
    closeBtn.addEventListener('click', () => {
      this.#closeModal(this.photographerModal, this.bodyPage);
    });

    this.photographerModal.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.handleContactFormUtil._handleSubmit(event)) {
        this.#closeModal(this.photographerModal, this.bodyPage);
      }
    });

    // Modal ouverture
    if (this.contactFormButtonElement) {
      this.contactFormButtonElement.addEventListener('click', () => {
        this.#openModal(this.photographerModal, this.bodyPage);
      });
    }
  }
}
