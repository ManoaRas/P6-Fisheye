import { ContactFormViews } from '../views/contactForm.js';
import { ContactFormContainer } from '../containers/contactForm.js';

export class ContactFormObserver {
  constructor(modalSubject) {
    this.modalSubject = modalSubject;
    this.contactform = new ContactFormViews();
    this.contactFormContainer = new ContactFormContainer();
  }

  update(modal) {
    const contactModal = document.querySelector('.contact-modal');
    const closeButtonElement = document.querySelector('.close_form');

    console.log(modal)

    if (modal) {
      modal.append(this.contactform.contactFormDOM());
    }

    if (contactModal) {
      contactModal.addEventListener('submit', e => {
        if (this.contactFormContainer.handleSubmit(e)) {
          this.modalSubject.closeModal();
          this.modalSubject.detach(this);
        }
      });
    } else {
      closeButtonElement.addEventListener('click', () => {
        this.modalSubject.closeModal();
        this.modalSubject.detach(this);
      });
    }
  }

  init() {
    const contactFormButtonElement = document.querySelector('.contact-me');
    contactFormButtonElement.addEventListener('click', () => {
      this.modalSubject.attach(this);
      this.modalSubject.openModal();

      const name = document.querySelector(".photographer__link--name").innerText;
      const h2 = document.querySelector('.contact-modal__title');
      h2.textContent = `Contactez-moi ${ name }`;
    });
  }
}
