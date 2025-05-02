/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Api)
/* harmony export */ });
class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    }).then(res => res.json()).then(this._checkResponse);
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    }).then(res => res.json()).then(this._checkResponse);
  }
  fetchInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
  editprofileInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse);
  }
  addCardModal(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkResponse);
  }
  removeCard(CardID) {
    return fetch(`${this.baseUrl}/cards/${CardID}`, {
      method: "DELETE",
      headers: this.headers
    }).then(this._checkResponse);
  }
  likeCard(CardID) {
    return fetch(`${this.baseUrl}/cards/${CardID}/likes`, {
      method: "PUT",
      headers: this.headers
    }).then(this._checkResponse);
  }
  dislikeCard(CardID) {
    return fetch(`${this.baseUrl}/cards/${CardID}/likes`, {
      method: "DELETE",
      headers: this.headers
    }).then(this._checkResponse);
  }
  avatarModal(_ref) {
    let {
      avatar
    } = _ref;
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    }).then(this._checkResponse);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`There has been an error`);
  }
}

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Card)
/* harmony export */ });
class Card {
  constructor(cardData, cardSelector, handleImageClick, handleDelete, handleLike) {
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
    this._cardElement.querySelector("#card-like-button").addEventListener("click", () => {
      this._handleLikeIcon();
      this.handleLike(this);
    });

    //".card__trash-button"
    this._cardElement.querySelector("#card-trash-button").addEventListener("click", () => {
      this.handleDelete(this);
    });
    this._cardImage.addEventListener("click", () => this._handleImageClick({
      link: this._link,
      text: this._text
    }));
  }
  _handleLikeIcon() {
    this._cardElement.querySelector("#card-like-button").classList.toggle("card__like-button_active");
  }
  _handleTrashIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  getView() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector("#card-id").cloneNode(true);
    this._cardCaption = this._cardElement.querySelector("#card-title-id");
    this._cardImage = this._cardElement.querySelector("#card__image-modal");
    this._cardImage.src = this._link;
    this._cardLikeButton = this._cardElement.querySelector("#card-like-button");
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    this._updateLikesView();
    this._setEventlisteners();
    return this._cardElement;
  }
  isLiked() {
    return this._isLiked;
  }
  _updateLikesView() {
    if (this.isLiked()) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }
}

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormValidator)
/* harmony export */ });
class FormValidator {
  constructor(_ref) {
    let {
      formEl,
      config
    } = _ref;
    this._formEl = formEl;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = config.formSelector;
  }
  _showInputError(inputEl) {
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }
  _hasInvalidInput() {
    return !this._inputEls.every(inputEl => inputEl.validity.valid);
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton(); // disable if the form is invalid
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass); // enable the button using the styles
      this._submitButton.disabled = false; // enable the button using the `disabled ` attribute
    }
  }
  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.enabled = true;
    return;
  }
  _setEventlisteners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach(inputEl => {
      inputEl.addEventListener("input", e => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._setEventlisteners();
  }
  resetValidation() {
    this._toggleButtonState();
  }
}

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
class Popup {
  constructor(_ref) {
    let {
      popupSelector
    } = _ref;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("click", e => {
      if (e.target.classList.contains("modal__close") || e.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}

/***/ }),

/***/ "./src/components/PopupWithConfirm.js":
/*!********************************************!*\
  !*** ./src/components/PopupWithConfirm.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Popup */ "./src/components/Popup.js");

class PopupWithConfirm extends _components_Popup__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(_ref) {
    let {
      popupSelector
    } = _ref;
    super({
      popupSelector
    });
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonContent = this._submitButton.textContent;
  }
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }
  setEventListeners() {
    this._popupElement.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    super.setEventListeners();
  }
  setLoading(isLoading) {
    let loadingText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Saving...";
    if (isLoading) {
      // if loading use the loading text
      this._submitButton.textContent = loadingText;
    } else {
      // if not loading use the submitButtonContent
      this._submitButton.textContent = this._submitButtonContent;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopupWithConfirm);

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/components/Popup.js");

class PopupWithForm extends _Popup__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(_ref) {
    let {
      popupSelector,
      handleFormSubmit
    } = _ref;
    super({
      popupSelector
    });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonContent = this._submitButton.textContent;
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  _submit(evt) {
    //this method is to be called when form is submited
    evt.preventDefault();
    console.log(this);
    this._handleFormSubmit(this._getInputValues()); //call external callback _handleFormSubmit
    this.close();
  }
  setEventListeners() {
    super.setEventListeners();
    //Use 'this._submit' bounded method instead of anonymous function
    this._popupForm.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
  close() {
    this._popupForm.reset();
    super.close();
  }
  setLoading(isLoading) {
    let loadingText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Saving...";
    if (isLoading) {
      // if loading use the loading text
      this._submitButton.textContent = loadingText;
    } else {
      // if not loading use the submitButtonContent
      this._submitButton.textContent = this._submitButtonContent;
    }
  }
}

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _components_Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Popup */ "./src/components/Popup.js");

class PopupWithImage extends _components_Popup__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector) {
    super({
      popupSelector
    });
    this._previewImageModalImg = this._popupElement.querySelector(".modal__image");
    this._previewImageModalCaption = this._popupElement.querySelector(".modal__caption");
  }
  open(data) {
    this._previewImageModalImg.src = data.link;
    this._previewImageModalImg.alt = data.name;
    this._previewImageModalCaption.textContent = data.name;
    super.open();
  }
}

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Section)
/* harmony export */ });
class Section {
  constructor(_ref, selector) {
    let {
      renderer
    } = _ref;
    this._renderer = renderer;
    this._element = document.querySelector(`${selector}`);
  }
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
  addItems(item) {
    this._element.prepend(item);
  }
}

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserInfo)
/* harmony export */ });
class UserInfo {
  constructor(_ref) {
    let {
      profileTitle,
      profileDescription,
      profileAvatar
    } = _ref;
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
    this._profileAvatar = profileAvatar;
  }
  getUserInfo() {
    return {
      profileTitle: this._profileTitle.textContent,
      profileDescription: this._profileDescription.textContent,
      profileAvatar: this._profileAvatar.src
    };
  }
  setUserInfo(_ref2) {
    let {
      name,
      about,
      avatar
    } = _ref2;
    if (name) this._profileTitle.textContent = name;
    if (about) this._profileDescription.textContent = about;
    if (avatar) this._profileAvatar.src = avatar;
  }
}

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   selectors: () => (/* binding */ selectors)
/* harmony export */ });
const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  previewImageModal: "#preview-image-modal"
};
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/pages/index.css");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Card */ "./src/components/Card.js");
/* harmony import */ var _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/FormValidator */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Section__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Section */ "./src/components/Section.js");
/* harmony import */ var _components_PopupWithImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithImage */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithForm */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_UserInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/UserInfo */ "./src/components/UserInfo.js");
/* harmony import */ var _components_Api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Api */ "./src/components/Api.js");
/* harmony import */ var _components_PopupWithConfirm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/PopupWithConfirm */ "./src/components/PopupWithConfirm.js");


//import all the classes









//Create instances of the classes

const api = new _components_Api__WEBPACK_IMPORTED_MODULE_8__["default"]({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d78649ed-fd14-41f7-9a2b-04c3fb13cc28",
    "content-type": "application/json"
  }
});
const cardSection = new _components_Section__WEBPACK_IMPORTED_MODULE_4__["default"]({
  renderer: data => {
    cardSection.addItems(createCard(data));
  }
}, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.selectors.cardSection);
const createCard = data => {
  const card = new _components_Card__WEBPACK_IMPORTED_MODULE_2__["default"](data, "#card-template", () => {
    cardPreviewPopup.open(data);
  }, function handleCardDelete(card) {
    confirmDeletePopup.open();
    confirmDeletePopup.setSubmitAction(() => {
      confirmDeletePopup.setLoading(true, "Saving");
      api.removeCard(card.getId()).then(() => {
        card._handleTrashIcon();
        confirmDeletePopup.close();
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        confirmDeletePopup.setLoading(false, "Saving");
      });
    });
  }, card => {
    const id = card.getId();
    if (card.isLiked()) {
      console.log("disliking");
      api.dislikeCard(id);
    } else {
      console.log("liking");
      api.likeCard(id).then(res => {
        card.updatelikesView();
      });
    }
  });
  return card.getView();
};
const cardPreviewPopup = new _components_PopupWithImage__WEBPACK_IMPORTED_MODULE_5__["default"](_utils_constants__WEBPACK_IMPORTED_MODULE_1__.selectors.previewImageModal);
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItems(cardElement);
}
const confirmDeletePopup = new _components_PopupWithConfirm__WEBPACK_IMPORTED_MODULE_9__["default"]({
  popupSelector: "#delete-card-modal"
});
confirmDeletePopup.setEventListeners();

// initialize all my instances

cardPreviewPopup.setEventListeners();

/**Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"]({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit
});
profileEditModal.setEventListeners();
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"]({
  popupSelector: "#add-card-modal",
  handleFormSubmit: data => {
    addCardModal.setLoading(true, "Saving...");
    api.addCardModal(data).then(res => {
      cardSection.addItems(createCard(res));
      addCardValidator.disableButton();
      addCardFormElement.reset();
      addCardModal.close();
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      addCardModal.setLoading(false, "Saving...");
    });
  }
});
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});
addCardModal.setEventListeners();
const profileTitle = document.querySelector("#profile-title-name");
const profileDescription = document.querySelector("#profile-description-title");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileAvatar = document.querySelector("#profile-image-id");
const profileEditForm = document.forms["edit-profile-modal__form"];
const addCardFormElement = document.forms["add-card-modal__form"];
const avatarModalForm = document.forms["edit-avatar-modal__form"];
const userInfo = new _components_UserInfo__WEBPACK_IMPORTED_MODULE_7__["default"]({
  profileTitle,
  profileDescription,
  profileAvatar
});
const avatarModal = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"]({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: inputValue => {
    console.log(inputValue);
    avatarModal.setLoading(true, "Saving");
    api.avatarModal(inputValue).then(info => {
      userInfo.setUserInfo(info);
      avatarModalValidator(disableButton);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      avatarModal.setLoading(false, "Saving");
    });
  }
});
const avatarEditButton = document.querySelector("#edit-avatar-button");
avatarEditButton.addEventListener("click", () => {
  avatarModal.open();
});
avatarModal.setEventListeners();

/**Event Handlers */
function handleProfileEditSubmit(data) {
  profileEditModal.setLoading(true, "Saving...");
  api.editprofileInfo({
    name: data.Name,
    about: data.Description
  }).then(res => {
    userInfo.setUserInfo(res);
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    profileEditModal.setLoading(false, "Saving...");
  });
}

/**Event Listeners */

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.profileTitle;
  profileDescriptionInput.value = currentUserInfo.profileDescription;
  profileEditModal.open();
});
const addCardValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__["default"]({
  formEl: addCardFormElement,
  config: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.config
});
addCardValidator.enableValidation();
const profileEditValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__["default"]({
  formEl: profileEditForm,
  config: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.config
});
profileEditValidator.enableValidation();
api.fetchInitialData().then(_ref => {
  let [userData, cardsData] = _ref;
  console.log("hey");
  userInfo.setUserInfo(userData);
  cardSection.renderItems(cardsData);
}).catch(err => {
  console.error(err);
});
const avatarModalValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__["default"]({
  formEl: avatarModalForm,
  config: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.config
});
avatarModalValidator.enableValidation();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFdBQVcsQ0FBQ3lDLFFBQVEsQ0FBQztFQUM5QnJDLFdBQVcsQ0FBQ2hCLFdBQVcsQ0FBQ3NELFNBQVMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FDRDVCLEtBQUssQ0FBRUMsR0FBRyxJQUFLO0VBQ2R0QyxPQUFPLENBQUMwRCxLQUFLLENBQUNwQixHQUFHLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUosTUFBTW1CLG9CQUFvQixHQUFHLElBQUlsSSxpRUFBYSxDQUFDO0VBQzdDQyxNQUFNLEVBQUU2SCxlQUFlO0VBQ3ZCNUgsTUFBTSxFQUFFQSxvREFBTUE7QUFDaEIsQ0FBQyxDQUFDO0FBQ0ZnSSxvQkFBb0IsQ0FBQzlGLGdCQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9wYWdlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG4gIH1cblxuICBnZXRBcHBJbmZvKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpIFxuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cblxuICBmZXRjaEluaXRpYWxEYXRhKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRVc2VySW5mbygpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSk7XG4gIH1cblxuICBlZGl0cHJvZmlsZUluZm8oZGF0YSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgXG5cbiAgYWRkQ2FyZE1vZGFsKGRhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgbGluazogZGF0YS5saW5rLFxuICAgICAgfSksXG4gICAgfSlcbiAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gICAgICBcbiAgXG5cbiAgcmVtb3ZlQ2FyZChDYXJkSUQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkcy8ke0NhcmRJRH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICAgIH1cbiAgXG5cbiAgbGlrZUNhcmQoQ2FyZElEKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuICAgXG4gIFxuXG4gIGRpc2xpa2VDYXJkKENhcmRJRCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzLyR7Q2FyZElEfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgXG5cbiAgYXZhdGFyTW9kYWwoeyBhdmF0YXIgfSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhdmF0YXIsXG4gICAgICB9KSxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cblxuX2NoZWNrUmVzcG9uc2UocmVzKXtcbiAgaWYocmVzLm9rKXtcbiAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYFRoZXJlIGhhcyBiZWVuIGFuIGVycm9yYCk7XG59XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2FyZERhdGEsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUltYWdlQ2xpY2ssXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIGhhbmRsZUxpa2VcbiAgKSB7XG4gICAgdGhpcy5fbmFtZSA9IGNhcmREYXRhLm5hbWU7XG4gICAgdGhpcy5fbGluayA9IGNhcmREYXRhLmxpbms7XG4gICAgdGhpcy5faWQgPSBjYXJkRGF0YS5faWQ7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xuICAgIHRoaXMuaGFuZGxlRGVsZXRlID0gaGFuZGxlRGVsZXRlO1xuICAgIHRoaXMuaGFuZGxlTGlrZSA9IGhhbmRsZUxpa2U7XG4gICAgdGhpcy5faXNMaWtlZCA9IGNhcmREYXRhLmlzTGlrZWQ7XG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBfc2V0RXZlbnRsaXN0ZW5lcnMoKSB7XG4gICAgLy8gb24gdGhlIHNldEV2ZW50TGlzdGVuZXJzIG9mIENhcmQuanNcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saWtlLWJ1dHRvblwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VJY29uKCk7XG4gICAgICAgIHRoaXMuaGFuZGxlTGlrZSh0aGlzKTtcbiAgICAgIH0pO1xuXG4gICAgLy9cIi5jYXJkX190cmFzaC1idXR0b25cIlxuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRyYXNoLWJ1dHRvblwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlRGVsZXRlKHRoaXMpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHsgbGluazogdGhpcy5fbGluaywgdGV4dDogdGhpcy5fdGV4dCB9KVxuICAgICk7XG4gIH1cblxuICBfaGFuZGxlTGlrZUljb24oKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGlrZS1idXR0b25cIilcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICB9XG5cbiAgX2hhbmRsZVRyYXNoSWNvbigpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBnZXRWaWV3KCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1pZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLl9jYXJkQ2FwdGlvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10aXRsZS1pZFwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmRfX2ltYWdlLW1vZGFsXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9saW5rO1xuICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xuICAgIHRoaXMuX2NhcmRDYXB0aW9uLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl91cGRhdGVMaWtlc1ZpZXcoKTtcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxuXG4gIGlzTGlrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTGlrZWQ7XG4gIH1cblxuICBfdXBkYXRlTGlrZXNWaWV3KCkge1xuICAgIGlmICh0aGlzLmlzTGlrZWQoKSkge1xuICAgICAgdGhpcy5fY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3Rvcih7IGZvcm1FbCwgY29uZmlnIH0pIHtcbiAgICB0aGlzLl9mb3JtRWwgPSBmb3JtRWw7XG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IGNvbmZpZy5pbnB1dFNlbGVjdG9yO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yO1xuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcztcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBjb25maWcuaW5wdXRFcnJvckNsYXNzO1xuICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSBjb25maWcuZXJyb3JDbGFzcztcbiAgICB0aGlzLl9mb3JtU2VsZWN0b3IgPSBjb25maWcuZm9ybVNlbGVjdG9yO1xuICB9XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xuICB9XG5cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xuICB9XG5cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKSB7XG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfVxuICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICB9XG5cbiAgX2hhc0ludmFsaWRJbnB1dCgpIHtcbiAgICByZXR1cm4gIXRoaXMuX2lucHV0RWxzLmV2ZXJ5KChpbnB1dEVsKSA9PiBpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKTtcbiAgfVxuXG4gIF90b2dnbGVCdXR0b25TdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigpOyAvLyBkaXNhYmxlIGlmIHRoZSBmb3JtIGlzIGludmFsaWRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7IC8vIGVuYWJsZSB0aGUgYnV0dG9uIHVzaW5nIHRoZSBzdHlsZXNcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlOyAvLyBlbmFibGUgdGhlIGJ1dHRvbiB1c2luZyB0aGUgYGRpc2FibGVkIGAgYXR0cmlidXRlXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgX3NldEV2ZW50bGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2lucHV0RWxzID0gWy4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2lucHV0U2VsZWN0b3IpXTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3Rvcih0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3NldEV2ZW50bGlzdGVuZXJzKCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlID0gdGhpcy5faGFuZGxlRXNjQ2xvc2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9fY2xvc2VcIikgfHxcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxcIilcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFwiO1xuXG5jbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcih7IHBvcHVwU2VsZWN0b3IgfSkge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRTdWJtaXRBY3Rpb24oYWN0aW9uKSB7XG4gICAgdGhpcy5faGFuZGxlU3VibWl0Q2FsbGJhY2sgPSBhY3Rpb247XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZVN1Ym1pdENhbGxiYWNrKCk7XG4gICAgfSk7XG5cbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgc2V0TG9hZGluZyhpc0xvYWRpbmcsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIC8vIGlmIGxvYWRpbmcgdXNlIHRoZSBsb2FkaW5nIHRleHRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBub3QgbG9hZGluZyB1c2UgdGhlIHN1Ym1pdEJ1dHRvbkNvbnRlbnRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhDb25maXJtO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCB9KSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX3BvcHVwRm9ybSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19pbnB1dFwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9wb3B1cEZvcm0ucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgdGhpcy5fZm9ybVZhbHVlcyA9IHt9O1xuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKFxuICAgICAgKGlucHV0KSA9PiAodGhpcy5fZm9ybVZhbHVlc1tpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5fZm9ybVZhbHVlcztcbiAgfVxuXG4gIF9zdWJtaXQoZXZ0KSB7XG4gICAgLy90aGlzIG1ldGhvZCBpcyB0byBiZSBjYWxsZWQgd2hlbiBmb3JtIGlzIHN1Ym1pdGVkXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTsgLy9jYWxsIGV4dGVybmFsIGNhbGxiYWNrIF9oYW5kbGVGb3JtU3VibWl0XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAvL1VzZSAndGhpcy5fc3VibWl0JyBib3VuZGVkIG1ldGhvZCBpbnN0ZWFkIG9mIGFub255bW91cyBmdW5jdGlvblxuICAgIHRoaXMuX3BvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwRm9ybS5yZXNldCgpO1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gIH1cblxuICBzZXRMb2FkaW5nKGlzTG9hZGluZywgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgLy8gaWYgbG9hZGluZyB1c2UgdGhlIGxvYWRpbmcgdGV4dFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vdCBsb2FkaW5nIHVzZSB0aGUgc3VibWl0QnV0dG9uQ29udGVudFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uQ29udGVudDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZyA9XG4gICAgICB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxDYXB0aW9uID1cbiAgICAgIHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYXB0aW9uXCIpO1xuICB9XG5cbiAgb3BlbihkYXRhKSB7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcuc3JjID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nLmFsdCA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyByZW5kZXJlciB9LCBzZWxlY3Rvcikge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7c2VsZWN0b3J9YCk7XG4gIH1cblxuICByZW5kZXJJdGVtcyhpdGVtcykge1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbXMoaXRlbSkge1xuICAgIHRoaXMuX2VsZW1lbnQucHJlcGVuZChpdGVtKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IHByb2ZpbGVUaXRsZSwgcHJvZmlsZURlc2NyaXB0aW9uLCBwcm9maWxlQXZhdGFyIH0pIHtcbiAgICB0aGlzLl9wcm9maWxlVGl0bGUgPSBwcm9maWxlVGl0bGU7XG4gICAgdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uID0gcHJvZmlsZURlc2NyaXB0aW9uO1xuICAgIHRoaXMuX3Byb2ZpbGVBdmF0YXIgPSBwcm9maWxlQXZhdGFyO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb2ZpbGVUaXRsZTogdGhpcy5fcHJvZmlsZVRpdGxlLnRleHRDb250ZW50LFxuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uOiB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQsXG4gICAgICBwcm9maWxlQXZhdGFyOiB0aGlzLl9wcm9maWxlQXZhdGFyLnNyYyxcbiAgICB9O1xuICB9XG5cbiAgc2V0VXNlckluZm8oe25hbWUsIGFib3V0LCBhdmF0YXJ9KSB7XG4gICAgaWYgKG5hbWUpIHRoaXMuX3Byb2ZpbGVUaXRsZS50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgaWYgKGFib3V0KSB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBhYm91dDtcbiAgICBpZiAoYXZhdGFyKSB0aGlzLl9wcm9maWxlQXZhdGFyLnNyYyA9IGF2YXRhcjtcbiAgfVxufVxuIiwiXG5cbmV4cG9ydCBjb25zdCBzZWxlY3RvcnMgPSB7XG4gIGNhcmRTZWN0aW9uOiBcIi5jYXJkc19fbGlzdFwiLFxuICBjYXJkVGVtcGxhdGU6IFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgcHJldmlld0ltYWdlTW9kYWw6IFwiI3ByZXZpZXctaW1hZ2UtbW9kYWxcIixcbn07XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2J1dHRvbl9kaXNhYmxlZFwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcblxuLy9pbXBvcnQgYWxsIHRoZSBjbGFzc2VzXG5pbXBvcnQgeyBzZWxlY3RvcnMsIGNvbmZpZyB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmRcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3JcIjtcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb25cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybVwiO1xuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi9jb21wb25lbnRzL0FwaVwiO1xuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybVwiO1xuLy9DcmVhdGUgaW5zdGFuY2VzIG9mIHRoZSBjbGFzc2VzXG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImQ3ODY0OWVkLWZkMTQtNDFmNy05YTJiLTA0YzNmYjEzY2MyOFwiLFxuICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmNvbnN0IGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gIHtcbiAgICByZW5kZXJlcjogKGRhdGEpID0+IHtcbiAgICAgIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNyZWF0ZUNhcmQoZGF0YSkpO1xuICAgIH0sXG4gIH0sXG4gIHNlbGVjdG9ycy5jYXJkU2VjdGlvblxuKTtcblxuY29uc3QgY3JlYXRlQ2FyZCA9IChkYXRhKSA9PiB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBkYXRhLFxuICAgIFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgICAoKSA9PiB7XG4gICAgICBjYXJkUHJldmlld1BvcHVwLm9wZW4oZGF0YSk7XG4gICAgfSxcbiAgICBmdW5jdGlvbiBoYW5kbGVDYXJkRGVsZXRlKGNhcmQpIHtcbiAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5vcGVuKCk7XG4gICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0U3VibWl0QWN0aW9uKCgpID0+IHtcbiAgICAgICAgY29uZmlybURlbGV0ZVBvcHVwLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmdcIik7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5yZW1vdmVDYXJkKGNhcmQuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYXJkLl9oYW5kbGVUcmFzaEljb24oKTtcbiAgICAgICAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5jbG9zZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmdcIik7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIChjYXJkKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IGNhcmQuZ2V0SWQoKTtcbiAgICAgIGlmIChjYXJkLmlzTGlrZWQoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRpc2xpa2luZ1wiKTtcbiAgICAgICAgYXBpLmRpc2xpa2VDYXJkKGlkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsaWtpbmdcIik7XG4gICAgICAgIGFwaS5saWtlQ2FyZChpZCkudGhlbigocmVzKSA9PiB7Y2FyZC51cGRhdGVsaWtlc1ZpZXcoKTt9KVxuICAgICAgfVxuICAgIH0pXG4gIFxuICByZXR1cm4gY2FyZC5nZXRWaWV3KCk7XG59O1xuXG5jb25zdCBjYXJkUHJldmlld1BvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKHNlbGVjdG9ycy5wcmV2aWV3SW1hZ2VNb2RhbCk7XG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmREYXRhKSB7XG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY3JlYXRlQ2FyZChjYXJkRGF0YSk7XG4gIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNhcmRFbGVtZW50KTtcbn1cblxuY29uc3QgY29uZmlybURlbGV0ZVBvcHVwID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNkZWxldGUtY2FyZC1tb2RhbFwiLFxufSk7XG5jb25maXJtRGVsZXRlUG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLy8gaW5pdGlhbGl6ZSBhbGwgbXkgaW5zdGFuY2VzXG5cbmNhcmRQcmV2aWV3UG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLyoqRWxlbWVudHMgKi9cbmNvbnN0IHByb2ZpbGVFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWVkaXQtYnV0dG9uXCIpO1xuY29uc3QgcHJvZmlsZUVkaXRNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjcHJvZmlsZS1lZGl0LW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IGhhbmRsZVByb2ZpbGVFZGl0U3VibWl0LFxufSk7XG5wcm9maWxlRWRpdE1vZGFsLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZE5ld0NhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtYWRkLWJ1dHRvblwiKTtcblxuY29uc3QgYWRkQ2FyZE1vZGFsID0gbmV3IFBvcHVwV2l0aEZvcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNhZGQtY2FyZC1tb2RhbFwiLFxuICBoYW5kbGVGb3JtU3VibWl0OiAoZGF0YSkgPT4ge1xuICAgIGFkZENhcmRNb2RhbC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmFkZENhcmRNb2RhbChkYXRhKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkU2VjdGlvbi5hZGRJdGVtcyhjcmVhdGVDYXJkKHJlcykpO1xuICAgICAgICBhZGRDYXJkVmFsaWRhdG9yLmRpc2FibGVCdXR0b24oKTtcbiAgICAgICAgYWRkQ2FyZEZvcm1FbGVtZW50LnJlc2V0KCk7XG4gICAgICAgIGFkZENhcmRNb2RhbC5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBhZGRDYXJkTW9kYWwuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfSxcbn0pO1xuXG5hZGROZXdDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZENhcmRNb2RhbC5vcGVuKCk7XG59KTtcblxuYWRkQ2FyZE1vZGFsLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IHByb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZS1uYW1lXCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWRlc2NyaXB0aW9uLXRpdGxlXCIpO1xuY29uc3QgcHJvZmlsZVRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGUtaW5wdXRcIik7XG5jb25zdCBwcm9maWxlRGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiI3Byb2ZpbGUtZGVzY3JpcHRpb24taW5wdXRcIlxuKTtcbmNvbnN0IHByb2ZpbGVBdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtaW1hZ2UtaWRcIik7XG5jb25zdCBwcm9maWxlRWRpdEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcImVkaXQtcHJvZmlsZS1tb2RhbF9fZm9ybVwiXTtcbmNvbnN0IGFkZENhcmRGb3JtRWxlbWVudCA9IGRvY3VtZW50LmZvcm1zW1wiYWRkLWNhcmQtbW9kYWxfX2Zvcm1cIl07XG5jb25zdCBhdmF0YXJNb2RhbEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcImVkaXQtYXZhdGFyLW1vZGFsX19mb3JtXCJdO1xuXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XG4gIHByb2ZpbGVUaXRsZSxcbiAgcHJvZmlsZURlc2NyaXB0aW9uLFxuICBwcm9maWxlQXZhdGFyLFxufSk7XG5cbmNvbnN0IGF2YXRhck1vZGFsID0gbmV3IFBvcHVwV2l0aEZvcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNlZGl0LWF2YXRhci1tb2RhbFwiLFxuICBoYW5kbGVGb3JtU3VibWl0OiAoaW5wdXRWYWx1ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGlucHV0VmFsdWUpO1xuICAgIGF2YXRhck1vZGFsLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmdcIik7XG4gICAgYXBpXG4gICAgICAuYXZhdGFyTW9kYWwoaW5wdXRWYWx1ZSlcbiAgICAgIC50aGVuKChpbmZvKSA9PiB7XG4gICAgICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKGluZm8pO1xuICAgICAgICBhdmF0YXJNb2RhbFZhbGlkYXRvcihkaXNhYmxlQnV0dG9uKVxuICAgICAgfSlcbiAgICBcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGF2YXRhck1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nXCIpO1xuICAgICAgfSk7XG4gIH0sXG59KTtcblxuY29uc3QgYXZhdGFyRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1hdmF0YXItYnV0dG9uXCIpO1xuYXZhdGFyRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhdmF0YXJNb2RhbC5vcGVuKCk7XG59KTtcbmF2YXRhck1vZGFsLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8qKkV2ZW50IEhhbmRsZXJzICovXG5mdW5jdGlvbiBoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdChkYXRhKSB7XG4gIHByb2ZpbGVFZGl0TW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmVkaXRwcm9maWxlSW5mbyh7IG5hbWU6IGRhdGEuTmFtZSwgYWJvdXQ6IGRhdGEuRGVzY3JpcHRpb24gfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhyZXMpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHByb2ZpbGVFZGl0TW9kYWwuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59XG5cbi8qKkV2ZW50IExpc3RlbmVycyAqL1xuXG5wcm9maWxlRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50VXNlckluZm8gPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xuICBwcm9maWxlVGl0bGVJbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VySW5mby5wcm9maWxlVGl0bGU7XG4gIHByb2ZpbGVEZXNjcmlwdGlvbklucHV0LnZhbHVlID0gY3VycmVudFVzZXJJbmZvLnByb2ZpbGVEZXNjcmlwdGlvbjtcbiAgcHJvZmlsZUVkaXRNb2RhbC5vcGVuKCk7XG59KTtcblxuY29uc3QgYWRkQ2FyZFZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHtcbiAgZm9ybUVsOiBhZGRDYXJkRm9ybUVsZW1lbnQsXG4gIGNvbmZpZzogY29uZmlnLFxufSk7XG5hZGRDYXJkVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcblxuY29uc3QgcHJvZmlsZUVkaXRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogcHJvZmlsZUVkaXRGb3JtLFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xucHJvZmlsZUVkaXRWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuYXBpXG4gIC5mZXRjaEluaXRpYWxEYXRhKClcbiAgLnRoZW4oKFt1c2VyRGF0YSwgY2FyZHNEYXRhXSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiaGV5XCIpO1xuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHVzZXJEYXRhKTtcbiAgICBjYXJkU2VjdGlvbi5yZW5kZXJJdGVtcyhjYXJkc0RhdGEpO1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgfSk7XG5cbmNvbnN0IGF2YXRhck1vZGFsVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioe1xuICBmb3JtRWw6IGF2YXRhck1vZGFsRm9ybSxcbiAgY29uZmlnOiBjb25maWcsXG59KTtcbmF2YXRhck1vZGFsVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJiYXNlVXJsIiwiaGVhZGVycyIsImdldEFwcEluZm8iLCJQcm9taXNlIiwiYWxsIiwiZ2V0SW5pdGlhbENhcmRzIiwiZ2V0VXNlckluZm8iLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiX2NoZWNrUmVzcG9uc2UiLCJmZXRjaEluaXRpYWxEYXRhIiwiZWRpdHByb2ZpbGVJbmZvIiwiZGF0YSIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiYWRkQ2FyZE1vZGFsIiwibmFtZSIsImxpbmsiLCJyZW1vdmVDYXJkIiwiQ2FyZElEIiwibGlrZUNhcmQiLCJkaXNsaWtlQ2FyZCIsImF2YXRhck1vZGFsIiwiX3JlZiIsImF2YXRhciIsIm9rIiwicmVqZWN0IiwiQ2FyZCIsImNhcmREYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlSW1hZ2VDbGljayIsImhhbmRsZURlbGV0ZSIsImhhbmRsZUxpa2UiLCJfbmFtZSIsIl9saW5rIiwiX2lkIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVJbWFnZUNsaWNrIiwiX2lzTGlrZWQiLCJpc0xpa2VkIiwiZ2V0SWQiLCJfc2V0RXZlbnRsaXN0ZW5lcnMiLCJfY2FyZEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9oYW5kbGVMaWtlSWNvbiIsIl9jYXJkSW1hZ2UiLCJ0ZXh0IiwiX3RleHQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJfaGFuZGxlVHJhc2hJY29uIiwicmVtb3ZlIiwiZ2V0VmlldyIsImRvY3VtZW50IiwiY29udGVudCIsImNsb25lTm9kZSIsIl9jYXJkQ2FwdGlvbiIsInNyYyIsIl9jYXJkTGlrZUJ1dHRvbiIsImFsdCIsInRleHRDb250ZW50IiwiX3VwZGF0ZUxpa2VzVmlldyIsImFkZCIsIkZvcm1WYWxpZGF0b3IiLCJmb3JtRWwiLCJjb25maWciLCJfZm9ybUVsIiwiX2lucHV0U2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwiX3N1Ym1pdEJ1dHRvblNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiX2Vycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiX2Zvcm1TZWxlY3RvciIsImZvcm1TZWxlY3RvciIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWwiLCJfZXJyb3JNZXNzYWdlRWwiLCJpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVJbnB1dEVycm9yIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInZhbGlkaXR5IiwidmFsaWQiLCJfaGFzSW52YWxpZElucHV0IiwiX2lucHV0RWxzIiwiZXZlcnkiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJkaXNhYmxlQnV0dG9uIiwiX3N1Ym1pdEJ1dHRvbiIsImRpc2FibGVkIiwiZW5hYmxlZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZSIsImVuYWJsZVZhbGlkYXRpb24iLCJyZXNldFZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXBFbGVtZW50IiwiX2hhbmRsZUVzY0Nsb3NlIiwiYmluZCIsIm9wZW4iLCJjbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnQiLCJrZXkiLCJzZXRFdmVudExpc3RlbmVycyIsInRhcmdldCIsImNvbnRhaW5zIiwiUG9wdXBXaXRoQ29uZmlybSIsIl9zdWJtaXRCdXR0b25Db250ZW50Iiwic2V0U3VibWl0QWN0aW9uIiwiYWN0aW9uIiwiX2hhbmRsZVN1Ym1pdENhbGxiYWNrIiwicHJldmVudERlZmF1bHQiLCJzZXRMb2FkaW5nIiwiaXNMb2FkaW5nIiwibG9hZGluZ1RleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJQb3B1cFdpdGhGb3JtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX3BvcHVwRm9ybSIsIl9pbnB1dExpc3QiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJfZm9ybVZhbHVlcyIsImlucHV0IiwidmFsdWUiLCJfc3VibWl0IiwiY29uc29sZSIsImxvZyIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfcHJldmlld0ltYWdlTW9kYWxJbWciLCJfcHJldmlld0ltYWdlTW9kYWxDYXB0aW9uIiwiU2VjdGlvbiIsInNlbGVjdG9yIiwicmVuZGVyZXIiLCJfcmVuZGVyZXIiLCJfZWxlbWVudCIsInJlbmRlckl0ZW1zIiwiaXRlbXMiLCJpdGVtIiwiYWRkSXRlbXMiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJwcm9maWxlVGl0bGUiLCJwcm9maWxlRGVzY3JpcHRpb24iLCJwcm9maWxlQXZhdGFyIiwiX3Byb2ZpbGVUaXRsZSIsIl9wcm9maWxlRGVzY3JpcHRpb24iLCJfcHJvZmlsZUF2YXRhciIsInNldFVzZXJJbmZvIiwiX3JlZjIiLCJhYm91dCIsInNlbGVjdG9ycyIsImNhcmRTZWN0aW9uIiwiY2FyZFRlbXBsYXRlIiwicHJldmlld0ltYWdlTW9kYWwiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiY3JlYXRlQ2FyZCIsImNhcmQiLCJjYXJkUHJldmlld1BvcHVwIiwiaGFuZGxlQ2FyZERlbGV0ZSIsImNvbmZpcm1EZWxldGVQb3B1cCIsImNhdGNoIiwiZXJyIiwiZmluYWxseSIsInVwZGF0ZWxpa2VzVmlldyIsInJlbmRlckNhcmQiLCJjYXJkRWxlbWVudCIsInByb2ZpbGVFZGl0QnV0dG9uIiwicHJvZmlsZUVkaXRNb2RhbCIsImhhbmRsZVByb2ZpbGVFZGl0U3VibWl0IiwiYWRkTmV3Q2FyZEJ1dHRvbiIsImFkZENhcmRWYWxpZGF0b3IiLCJhZGRDYXJkRm9ybUVsZW1lbnQiLCJwcm9maWxlVGl0bGVJbnB1dCIsInByb2ZpbGVEZXNjcmlwdGlvbklucHV0IiwicHJvZmlsZUVkaXRGb3JtIiwiZm9ybXMiLCJhdmF0YXJNb2RhbEZvcm0iLCJ1c2VySW5mbyIsImlucHV0VmFsdWUiLCJpbmZvIiwiYXZhdGFyTW9kYWxWYWxpZGF0b3IiLCJlcnJvciIsImF2YXRhckVkaXRCdXR0b24iLCJOYW1lIiwiRGVzY3JpcHRpb24iLCJjdXJyZW50VXNlckluZm8iLCJwcm9maWxlRWRpdFZhbGlkYXRvciIsInVzZXJEYXRhIiwiY2FyZHNEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==