export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._modal.classList.add("modal_opened");
    this._document.addEventListener("keydown", closeModalOnEsc);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    this._document.removeEventListener("keydown", closeModalOnEsc);
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal__close") ||
        e.target.classList.contains("modal")
      ) {
        this.close();
      }
    });
  }
}
