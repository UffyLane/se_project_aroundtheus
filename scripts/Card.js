export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventlisteners() {
    //".card__like-button"
    //".card__trash-button"
  }

  getView() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true);
    console.log(cardElement);
    //get the card view
    //set event listeners
    this._setEventlisteners();
    // return the card
  }
}
