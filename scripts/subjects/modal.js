import { Subject } from './subject.js';

export class ModalSubject extends Subject {
  constructor() {
    super();
    this.modal = document.querySelector('.contact-modal');
  }

  openModal() {
    this.modal.style.overflow = 'hidden';
    this.modal.style.display = "block";
    this.modal.classList.add('active');

    this.dispatch();
  }

  closeModal() {
    this.modal.style.overflow = 'auto';
    this.modal.style.display = "none";
    this.modal.classList.remove('active');

    this.dispatch();
  }

  dispatch() {
    this.observers.forEach(observer => observer.update(this.modal));
  }
}
