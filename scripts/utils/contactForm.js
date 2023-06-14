export class contactForm {
  constructor() {
    this.modal = document.getElementById("contact_modal");
  }

  displayModal() {
    const contactMeText = document.getElementById("modal_title");
    const firstNameInput = document.getElementById("first-name");
    const btn = document.querySelector(".send_form");
    const closeBtn = document.querySelector(".close_form");
    const photographerName = document.querySelector(".photographer__link--name").innerText;

    this.modal.setAttribute("aria-label", "Contact me " + photographerName);
    contactMeText.textContent = `Contactez-moi <br/> ${ photographerName }`;
    this.modal.style.display = "block";

    // When the contact modal opens, we set the focus on the first form field
    firstNameInput.focus();

    // On click on the 'send' button, the user's inputs are logged in the console
    if (btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        setTimeout(function() {
          console.log("Prénom : ", firstName);
          console.log("Nom : ", lastName);
          console.log("Email : ", email);
          console.log("Message : ", message);
        }, 2000);
      });
    }
    // Close the contact modal, for keyboard navigation
    document.addEventListener('keypress', function(e) {
      if (closeBtn === document.activeElement && e.key === 'Enter') {
        this.modal.style.display = "none";
      }
    });
  }

  // Close the contact modal on click on the cross icon
  closeModal() {
    this.modal.style.display = "none";
  }
}
