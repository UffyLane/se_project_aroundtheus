import Popup from "../components/Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.previewImageModalImg =
      this.previewImageModal.querySelector(".modal__image");
    this.previewImageModalCaption =
      this.previewImageModal.querySelector(".modal__caption");
  }

  open(data) {
    this._popupElement;
    this._previewImageModalImg.src = data.link;
    this._previewImageModalImg.alt = data.name;
    this._previewImageModalCaption.textContent = data.name;
    super.open();
  }
}
