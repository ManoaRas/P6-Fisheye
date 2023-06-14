import { checkInput, schemas } from '../utils/checkIsInvalid.js';

export class ContactFormContainer {
  // #handleIsInvalid() {
  //   console.log(checkInput)
  //   return (checkInput('#firstName', schemas.letters) || checkInput('#lastName', schemas.letters) || checkInput('#email', schemas.email)) || checkInput('#message', schemas.lettersDigit) ? true : false;
  // }

  handleSubmit(e) {
    e.preventDefault();

    // if (this.#handleIsInvalid()) return false;

    const formData = new FormData(e.target);
    const result = Object.fromEntries(formData.entries());
    console.log("contact: ", result);
    return true
  }
}
