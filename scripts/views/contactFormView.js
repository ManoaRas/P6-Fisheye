export class ContactFormViews {
  constructor(data) {
    this.data = data;
  }

  _setFirstName() {
    const labelFirstName = document.createElement("label");
    const inputFirstName = document.createElement("input");

    labelFirstName.setAttribute("for", "firstname");
    labelFirstName.textContent = "Prénom"
    inputFirstName.setAttribute("id", "firstname");
    inputFirstName.classList.add("firstname-input");
    inputFirstName.setAttribute("name", "firstname");
    inputFirstName.setAttribute("type", "text");
    inputFirstName.setAttribute("aria-label", "First name");

    return (labelFirstName, inputFirstName)
  }

  _setLastName() {
    const labelLastName = document.createElement("label");
    const inputLastName = document.createElement("input");

    labelLastName.setAttribute("for", "lastname");
    labelLastName.textContent = "Nom"
    inputLastName.setAttribute("id", "lastname");
    inputLastName.classList.add("lastname-input");
    inputLastName.setAttribute("name", "lastname");
    inputLastName.setAttribute("type", "text");
    inputLastName.setAttribute("aria-label", "Last name");

    return (labelLastName, inputLastName)
  }

  _setEmail() {
    const labelEmail = document.createElement("label");
    const inputEmail = document.createElement("input");

    labelEmail.setAttribute("for", "email");
    labelEmail.textContent = "Email"
    inputEmail.setAttribute("id", "email");
    inputEmail.classList.add("email-input");
    inputEmail.setAttribute("name", "email");
    inputEmail.setAttribute("type", "text");
    inputEmail.setAttribute("aria-label", "Email");

    return (labelEmail, inputEmail)
  }

  _setMessage() {
    const labelMessage = document.createElement("label");
    const textareaMessage = document.createElement("textarea");

    labelMessage.setAttribute("for", "message");
    labelMessage.textContent = "Votre message"
    textareaMessage.setAttribute("id", "message");
    textareaMessage.classList.add("message-input");
    textareaMessage.setAttribute("name", "message");
    textareaMessage.setAttribute("aria-label", "Your message");

    return (labelMessage, textareaMessage)
  }

  _setButton() {
    const button = document.createElement("button");
    // button.classList.add("button send_form");
    button.setAttribute("name", "send");
    button.setAttribute("type", "submit");

    button.textContent = "Envoyer";

    return button
  }

  _getHeaderModal() {
    const header = document.createElement("header");
    const h2 = document.createElement("h2");
    const button = document.createElement("button");
    const img = document.createElement("img");

    const photographerName = document.querySelector(".photographer__link--name").innerText;
    h2.classList.add("contact-modal__title")
    h2.textContent = `Contactez-moi <br/> ${ photographerName }`
    button.classList.add("close_form");
    button.setAttribute("name", "close form");
    img.setAttribute("src", "assets/icons/close.svg");
    img.classList.add("close_form");
    img.setAttribute("alt", "close contact form");

    button.append(img);
    header.append(h2, button);

    return header
  }

  contactFormDOM() {
    const form = document.createElement("form");
    const header = this._getHeaderModal();
    const div = document.createElement("div");

    const firstName = this._setFirstName();
    const lastName = this._setLastName();
    const email = this._setEmail();
    const message = this._setMessage();
    const button = this._setButton();

    form.setAttribute("name", "contact");
    form.setAttribute("id", "form");
    div.classList.add("formData");

    div.append(firstName, lastName, email, message);
    form.append(header, div, button);

    return form
  }
}
