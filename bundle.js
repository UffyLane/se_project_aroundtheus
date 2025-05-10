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
    }).then(this._checkResponse);
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    }).then(this._checkResponse);
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
    this._isLiked = !this._isLiked;
    this.updateLikesView();
  }
  handleTrashIcon() {
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
    this._popupForm.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
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
      confirmDeletePopup.setLoading(true, "Deleting");
      api.removeCard(card.getId()).then(() => {
        card.handleTrashIcon();
        confirmDeletePopup.close();
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        confirmDeletePopup.setLoading(false);
      });
    });
  }, function handleLike(card) {
    const id = card.getId();
    if (card.isLiked()) {
      api.dislikeCard(id).then(() => {
        card._handleLikeIcon();
      }).catch(console.error);
    } else {
      api.likeCard(id).then(() => {
        card._handleLikeIcon();
      }).catch(console.error);
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
      avatarModalValidator.disableButton();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUssQ0FBQ0YsR0FBRyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVKLE1BQU1tQixvQkFBb0IsR0FBRyxJQUFJbEksaUVBQWEsQ0FBQztFQUM3Q0MsTUFBTSxFQUFFNkgsZUFBZTtFQUN2QjVILE1BQU0sRUFBRUEsb0RBQU1BO0FBQ2hCLENBQUMsQ0FBQztBQUNGZ0ksb0JBQW9CLENBQUM5RixnQkFBZ0IsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmJhc2VVcmwgPSBvcHRpb25zLmJhc2VVcmw7XG4gICAgdGhpcy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICB9XG5cbiAgZ2V0QXBwSW5mbygpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SW5pdGlhbENhcmRzKCksIHRoaXMuZ2V0VXNlckluZm8oKV0pO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pXG4gICAgLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSkgXG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KVxuICAgIC50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cblxuICBmZXRjaEluaXRpYWxEYXRhKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRVc2VySW5mbygpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSk7XG4gIH1cblxuICBlZGl0cHJvZmlsZUluZm8oZGF0YSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgXG5cbiAgYWRkQ2FyZE1vZGFsKGRhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgbGluazogZGF0YS5saW5rLFxuICAgICAgfSksXG4gICAgfSlcbiAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gICAgICBcbiAgXG5cbiAgcmVtb3ZlQ2FyZChDYXJkSUQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkcy8ke0NhcmRJRH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICAgIH1cbiAgXG5cbiAgbGlrZUNhcmQoQ2FyZElEKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuICAgXG4gIFxuXG4gIGRpc2xpa2VDYXJkKENhcmRJRCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzLyR7Q2FyZElEfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgXG5cbiAgYXZhdGFyTW9kYWwoeyBhdmF0YXIgfSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhdmF0YXIsXG4gICAgICB9KSxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cblxuX2NoZWNrUmVzcG9uc2UocmVzKXtcbiAgaWYocmVzLm9rKXtcbiAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYFRoZXJlIGhhcyBiZWVuIGFuIGVycm9yYCk7XG59XG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYXJkRGF0YSxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlSW1hZ2VDbGljayxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgaGFuZGxlTGlrZVxuICApIHtcbiAgICB0aGlzLl9uYW1lID0gY2FyZERhdGEubmFtZTtcbiAgICB0aGlzLl9saW5rID0gY2FyZERhdGEubGluaztcbiAgICB0aGlzLl9pZCA9IGNhcmREYXRhLl9pZDtcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XG4gICAgdGhpcy5faGFuZGxlSW1hZ2VDbGljayA9IGhhbmRsZUltYWdlQ2xpY2s7XG4gICAgdGhpcy5oYW5kbGVEZWxldGUgPSBoYW5kbGVEZWxldGU7XG4gICAgdGhpcy5oYW5kbGVMaWtlID0gaGFuZGxlTGlrZTtcbiAgICB0aGlzLl9pc0xpa2VkID0gY2FyZERhdGEuaXNMaWtlZDtcbiAgfVxuXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIF9zZXRFdmVudGxpc3RlbmVycygpIHtcbiAgICAvLyBvbiB0aGUgc2V0RXZlbnRMaXN0ZW5lcnMgb2YgQ2FyZC5qc1xuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVMaWtlKHRoaXMpO1xuICAgICAgXG4gICAgICB9KTtcblxuICAgIC8vXCIuY2FyZF9fdHJhc2gtYnV0dG9uXCJcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10cmFzaC1idXR0b25cIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZURlbGV0ZSh0aGlzKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgdGhpcy5faGFuZGxlSW1hZ2VDbGljayh7IGxpbms6IHRoaXMuX2xpbmssIHRleHQ6IHRoaXMuX3RleHQgfSlcbiAgICApO1xuICB9XG5cbiAgX2hhbmRsZUxpa2VJY29uKCkge1xuICAgdGhpcy5faXNMaWtlZCA9ICF0aGlzLl9pc0xpa2VkO1xuICAgdGhpcy51cGRhdGVMaWtlc1ZpZXcoKTtcbiAgfVxuXG4gIGhhbmRsZVRyYXNoSWNvbigpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBnZXRWaWV3KCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1pZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLl9jYXJkQ2FwdGlvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10aXRsZS1pZFwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmRfX2ltYWdlLW1vZGFsXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9saW5rO1xuICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xuICAgIHRoaXMuX2NhcmRDYXB0aW9uLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLnVwZGF0ZUxpa2VzVmlldygpO1xuICAgIHRoaXMuX3NldEV2ZW50bGlzdGVuZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRFbGVtZW50O1xuICB9XG5cbiAgaXNMaWtlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNMaWtlZDtcbiAgfVxuXG4gIHVwZGF0ZUxpa2VzVmlldygpIHtcbiAgICBpZiAodGhpcy5pc0xpa2VkKCkpIHtcbiAgICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IoeyBmb3JtRWwsIGNvbmZpZyB9KSB7XG4gICAgdGhpcy5fZm9ybUVsID0gZm9ybUVsO1xuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBjb25maWcuaW5wdXRTZWxlY3RvcjtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3M7XG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gY29uZmlnLmlucHV0RXJyb3JDbGFzcztcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gY29uZmlnLmVycm9yQ2xhc3M7XG4gICAgdGhpcy5fZm9ybVNlbGVjdG9yID0gY29uZmlnLmZvcm1TZWxlY3RvcjtcbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgfVxuXG4gIF9oYXNJbnZhbGlkSW5wdXQoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pbnB1dEVscy5ldmVyeSgoaW5wdXRFbCkgPT4gaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XG4gIH1cblxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XG4gICAgICB0aGlzLmRpc2FibGVCdXR0b24oKTsgLy8gZGlzYWJsZSBpZiB0aGUgZm9ybSBpcyBpbnZhbGlkXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpOyAvLyBlbmFibGUgdGhlIGJ1dHRvbiB1c2luZyB0aGUgc3R5bGVzXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTsgLy8gZW5hYmxlIHRoZSBidXR0b24gdXNpbmcgdGhlIGBkaXNhYmxlZCBgIGF0dHJpYnV0ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVCdXR0b24oKSB7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIF9zZXRFdmVudGxpc3RlbmVycygpIHtcbiAgICB0aGlzLl9pbnB1dEVscyA9IFsuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKV07XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxfX2Nsb3NlXCIpIHx8XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBcIjtcblxuY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yIH0pIHtcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgc2V0U3VibWl0QWN0aW9uKGFjdGlvbikge1xuICAgIHRoaXMuX2hhbmRsZVN1Ym1pdENhbGxiYWNrID0gYWN0aW9uO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXRDYWxsYmFjaygpO1xuICAgIH0pO1xuXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHNldExvYWRpbmcoaXNMb2FkaW5nLCBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCIpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAvLyBpZiBsb2FkaW5nIHVzZSB0aGUgbG9hZGluZyB0ZXh0XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBsb2FkaW5nVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm90IGxvYWRpbmcgdXNlIHRoZSBzdWJtaXRCdXR0b25Db250ZW50XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50O1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoQ29uZmlybTtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcih7IHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQgfSkge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9wb3B1cEZvcm0gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcbiAgICB0aGlzLl9pbnB1dExpc3QgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9faW5wdXRcIik7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fcG9wdXBGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIHRoaXMuX2Zvcm1WYWx1ZXMgPSB7fTtcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaChcbiAgICAgIChpbnB1dCkgPT4gKHRoaXMuX2Zvcm1WYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1WYWx1ZXM7XG4gIH1cblxuICBfc3VibWl0KGV2dCkge1xuICAgIC8vdGhpcyBtZXRob2QgaXMgdG8gYmUgY2FsbGVkIHdoZW4gZm9ybSBpcyBzdWJtaXRlZFxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7IC8vY2FsbCBleHRlcm5hbCBjYWxsYmFjayBfaGFuZGxlRm9ybVN1Ym1pdFxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fcG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXBGb3JtLnJlc2V0KCk7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgfVxuXG4gIHNldExvYWRpbmcoaXNMb2FkaW5nLCBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCIpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAvLyBpZiBsb2FkaW5nIHVzZSB0aGUgbG9hZGluZyB0ZXh0XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBsb2FkaW5nVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm90IGxvYWRpbmcgdXNlIHRoZSBzdWJtaXRCdXR0b25Db250ZW50XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nID1cbiAgICAgIHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24gPVxuICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XG4gIH1cblxuICBvcGVuKGRhdGEpIHtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZy5zcmMgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcuYWx0ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsQ2FwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IHJlbmRlcmVyIH0sIHNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtzZWxlY3Rvcn1gKTtcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKGl0ZW1zKSB7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJdGVtcyhpdGVtKSB7XG4gICAgdGhpcy5fZWxlbWVudC5wcmVwZW5kKGl0ZW0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgcHJvZmlsZVRpdGxlLCBwcm9maWxlRGVzY3JpcHRpb24sIHByb2ZpbGVBdmF0YXIgfSkge1xuICAgIHRoaXMuX3Byb2ZpbGVUaXRsZSA9IHByb2ZpbGVUaXRsZTtcbiAgICB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24gPSBwcm9maWxlRGVzY3JpcHRpb247XG4gICAgdGhpcy5fcHJvZmlsZUF2YXRhciA9IHByb2ZpbGVBdmF0YXI7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvZmlsZVRpdGxlOiB0aGlzLl9wcm9maWxlVGl0bGUudGV4dENvbnRlbnQsXG4gICAgICBwcm9maWxlRGVzY3JpcHRpb246IHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCxcbiAgICAgIHByb2ZpbGVBdmF0YXI6IHRoaXMuX3Byb2ZpbGVBdmF0YXIuc3JjLFxuICAgIH07XG4gIH1cblxuICBzZXRVc2VySW5mbyh7bmFtZSwgYWJvdXQsIGF2YXRhcn0pIHtcbiAgICBpZiAobmFtZSkgdGhpcy5fcHJvZmlsZVRpdGxlLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICBpZiAoYWJvdXQpIHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGFib3V0O1xuICAgIGlmIChhdmF0YXIpIHRoaXMuX3Byb2ZpbGVBdmF0YXIuc3JjID0gYXZhdGFyO1xuICB9XG59XG4iLCJcblxuZXhwb3J0IGNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgY2FyZFNlY3Rpb246IFwiLmNhcmRzX19saXN0XCIsXG4gIGNhcmRUZW1wbGF0ZTogXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICBwcmV2aWV3SW1hZ2VNb2RhbDogXCIjcHJldmlldy1pbWFnZS1tb2RhbFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fYnV0dG9uX2Rpc2FibGVkXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvcl92aXNpYmxlXCIsXG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG4vL2ltcG9ydCBhbGwgdGhlIGNsYXNzZXNcbmltcG9ydCB7IHNlbGVjdG9ycywgY29uZmlnIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZFwiO1xuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvclwiO1xuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvblwiO1xuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlXCI7XG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm9cIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpXCI7XG5pbXBvcnQgUG9wdXBXaXRoQ29uZmlybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtXCI7XG4vL0NyZWF0ZSBpbnN0YW5jZXMgb2YgdGhlIGNsYXNzZXNcblxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQtYXBpLmVuLnRyaXBsZXRlbi1zZXJ2aWNlcy5jb20vdjFcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiZDc4NjQ5ZWQtZmQxNC00MWY3LTlhMmItMDRjM2ZiMTNjYzI4XCIsXG4gICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuY29uc3QgY2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xuICAgICAgY2FyZFNlY3Rpb24uYWRkSXRlbXMoY3JlYXRlQ2FyZChkYXRhKSk7XG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0b3JzLmNhcmRTZWN0aW9uXG4pO1xuXG5jb25zdCBjcmVhdGVDYXJkID0gKGRhdGEpID0+IHtcbiAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKFxuICAgIGRhdGEsXG4gICAgXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICAgICgpID0+IHtcbiAgICAgIGNhcmRQcmV2aWV3UG9wdXAub3BlbihkYXRhKTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uIGhhbmRsZUNhcmREZWxldGUoY2FyZCkge1xuICAgICAgY29uZmlybURlbGV0ZVBvcHVwLm9wZW4oKTtcbiAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5zZXRTdWJtaXRBY3Rpb24oKCkgPT4ge1xuICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyh0cnVlLCBcIkRlbGV0aW5nXCIpO1xuICAgICAgICBhcGlcbiAgICAgICAgICAucmVtb3ZlQ2FyZChjYXJkLmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FyZC5oYW5kbGVUcmFzaEljb24oKTtcbiAgICAgICAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5jbG9zZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uIGhhbmRsZUxpa2UoY2FyZCkge1xuICAgICAgY29uc3QgaWQgPSBjYXJkLmdldElkKCk7XG4gICAgICBpZiAoY2FyZC5pc0xpa2VkKCkpIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLmRpc2xpa2VDYXJkKGlkKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNhcmQuX2hhbmRsZUxpa2VJY29uKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcGlcbiAgICAgICAgICAubGlrZUNhcmQoaWQpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FyZC5faGFuZGxlTGlrZUljb24oKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIGNhcmQuZ2V0VmlldygpO1xufTtcblxuY29uc3QgY2FyZFByZXZpZXdQb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZShzZWxlY3RvcnMucHJldmlld0ltYWdlTW9kYWwpO1xuZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkRGF0YSkge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGNyZWF0ZUNhcmQoY2FyZERhdGEpO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtcyhjYXJkRWxlbWVudCk7XG59XG5cbmNvbnN0IGNvbmZpcm1EZWxldGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhDb25maXJtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjZGVsZXRlLWNhcmQtbW9kYWxcIixcbn0pO1xuY29uZmlybURlbGV0ZVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8vIGluaXRpYWxpemUgYWxsIG15IGluc3RhbmNlc1xuXG5jYXJkUHJldmlld1BvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8qKkVsZW1lbnRzICovXG5jb25zdCBwcm9maWxlRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0TW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiLFxuICBoYW5kbGVGb3JtU3VibWl0OiBoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdCxcbn0pO1xucHJvZmlsZUVkaXRNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGROZXdDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWFkZC1idXR0b25cIik7XG5cbmNvbnN0IGFkZENhcmRNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjYWRkLWNhcmQtbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogKGRhdGEpID0+IHtcbiAgICBhZGRDYXJkTW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5hZGRDYXJkTW9kYWwoZGF0YSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZFNlY3Rpb24uYWRkSXRlbXMoY3JlYXRlQ2FyZChyZXMpKTtcbiAgICAgICAgYWRkQ2FyZFZhbGlkYXRvci5kaXNhYmxlQnV0dG9uKCk7XG4gICAgICAgIGFkZENhcmRGb3JtRWxlbWVudC5yZXNldCgpO1xuICAgICAgICBhZGRDYXJkTW9kYWwuY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgYWRkQ2FyZE1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH0sXG59KTtcblxuYWRkTmV3Q2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRDYXJkTW9kYWwub3BlbigpO1xufSk7XG5cbmFkZENhcmRNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBwcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGUtbmFtZVwiKTtcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi10aXRsZVwiKTtcbmNvbnN0IHByb2ZpbGVUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlLWlucHV0XCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCJcbik7XG5jb25zdCBwcm9maWxlQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWltYWdlLWlkXCIpO1xuY29uc3QgcHJvZmlsZUVkaXRGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJlZGl0LXByb2ZpbGUtbW9kYWxfX2Zvcm1cIl07XG5jb25zdCBhZGRDYXJkRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5mb3Jtc1tcImFkZC1jYXJkLW1vZGFsX19mb3JtXCJdO1xuY29uc3QgYXZhdGFyTW9kYWxGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJlZGl0LWF2YXRhci1tb2RhbF9fZm9ybVwiXTtcblxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xuICBwcm9maWxlVGl0bGUsXG4gIHByb2ZpbGVEZXNjcmlwdGlvbixcbiAgcHJvZmlsZUF2YXRhcixcbn0pO1xuXG5jb25zdCBhdmF0YXJNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjZWRpdC1hdmF0YXItbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogKGlucHV0VmFsdWUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhpbnB1dFZhbHVlKTtcbiAgICBhdmF0YXJNb2RhbC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nXCIpO1xuICAgIGFwaVxuICAgICAgLmF2YXRhck1vZGFsKGlucHV0VmFsdWUpXG4gICAgICAudGhlbigoaW5mbykgPT4ge1xuICAgICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhpbmZvKTtcbiAgICAgICAgYXZhdGFyTW9kYWxWYWxpZGF0b3IuZGlzYWJsZUJ1dHRvbigpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pXG5cbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgYXZhdGFyTW9kYWwuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmdcIik7XG4gICAgICB9KTtcbiAgfSxcbn0pO1xuXG5jb25zdCBhdmF0YXJFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LWF2YXRhci1idXR0b25cIik7XG5hdmF0YXJFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGF2YXRhck1vZGFsLm9wZW4oKTtcbn0pO1xuYXZhdGFyTW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLyoqRXZlbnQgSGFuZGxlcnMgKi9cbmZ1bmN0aW9uIGhhbmRsZVByb2ZpbGVFZGl0U3VibWl0KGRhdGEpIHtcbiAgcHJvZmlsZUVkaXRNb2RhbC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuZWRpdHByb2ZpbGVJbmZvKHsgbmFtZTogZGF0YS5OYW1lLCBhYm91dDogZGF0YS5EZXNjcmlwdGlvbiB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHJlcyk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcHJvZmlsZUVkaXRNb2RhbC5zZXRMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn1cblxuLyoqRXZlbnQgTGlzdGVuZXJzICovXG5cbnByb2ZpbGVFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRVc2VySW5mbyA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XG4gIHByb2ZpbGVUaXRsZUlucHV0LnZhbHVlID0gY3VycmVudFVzZXJJbmZvLnByb2ZpbGVUaXRsZTtcbiAgcHJvZmlsZURlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSBjdXJyZW50VXNlckluZm8ucHJvZmlsZURlc2NyaXB0aW9uO1xuICBwcm9maWxlRWRpdE1vZGFsLm9wZW4oKTtcbn0pO1xuXG5jb25zdCBhZGRDYXJkVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioe1xuICBmb3JtRWw6IGFkZENhcmRGb3JtRWxlbWVudCxcbiAgY29uZmlnOiBjb25maWcsXG59KTtcbmFkZENhcmRWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuXG5jb25zdCBwcm9maWxlRWRpdFZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHtcbiAgZm9ybUVsOiBwcm9maWxlRWRpdEZvcm0sXG4gIGNvbmZpZzogY29uZmlnLFxufSk7XG5wcm9maWxlRWRpdFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG5hcGlcbiAgLmZldGNoSW5pdGlhbERhdGEoKVxuICAudGhlbigoW3VzZXJEYXRhLCBjYXJkc0RhdGFdKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJoZXlcIik7XG4gICAgdXNlckluZm8uc2V0VXNlckluZm8odXNlckRhdGEpO1xuICAgIGNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKGNhcmRzRGF0YSk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9KTtcblxuY29uc3QgYXZhdGFyTW9kYWxWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogYXZhdGFyTW9kYWxGb3JtLFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xuYXZhdGFyTW9kYWxWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuIl0sIm5hbWVzIjpbIkFwaSIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImJhc2VVcmwiLCJoZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsImZldGNoIiwidGhlbiIsIl9jaGVja1Jlc3BvbnNlIiwiZmV0Y2hJbml0aWFsRGF0YSIsImVkaXRwcm9maWxlSW5mbyIsImRhdGEiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFkZENhcmRNb2RhbCIsIm5hbWUiLCJsaW5rIiwicmVtb3ZlQ2FyZCIsIkNhcmRJRCIsImxpa2VDYXJkIiwiZGlzbGlrZUNhcmQiLCJhdmF0YXJNb2RhbCIsIl9yZWYiLCJhdmF0YXIiLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJDYXJkIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwiaGFuZGxlRGVsZXRlIiwiaGFuZGxlTGlrZSIsIl9uYW1lIiwiX2xpbmsiLCJfaWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJfaXNMaWtlZCIsImlzTGlrZWQiLCJnZXRJZCIsIl9zZXRFdmVudGxpc3RlbmVycyIsIl9jYXJkRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiX2NhcmRJbWFnZSIsInRleHQiLCJfdGV4dCIsIl9oYW5kbGVMaWtlSWNvbiIsInVwZGF0ZUxpa2VzVmlldyIsImhhbmRsZVRyYXNoSWNvbiIsInJlbW92ZSIsImdldFZpZXciLCJkb2N1bWVudCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJfY2FyZENhcHRpb24iLCJzcmMiLCJfY2FyZExpa2VCdXR0b24iLCJhbHQiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsIkZvcm1WYWxpZGF0b3IiLCJmb3JtRWwiLCJjb25maWciLCJfZm9ybUVsIiwiX2lucHV0U2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwiX3N1Ym1pdEJ1dHRvblNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiX2Vycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiX2Zvcm1TZWxlY3RvciIsImZvcm1TZWxlY3RvciIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWwiLCJfZXJyb3JNZXNzYWdlRWwiLCJpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVJbnB1dEVycm9yIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInZhbGlkaXR5IiwidmFsaWQiLCJfaGFzSW52YWxpZElucHV0IiwiX2lucHV0RWxzIiwiZXZlcnkiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJkaXNhYmxlQnV0dG9uIiwiX3N1Ym1pdEJ1dHRvbiIsImRpc2FibGVkIiwiZW5hYmxlZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZSIsImVuYWJsZVZhbGlkYXRpb24iLCJyZXNldFZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXBFbGVtZW50IiwiX2hhbmRsZUVzY0Nsb3NlIiwiYmluZCIsIm9wZW4iLCJjbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnQiLCJrZXkiLCJzZXRFdmVudExpc3RlbmVycyIsInRhcmdldCIsImNvbnRhaW5zIiwiUG9wdXBXaXRoQ29uZmlybSIsIl9zdWJtaXRCdXR0b25Db250ZW50Iiwic2V0U3VibWl0QWN0aW9uIiwiYWN0aW9uIiwiX2hhbmRsZVN1Ym1pdENhbGxiYWNrIiwicHJldmVudERlZmF1bHQiLCJzZXRMb2FkaW5nIiwiaXNMb2FkaW5nIiwibG9hZGluZ1RleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJQb3B1cFdpdGhGb3JtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX3BvcHVwRm9ybSIsIl9pbnB1dExpc3QiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJfZm9ybVZhbHVlcyIsImlucHV0IiwidmFsdWUiLCJfc3VibWl0IiwiY29uc29sZSIsImxvZyIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfcHJldmlld0ltYWdlTW9kYWxJbWciLCJfcHJldmlld0ltYWdlTW9kYWxDYXB0aW9uIiwiU2VjdGlvbiIsInNlbGVjdG9yIiwicmVuZGVyZXIiLCJfcmVuZGVyZXIiLCJfZWxlbWVudCIsInJlbmRlckl0ZW1zIiwiaXRlbXMiLCJpdGVtIiwiYWRkSXRlbXMiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJwcm9maWxlVGl0bGUiLCJwcm9maWxlRGVzY3JpcHRpb24iLCJwcm9maWxlQXZhdGFyIiwiX3Byb2ZpbGVUaXRsZSIsIl9wcm9maWxlRGVzY3JpcHRpb24iLCJfcHJvZmlsZUF2YXRhciIsInNldFVzZXJJbmZvIiwiX3JlZjIiLCJhYm91dCIsInNlbGVjdG9ycyIsImNhcmRTZWN0aW9uIiwiY2FyZFRlbXBsYXRlIiwicHJldmlld0ltYWdlTW9kYWwiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiY3JlYXRlQ2FyZCIsImNhcmQiLCJjYXJkUHJldmlld1BvcHVwIiwiaGFuZGxlQ2FyZERlbGV0ZSIsImNvbmZpcm1EZWxldGVQb3B1cCIsImNhdGNoIiwiZXJyIiwiZmluYWxseSIsImVycm9yIiwicmVuZGVyQ2FyZCIsImNhcmRFbGVtZW50IiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlRWRpdE1vZGFsIiwiaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQiLCJhZGROZXdDYXJkQnV0dG9uIiwiYWRkQ2FyZFZhbGlkYXRvciIsImFkZENhcmRGb3JtRWxlbWVudCIsInByb2ZpbGVUaXRsZUlucHV0IiwicHJvZmlsZURlc2NyaXB0aW9uSW5wdXQiLCJwcm9maWxlRWRpdEZvcm0iLCJmb3JtcyIsImF2YXRhck1vZGFsRm9ybSIsInVzZXJJbmZvIiwiaW5wdXRWYWx1ZSIsImluZm8iLCJhdmF0YXJNb2RhbFZhbGlkYXRvciIsImF2YXRhckVkaXRCdXR0b24iLCJOYW1lIiwiRGVzY3JpcHRpb24iLCJjdXJyZW50VXNlckluZm8iLCJwcm9maWxlRWRpdFZhbGlkYXRvciIsInVzZXJEYXRhIiwiY2FyZHNEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==