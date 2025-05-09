export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDelete,
    handleLike
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.handleDelete = handleDelete;
    this.handleLike = handleLike;
    this._isLiked = cardData.isLiked;
  }

  getId() {
    return this._id;
  }

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
        this.handleDelete(this);
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

  handleTrashIcon() {
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
    this._cardLikeButton = this._cardElement.querySelector("#card-like-button");
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    this.updateLikesView();
    this._setEventlisteners();
    return this._cardElement;
  }

  isLiked() {
    return this._isLiked;
  }

  updateLikesView() {
    if (this.isLiked()) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }
}
