export const schemas = {
  letters: {
    regex: /^[A-Za-z-À-ÿ-' ]+$/,
    message: "Veuillez saisir un nom valide"
  },
  lettersDigit: {
    regex: /^[0-9A-Za-zÀ-ÿ-', ]+$/,
    message: 'Veuillez saisir des chiffres et des lettres uniquement',
  },
  email: {
    regex: /[a-z0-9.-_]+@[a-z0-9]+\.[a-z]{2,3}/,
    message: "Veuillez entrer un email valide"
  }
};

export const checkInput = (id, schema) => {
  const formDataElements = [ ...document.querySelectorAll(".formData") ];
  const formDataElement = formDataElements.find(el => el.querySelector(id));
  const inputElement = formDataElement.querySelector("input") || formDataElement.querySelector("textarea");
  console.log('inputElement: ')
  const inputValue = inputElement.value.trim();
  console.log('inputValue: ', inputValue)

  try {
    if (inputValue === "") throw new Error("Veuillez remplir ce champ");
    else if (!schema.regex.test(inputValue)) throw new Error(schema.message);
    else if (inputValue.length < 3) throw new Error("Veuillez saisir 3 caractères ou plus");

    formDataElement.removeAttribute("data-error");
    return false;
  } catch (error) {
    formDataElement.setAttribute("data-error", error.message);
    return true;
  }
}
