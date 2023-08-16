export class ContactFormView {
  constructor() {
    this.name = document.querySelector(".photographer__link--name").innerText;
  }

  #setPhotographerName(name) {
    // Title h2
    const h2 = document.createElement("h2");
    h2.classList.add("contact__header--title");
    h2.textContent = "Contactez-moi";
    h2.insertAdjacentHTML("beforeend", "<br />");
    h2.insertAdjacentHTML("beforeend", name);
    return h2;
  }

  #setCloseIcon() {
    // Close button
    const button = document.createElement("button");
    button.classList.add("contact__header--close");
    button.setAttribute("name", "close form");

    // Image
    const img = document.createElement("img");
    img.classList.add("close-icon");
    img.setAttribute("src", "assets/icons/close.svg");
    img.setAttribute("alt", "close contact form");

    button.append(img);
    return button;
  }

  #setFirstName() {
    // Label Firstname
    const labelFirstName = document.createElement("label");
    labelFirstName.setAttribute("for", "firstname");
    labelFirstName.textContent = "Prénom"

    // Input Firstname
    const inputFirstName = document.createElement("input");
    inputFirstName.classList.add("formData--input");
    inputFirstName.setAttribute("id", "firstname");
    inputFirstName.setAttribute("name", "firstname");
    inputFirstName.setAttribute("type", "text");
    inputFirstName.setAttribute("aria-label", "First name");

    // Error Firstname
    const errorFirstName = document.createElement("p");
    errorFirstName.classList.add("errorData");

    // Div formData
    const div = document.createElement("div");
    div.classList.add("formData");

    div.append(labelFirstName, inputFirstName, errorFirstName);
    return div;
  }

  #setLastName() {
    // Label Lastname
    const labelLastName = document.createElement("label");
    labelLastName.setAttribute("for", "lastname");
    labelLastName.textContent = "Nom"

    // Input Lastname
    const inputLastName = document.createElement("input");
    inputLastName.classList.add("formData--input");
    inputLastName.setAttribute("id", "lastname");
    inputLastName.setAttribute("name", "lastname");
    inputLastName.setAttribute("type", "text");
    inputLastName.setAttribute("aria-label", "Last name");

    // Error Lastname
    const errorLastName = document.createElement("p");
    errorLastName.classList.add("errorData");

    // Div formData
    const div = document.createElement("div");
    div.classList.add("formData");

    div.append(labelLastName, inputLastName, errorLastName);
    return div;
  }

  #setEmail() {
    // Label Email
    const labelEmail = document.createElement("label");
    labelEmail.setAttribute("for", "email");
    labelEmail.textContent = "Email"

    // Input Email
    const inputEmail = document.createElement("input");
    inputEmail.classList.add("formData--input");
    inputEmail.setAttribute("id", "email");
    inputEmail.setAttribute("name", "email");
    inputEmail.setAttribute("type", "text");
    inputEmail.setAttribute("aria-label", "Email");

    // Error Email
    const errorEmail = document.createElement("p");
    errorEmail.classList.add("errorData");

    // Div formData
    const div = document.createElement("div");
    div.classList.add("formData");

    div.append(labelEmail, inputEmail, errorEmail);
    return div;
  }

  #setMessage() {
    // Label Message
    const labelMessage = document.createElement("label");
    labelMessage.setAttribute("for", "message");
    labelMessage.textContent = "Votre message"

    // Textarea Message
    const textareaMessage = document.createElement("textarea");
    textareaMessage.classList.add("formData--input");
    textareaMessage.setAttribute("id", "message");
    textareaMessage.setAttribute("name", "message");
    textareaMessage.setAttribute("aria-label", "Your message");

    // Error Message
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("errorData");

    // Div formData
    const div = document.createElement("div");
    div.classList.add("formData");

    div.append(labelMessage, textareaMessage, errorMessage);
    return div;
  }

  #setButton() {
    const button = document.createElement("button");
    button.classList.add("contact__body--button");
    button.setAttribute("name", "send");
    button.setAttribute("type", "submit");
    button.setAttribute("aria-label", "Send");

    button.textContent = "Envoyer";
    return button;
  }

  #setForm(firstName, lastName, email, message, button) {
    // Define form
    const form = document.createElement("form");
    form.setAttribute("id", "form");
    form.setAttribute("name", "contact");
    form.setAttribute("action", "#");
    form.setAttribute("method", "get");

    form.append(firstName, lastName, email, message, button);
    return form;
  }

  _getHeaderModal() {
    // Header
    const header = document.createElement("header");
    header.classList.add("contact__header");

    // Photographer name
    const photographerName = this.#setPhotographerName(this.name)

    // Button close icon
    const closeIcon = this.#setCloseIcon();

    header.append(photographerName, closeIcon);
    return header;
  }

  _getBodyModal() {
    const div = document.createElement("div");
    div.classList.add("contact__body");

    // Combine all protected methods to create form
    const firstName = this.#setFirstName();
    const lastName = this.#setLastName();
    const email = this.#setEmail();
    const message = this.#setMessage();
    const button = this.#setButton();
    const form = this.#setForm(firstName, lastName, email, message, button);

    div.append(form);
    return div;
  }

  contactFormDOM() {
    const div = document.createElement("div");
    div.classList.add("modal");
    div.setAttribute("aria-label", `Contact me ${this.name}`);
    div.setAttribute("aria-modal", true);
    div.setAttribute("role", "dialog");
    div.setAttribute("tab-index", "-1");

    const headerModal = this._getHeaderModal();
    const bodyModal = this._getBodyModal();

    div.append(headerModal, bodyModal);
    return div;
  }
}
