import Popup from "../components/Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImageModalImg =
      this._popupElement.querySelector(".modal__image");
    this._previewImageModalCaption =
      this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    this._previewImageModalImg.src = data.link;
    this._previewImageModalImg.alt = data.name;
    this._previewImageModalCaption.textContent = data.name;
    super.open();
  }
}
