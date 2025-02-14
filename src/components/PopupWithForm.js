import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {}

  setEventListeners() {
    this._popupElement.addEventListener("submit", handleProfileEditSubmit);
    this._popupElement.addEventListener("submit", handleAddCardFormSubmit);
  }
}
