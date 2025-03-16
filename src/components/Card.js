export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this.id = data.id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

g
  _setEventlisteners() {
    // on the setEventListeners of Card.js
    this._cardElement
      .querySelector("#card-like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //".card__trash-button"
    this._cardElement
      .querySelector("#card-trash-button")
      .addEventListener("click", () => {
        this._handleTrashIcon();
      });

    
 
      this._cardImage.addEventListener("click", () =>
        this._handleImageClick({ link: this._link, text: this._text })
      );
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector("#card-like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector("#card-id")
      .cloneNode(true);
    this._cardCaption = this._cardElement.querySelector("#card-title-id");
    this._cardImage = this._cardElement.querySelector("#card__image-modal");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    //get the card view
    //set event listeners
    this._setEventlisteners();
    return this._cardElement;
  }
}
