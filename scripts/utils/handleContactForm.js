import { checkInput, schemas } from './checkIsInvalid.js';

export class HandleContactFormUtil {
  #handleIsInvalid() {
    return (
      checkInput('#firstname', schemas.formName) ||
      checkInput('#lastname', schemas.formName) ||
      checkInput('#email', schemas.formEmail) ||
      checkInput('#message', schemas.formMessage)
        ? true
        : false
    )
  }

  _handleSubmit(e) {
    e.preventDefault();

    if (this.#handleIsInvalid()) return false;

    const formData = new FormData(e.target);
    const result = Object.fromEntries(formData.entries());
    console.log("contact: ", result);
    return true
  }
}
