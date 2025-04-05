import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit,}) {
    super({ popupSelector});
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._inputList = this._popupElement.querySelectorAll('.modal__input');
  
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  _submit(evt) { //this method is to be called when form is submited
    evt.preventDefault();
    console.log(this);
    this._handleFormSubmit(this._getInputValues()); //call external callback _handleFormSubmit
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    //Use 'this._submit' bounded method instead of anonymous function
    this._popupForm.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues()); 
    this.close();
    } );
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
