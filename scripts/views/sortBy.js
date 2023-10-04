export class SortByViews {
  #setBtnValue() {
    const span = document.createElement("span");
    span.classList.add("sortby__btn--value");
    span.textContent = "Popularité";
    return (span)
  }

  #setBtnIcon() {
    const i = document.createElement("i");
    i.classList.add("sortby__btn--icon");

    const img = document.createElement("img");
    img.setAttribute("src", "assets/icons/sortby.svg");

    i.append(img);
    return i;
  }

  _setList1() {
    const li1 = document.createElement("li");
    li1.classList.add("sortby__list--item");
    li1.textContent = "Popularité";
    return li1;
  }

  _setList2() {
    const li2 = document.createElement("li");
    li2.classList.add("sortby__list--item");
    li2.textContent = "Date";
    return li2;
  }

  _setList3() {
    const li3 = document.createElement("li");
    li3.classList.add("sortby__list--item");
    li3.textContent = "Titre";

    return li3;
  }

  _getButton() {
    const btnValue = this.#setBtnValue();
    const btnIcon = this.#setBtnIcon();

    const button = document.createElement("button");
    button.classList.add("sortby__btn");
    button.setAttribute("type", "button");
    button.setAttribute('aria-labelledby', 'sortBy')
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute('aria-haspopup', 'listbox')

    button.append(btnValue, btnIcon);
    return button;
  }

  _getList() {
    const setList1 = this._setList1();
    const setList2 = this._setList2();
    const setList3 = this._setList3();

    const ul = document.createElement("ul");
    ul.classList.add("sortby__list");
    ul.setAttribute('aria-labelledby', 'sortBy')
    ul.setAttribute('aria-activedescendant', 'popularity')
    ul.setAttribute('aria-selected', 'true')
    ul.setAttribute('role', 'listbox')

    ul.append(setList1, setList2, setList3);
    return ul;
  }

  _getLabel() {
    const label = document.createElement("label");
    label.textContent = "Trier par";
    return label;
  }

  _getButtonList() {
    const button = this._getButton();
    const list = this._getList();

    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    dropdown.append(button, list);

    const sortby = document.createElement("div");
    sortby.classList.add("sortby");
    sortby.appendChild(dropdown);
    return sortby;
  }

  sortByDOM() {
    const title = this._getLabel();
    const buttonList = this._getButtonList();
    const sort = document.querySelector(".sort");

    sort.append(title, buttonList);
    return sort;
  }
}
