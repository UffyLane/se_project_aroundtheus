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
  handleLikeIcon() {
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
        card.handleLikeIcon();
      }).catch(console.error);
    } else {
      api.likeCard(id).then(() => {
        card.handleLikeIcon();
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
      addCardModal.close();
      addCardFormElement.reset();
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
      avatarModal.close();
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
    profileEditModal.close();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixLQUFLLENBQUVDLEdBQUcsSUFBSztFQUNkdEMsT0FBTyxDQUFDd0MsS0FBSyxDQUFDRixHQUFHLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUosTUFBTW1CLG9CQUFvQixHQUFHLElBQUlsSSxpRUFBYSxDQUFDO0VBQzdDQyxNQUFNLEVBQUU2SCxlQUFlO0VBQ3ZCNUgsTUFBTSxFQUFFQSxvREFBTUE7QUFDaEIsQ0FBQyxDQUFDO0FBQ0ZnSSxvQkFBb0IsQ0FBQzlGLGdCQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9wYWdlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG4gIH1cblxuICBnZXRBcHBJbmZvKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKSBcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pXG4gICAgLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuXG4gIGZldGNoSW5pdGlhbERhdGEoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldFVzZXJJbmZvKCksIHRoaXMuZ2V0SW5pdGlhbENhcmRzKCldKTtcbiAgfVxuXG4gIGVkaXRwcm9maWxlSW5mbyhkYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuICBcblxuICBhZGRDYXJkTW9kYWwoZGF0YSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICBsaW5rOiBkYXRhLmxpbmssXG4gICAgICB9KSxcbiAgICB9KVxuICAgIC50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgICAgIFxuICBcblxuICByZW1vdmVDYXJkKENhcmRJRCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzLyR7Q2FyZElEfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gICAgfVxuICBcblxuICBsaWtlQ2FyZChDYXJkSUQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkcy8ke0NhcmRJRH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gICBcbiAgXG5cbiAgZGlzbGlrZUNhcmQoQ2FyZElEKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuICBcblxuICBhdmF0YXJNb2RhbCh7IGF2YXRhciB9KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGF2YXRhcixcbiAgICAgIH0pLFxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuXG5fY2hlY2tSZXNwb25zZShyZXMpe1xuICBpZihyZXMub2spe1xuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlamVjdChgVGhlcmUgaGFzIGJlZW4gYW4gZXJyb3JgKTtcbn1cbn1cblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNhcmREYXRhLFxuICAgIGNhcmRTZWxlY3RvcixcbiAgICBoYW5kbGVJbWFnZUNsaWNrLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBoYW5kbGVMaWtlXG4gICkge1xuICAgIHRoaXMuX25hbWUgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX2lkID0gY2FyZERhdGEuX2lkO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcbiAgICB0aGlzLmhhbmRsZURlbGV0ZSA9IGhhbmRsZURlbGV0ZTtcbiAgICB0aGlzLmhhbmRsZUxpa2UgPSBoYW5kbGVMaWtlO1xuICAgIHRoaXMuX2lzTGlrZWQgPSBjYXJkRGF0YS5pc0xpa2VkO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgX3NldEV2ZW50bGlzdGVuZXJzKCkge1xuICAgIC8vIG9uIHRoZSBzZXRFdmVudExpc3RlbmVycyBvZiBDYXJkLmpzXG4gICAgdGhpcy5fY2FyZEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGlrZS1idXR0b25cIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZUxpa2UodGhpcyk7XG4gICAgICBcbiAgICAgIH0pO1xuXG4gICAgLy9cIi5jYXJkX190cmFzaC1idXR0b25cIlxuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRyYXNoLWJ1dHRvblwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlRGVsZXRlKHRoaXMpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHsgbGluazogdGhpcy5fbGluaywgdGV4dDogdGhpcy5fdGV4dCB9KVxuICAgICk7XG4gIH1cblxuICBoYW5kbGVMaWtlSWNvbigpIHtcbiAgIHRoaXMuX2lzTGlrZWQgPSAhdGhpcy5faXNMaWtlZDtcbiAgIHRoaXMudXBkYXRlTGlrZXNWaWV3KCk7XG4gIH1cblxuICBoYW5kbGVUcmFzaEljb24oKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgZ2V0VmlldygpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtaWRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGhpcy5fY2FyZENhcHRpb24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGl0bGUtaWRcIik7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkX19pbWFnZS1tb2RhbFwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcbiAgICB0aGlzLl9jYXJkTGlrZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saWtlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl9jYXJkQ2FwdGlvbi50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XG4gICAgdGhpcy51cGRhdGVMaWtlc1ZpZXcoKTtcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxuXG4gIGlzTGlrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTGlrZWQ7XG4gIH1cblxuICB1cGRhdGVMaWtlc1ZpZXcoKSB7XG4gICAgaWYgKHRoaXMuaXNMaWtlZCgpKSB7XG4gICAgICB0aGlzLl9jYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiY2FyZF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHsgZm9ybUVsLCBjb25maWcgfSkge1xuICAgIHRoaXMuX2Zvcm1FbCA9IGZvcm1FbDtcbiAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gY29uZmlnLmlucHV0U2VsZWN0b3I7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3I7XG4gICAgdGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyA9IGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xuICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IGNvbmZpZy5pbnB1dEVycm9yQ2xhc3M7XG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IGNvbmZpZy5lcnJvckNsYXNzO1xuICAgIHRoaXMuX2Zvcm1TZWxlY3RvciA9IGNvbmZpZy5mb3JtU2VsZWN0b3I7XG4gIH1cblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWwuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5hZGQodGhpcy5fZXJyb3JDbGFzcyk7XG4gIH1cblxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWwuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3JDbGFzcyk7XG4gIH1cblxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpIHtcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9XG4gICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gIH1cblxuICBfaGFzSW52YWxpZElucHV0KCkge1xuICAgIHJldHVybiAhdGhpcy5faW5wdXRFbHMuZXZlcnkoKGlucHV0RWwpID0+IGlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xuICB9XG5cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoKSkge1xuICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKCk7IC8vIGRpc2FibGUgaWYgdGhlIGZvcm0gaXMgaW52YWxpZFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTsgLy8gZW5hYmxlIHRoZSBidXR0b24gdXNpbmcgdGhlIHN0eWxlc1xuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7IC8vIGVuYWJsZSB0aGUgYnV0dG9uIHVzaW5nIHRoZSBgZGlzYWJsZWQgYCBhdHRyaWJ1dGVcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlQnV0dG9uKCkge1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5lbmFibGVkID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBfc2V0RXZlbnRsaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5faW5wdXRFbHMgPSBbLi4udGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXRTZWxlY3RvcildO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGVuYWJsZVZhbGlkYXRpb24oKSB7XG4gICAgdGhpcy5fc2V0RXZlbnRsaXN0ZW5lcnMoKTtcbiAgfVxuICByZXNldFZhbGlkYXRpb24oKSB7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcih7IHBvcHVwU2VsZWN0b3IgfSkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsX19jbG9zZVwiKSB8fFxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwXCI7XG5cbmNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19idXR0b25cIik7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uQ29udGVudCA9IHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHNldFN1Ym1pdEFjdGlvbihhY3Rpb24pIHtcbiAgICB0aGlzLl9oYW5kbGVTdWJtaXRDYWxsYmFjayA9IGFjdGlvbjtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlU3VibWl0Q2FsbGJhY2soKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBzZXRMb2FkaW5nKGlzTG9hZGluZywgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgLy8gaWYgbG9hZGluZyB1c2UgdGhlIGxvYWRpbmcgdGV4dFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vdCBsb2FkaW5nIHVzZSB0aGUgc3VibWl0QnV0dG9uQ29udGVudFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uQ29udGVudDtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aENvbmZpcm07XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0IH0pIHtcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fcG9wdXBGb3JtID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XG4gICAgdGhpcy5faW5wdXRMaXN0ID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kYWxfX2lucHV0XCIpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IHRoaXMuX3BvcHVwRm9ybS5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19idXR0b25cIik7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uQ29udGVudCA9IHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICB0aGlzLl9mb3JtVmFsdWVzID0ge307XG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goXG4gICAgICAoaW5wdXQpID0+ICh0aGlzLl9mb3JtVmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWUpXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLl9mb3JtVmFsdWVzO1xuICB9XG5cbiAgX3N1Ym1pdChldnQpIHtcbiAgICAvL3RoaXMgbWV0aG9kIGlzIHRvIGJlIGNhbGxlZCB3aGVuIGZvcm0gaXMgc3VibWl0ZWRcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2dldElucHV0VmFsdWVzKCkpOyAvL2NhbGwgZXh0ZXJuYWwgY2FsbGJhY2sgX2hhbmRsZUZvcm1TdWJtaXRcbiAgICBcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fcG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXBGb3JtLnJlc2V0KCk7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgfVxuXG4gIHNldExvYWRpbmcoaXNMb2FkaW5nLCBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCIpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAvLyBpZiBsb2FkaW5nIHVzZSB0aGUgbG9hZGluZyB0ZXh0XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBsb2FkaW5nVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm90IGxvYWRpbmcgdXNlIHRoZSBzdWJtaXRCdXR0b25Db250ZW50XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nID1cbiAgICAgIHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24gPVxuICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XG4gIH1cblxuICBvcGVuKGRhdGEpIHtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZy5zcmMgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcuYWx0ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsQ2FwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IHJlbmRlcmVyIH0sIHNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtzZWxlY3Rvcn1gKTtcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKGl0ZW1zKSB7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJdGVtcyhpdGVtKSB7XG4gICAgdGhpcy5fZWxlbWVudC5wcmVwZW5kKGl0ZW0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgcHJvZmlsZVRpdGxlLCBwcm9maWxlRGVzY3JpcHRpb24sIHByb2ZpbGVBdmF0YXIgfSkge1xuICAgIHRoaXMuX3Byb2ZpbGVUaXRsZSA9IHByb2ZpbGVUaXRsZTtcbiAgICB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24gPSBwcm9maWxlRGVzY3JpcHRpb247XG4gICAgdGhpcy5fcHJvZmlsZUF2YXRhciA9IHByb2ZpbGVBdmF0YXI7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvZmlsZVRpdGxlOiB0aGlzLl9wcm9maWxlVGl0bGUudGV4dENvbnRlbnQsXG4gICAgICBwcm9maWxlRGVzY3JpcHRpb246IHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCxcbiAgICAgIHByb2ZpbGVBdmF0YXI6IHRoaXMuX3Byb2ZpbGVBdmF0YXIuc3JjLFxuICAgIH07XG4gIH1cblxuICBzZXRVc2VySW5mbyh7bmFtZSwgYWJvdXQsIGF2YXRhcn0pIHtcbiAgICBpZiAobmFtZSkgdGhpcy5fcHJvZmlsZVRpdGxlLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICBpZiAoYWJvdXQpIHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGFib3V0O1xuICAgIGlmIChhdmF0YXIpIHRoaXMuX3Byb2ZpbGVBdmF0YXIuc3JjID0gYXZhdGFyO1xuICB9XG59XG4iLCJcblxuZXhwb3J0IGNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgY2FyZFNlY3Rpb246IFwiLmNhcmRzX19saXN0XCIsXG4gIGNhcmRUZW1wbGF0ZTogXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICBwcmV2aWV3SW1hZ2VNb2RhbDogXCIjcHJldmlldy1pbWFnZS1tb2RhbFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fYnV0dG9uX2Rpc2FibGVkXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvcl92aXNpYmxlXCIsXG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG4vL2ltcG9ydCBhbGwgdGhlIGNsYXNzZXNcbmltcG9ydCB7IHNlbGVjdG9ycywgY29uZmlnIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZFwiO1xuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvclwiO1xuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvblwiO1xuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlXCI7XG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm9cIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpXCI7XG5pbXBvcnQgUG9wdXBXaXRoQ29uZmlybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtXCI7XG4vL0NyZWF0ZSBpbnN0YW5jZXMgb2YgdGhlIGNsYXNzZXNcblxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQtYXBpLmVuLnRyaXBsZXRlbi1zZXJ2aWNlcy5jb20vdjFcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiZDc4NjQ5ZWQtZmQxNC00MWY3LTlhMmItMDRjM2ZiMTNjYzI4XCIsXG4gICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuY29uc3QgY2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xuICAgICAgY2FyZFNlY3Rpb24uYWRkSXRlbXMoY3JlYXRlQ2FyZChkYXRhKSk7XG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0b3JzLmNhcmRTZWN0aW9uXG4pO1xuXG5jb25zdCBjcmVhdGVDYXJkID0gKGRhdGEpID0+IHtcbiAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKFxuICAgIGRhdGEsXG4gICAgXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICAgICgpID0+IHtcbiAgICAgIGNhcmRQcmV2aWV3UG9wdXAub3BlbihkYXRhKTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uIGhhbmRsZUNhcmREZWxldGUoY2FyZCkge1xuICAgICAgY29uZmlybURlbGV0ZVBvcHVwLm9wZW4oKTtcbiAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5zZXRTdWJtaXRBY3Rpb24oKCkgPT4ge1xuICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyh0cnVlLCBcIkRlbGV0aW5nXCIpO1xuICAgICAgICBhcGlcbiAgICAgICAgICAucmVtb3ZlQ2FyZChjYXJkLmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FyZC5oYW5kbGVUcmFzaEljb24oKTtcbiAgICAgICAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5jbG9zZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uIGhhbmRsZUxpa2UoY2FyZCkge1xuICAgICAgY29uc3QgaWQgPSBjYXJkLmdldElkKCk7XG4gICAgICBpZiAoY2FyZC5pc0xpa2VkKCkpIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLmRpc2xpa2VDYXJkKGlkKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNhcmQuaGFuZGxlTGlrZUljb24oKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5saWtlQ2FyZChpZClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYXJkLmhhbmRsZUxpa2VJY29uKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIHJldHVybiBjYXJkLmdldFZpZXcoKTtcbn07XG5cbmNvbnN0IGNhcmRQcmV2aWV3UG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2Uoc2VsZWN0b3JzLnByZXZpZXdJbWFnZU1vZGFsKTtcbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZERhdGEpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKGNhcmREYXRhKTtcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbXMoY2FyZEVsZW1lbnQpO1xufVxuXG5jb25zdCBjb25maXJtRGVsZXRlUG9wdXAgPSBuZXcgUG9wdXBXaXRoQ29uZmlybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2RlbGV0ZS1jYXJkLW1vZGFsXCIsXG59KTtcbmNvbmZpcm1EZWxldGVQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vLyBpbml0aWFsaXplIGFsbCBteSBpbnN0YW5jZXNcblxuY2FyZFByZXZpZXdQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vKipFbGVtZW50cyAqL1xuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZWRpdC1idXR0b25cIik7XG5jb25zdCBwcm9maWxlRWRpdE1vZGFsID0gbmV3IFBvcHVwV2l0aEZvcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNwcm9maWxlLWVkaXQtbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQsXG59KTtcbnByb2ZpbGVFZGl0TW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgYWRkTmV3Q2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1hZGQtYnV0dG9uXCIpO1xuXG5jb25zdCBhZGRDYXJkTW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2FkZC1jYXJkLW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IChkYXRhKSA9PiB7XG4gICAgYWRkQ2FyZE1vZGFsLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuYWRkQ2FyZE1vZGFsKGRhdGEpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNyZWF0ZUNhcmQocmVzKSk7XG4gICAgICAgIGFkZENhcmRWYWxpZGF0b3IuZGlzYWJsZUJ1dHRvbigpO1xuICAgICAgICBhZGRDYXJkTW9kYWwuY2xvc2UoKTtcbiAgICAgICAgYWRkQ2FyZEZvcm1FbGVtZW50LnJlc2V0KCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGFkZENhcmRNb2RhbC5zZXRMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9LFxufSk7XG5cbmFkZE5ld0NhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkQ2FyZE1vZGFsLm9wZW4oKTtcbn0pO1xuXG5hZGRDYXJkTW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgcHJvZmlsZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlLW5hbWVcIik7XG5jb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZGVzY3JpcHRpb24tdGl0bGVcIik7XG5jb25zdCBwcm9maWxlVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZS1pbnB1dFwiKTtcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi1pbnB1dFwiXG4pO1xuY29uc3QgcHJvZmlsZUF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1pbWFnZS1pZFwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0Rm9ybSA9IGRvY3VtZW50LmZvcm1zW1wiZWRpdC1wcm9maWxlLW1vZGFsX19mb3JtXCJdO1xuY29uc3QgYWRkQ2FyZEZvcm1FbGVtZW50ID0gZG9jdW1lbnQuZm9ybXNbXCJhZGQtY2FyZC1tb2RhbF9fZm9ybVwiXTtcbmNvbnN0IGF2YXRhck1vZGFsRm9ybSA9IGRvY3VtZW50LmZvcm1zW1wiZWRpdC1hdmF0YXItbW9kYWxfX2Zvcm1cIl07XG5cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgcHJvZmlsZVRpdGxlLFxuICBwcm9maWxlRGVzY3JpcHRpb24sXG4gIHByb2ZpbGVBdmF0YXIsXG59KTtcblxuY29uc3QgYXZhdGFyTW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2VkaXQtYXZhdGFyLW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IChpbnB1dFZhbHVlKSA9PiB7XG4gICAgY29uc29sZS5sb2coaW5wdXRWYWx1ZSk7XG4gICAgYXZhdGFyTW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZ1wiKTtcbiAgICBhcGlcbiAgICAgIC5hdmF0YXJNb2RhbChpbnB1dFZhbHVlKVxuICAgICAgLnRoZW4oKGluZm8pID0+IHtcbiAgICAgICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5mbyk7XG4gICAgICAgIGF2YXRhck1vZGFsVmFsaWRhdG9yLmRpc2FibGVCdXR0b24oKTtcbiAgICAgICAgYXZhdGFyTW9kYWwuY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KVxuXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGF2YXRhck1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nXCIpO1xuICAgICAgfSk7XG4gIH0sXG59KTtcblxuY29uc3QgYXZhdGFyRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1hdmF0YXItYnV0dG9uXCIpO1xuYXZhdGFyRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhdmF0YXJNb2RhbC5vcGVuKCk7XG59KTtcbmF2YXRhck1vZGFsLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8qKkV2ZW50IEhhbmRsZXJzICovXG5mdW5jdGlvbiBoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdChkYXRhKSB7XG4gIHByb2ZpbGVFZGl0TW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmVkaXRwcm9maWxlSW5mbyh7IG5hbWU6IGRhdGEuTmFtZSwgYWJvdXQ6IGRhdGEuRGVzY3JpcHRpb24gfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhyZXMpO1xuICAgICAgcHJvZmlsZUVkaXRNb2RhbC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHByb2ZpbGVFZGl0TW9kYWwuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59XG5cbi8qKkV2ZW50IExpc3RlbmVycyAqL1xuXG5wcm9maWxlRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50VXNlckluZm8gPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xuICBwcm9maWxlVGl0bGVJbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VySW5mby5wcm9maWxlVGl0bGU7XG4gIHByb2ZpbGVEZXNjcmlwdGlvbklucHV0LnZhbHVlID0gY3VycmVudFVzZXJJbmZvLnByb2ZpbGVEZXNjcmlwdGlvbjtcbiAgcHJvZmlsZUVkaXRNb2RhbC5vcGVuKCk7XG59KTtcblxuY29uc3QgYWRkQ2FyZFZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHtcbiAgZm9ybUVsOiBhZGRDYXJkRm9ybUVsZW1lbnQsXG4gIGNvbmZpZzogY29uZmlnLFxufSk7XG5hZGRDYXJkVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcblxuY29uc3QgcHJvZmlsZUVkaXRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogcHJvZmlsZUVkaXRGb3JtLFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xucHJvZmlsZUVkaXRWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuYXBpXG4gIC5mZXRjaEluaXRpYWxEYXRhKClcbiAgLnRoZW4oKFt1c2VyRGF0YSwgY2FyZHNEYXRhXSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiaGV5XCIpO1xuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHVzZXJEYXRhKTtcbiAgICBjYXJkU2VjdGlvbi5yZW5kZXJJdGVtcyhjYXJkc0RhdGEpO1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgfSk7XG5cbmNvbnN0IGF2YXRhck1vZGFsVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioe1xuICBmb3JtRWw6IGF2YXRhck1vZGFsRm9ybSxcbiAgY29uZmlnOiBjb25maWcsXG59KTtcbmF2YXRhck1vZGFsVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJiYXNlVXJsIiwiaGVhZGVycyIsImdldEFwcEluZm8iLCJQcm9taXNlIiwiYWxsIiwiZ2V0SW5pdGlhbENhcmRzIiwiZ2V0VXNlckluZm8iLCJmZXRjaCIsInRoZW4iLCJfY2hlY2tSZXNwb25zZSIsImZldGNoSW5pdGlhbERhdGEiLCJlZGl0cHJvZmlsZUluZm8iLCJkYXRhIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhZGRDYXJkTW9kYWwiLCJuYW1lIiwibGluayIsInJlbW92ZUNhcmQiLCJDYXJkSUQiLCJsaWtlQ2FyZCIsImRpc2xpa2VDYXJkIiwiYXZhdGFyTW9kYWwiLCJfcmVmIiwiYXZhdGFyIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0IiwiQ2FyZCIsImNhcmREYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlSW1hZ2VDbGljayIsImhhbmRsZURlbGV0ZSIsImhhbmRsZUxpa2UiLCJfbmFtZSIsIl9saW5rIiwiX2lkIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVJbWFnZUNsaWNrIiwiX2lzTGlrZWQiLCJpc0xpa2VkIiwiZ2V0SWQiLCJfc2V0RXZlbnRsaXN0ZW5lcnMiLCJfY2FyZEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9jYXJkSW1hZ2UiLCJ0ZXh0IiwiX3RleHQiLCJoYW5kbGVMaWtlSWNvbiIsInVwZGF0ZUxpa2VzVmlldyIsImhhbmRsZVRyYXNoSWNvbiIsInJlbW92ZSIsImdldFZpZXciLCJkb2N1bWVudCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJfY2FyZENhcHRpb24iLCJzcmMiLCJfY2FyZExpa2VCdXR0b24iLCJhbHQiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsIkZvcm1WYWxpZGF0b3IiLCJmb3JtRWwiLCJjb25maWciLCJfZm9ybUVsIiwiX2lucHV0U2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwiX3N1Ym1pdEJ1dHRvblNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiX2Vycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiX2Zvcm1TZWxlY3RvciIsImZvcm1TZWxlY3RvciIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWwiLCJfZXJyb3JNZXNzYWdlRWwiLCJpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVJbnB1dEVycm9yIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInZhbGlkaXR5IiwidmFsaWQiLCJfaGFzSW52YWxpZElucHV0IiwiX2lucHV0RWxzIiwiZXZlcnkiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJkaXNhYmxlQnV0dG9uIiwiX3N1Ym1pdEJ1dHRvbiIsImRpc2FibGVkIiwiZW5hYmxlZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZSIsImVuYWJsZVZhbGlkYXRpb24iLCJyZXNldFZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXBFbGVtZW50IiwiX2hhbmRsZUVzY0Nsb3NlIiwiYmluZCIsIm9wZW4iLCJjbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnQiLCJrZXkiLCJzZXRFdmVudExpc3RlbmVycyIsInRhcmdldCIsImNvbnRhaW5zIiwiUG9wdXBXaXRoQ29uZmlybSIsIl9zdWJtaXRCdXR0b25Db250ZW50Iiwic2V0U3VibWl0QWN0aW9uIiwiYWN0aW9uIiwiX2hhbmRsZVN1Ym1pdENhbGxiYWNrIiwicHJldmVudERlZmF1bHQiLCJzZXRMb2FkaW5nIiwiaXNMb2FkaW5nIiwibG9hZGluZ1RleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJQb3B1cFdpdGhGb3JtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX3BvcHVwRm9ybSIsIl9pbnB1dExpc3QiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJfZm9ybVZhbHVlcyIsImlucHV0IiwidmFsdWUiLCJfc3VibWl0IiwiY29uc29sZSIsImxvZyIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfcHJldmlld0ltYWdlTW9kYWxJbWciLCJfcHJldmlld0ltYWdlTW9kYWxDYXB0aW9uIiwiU2VjdGlvbiIsInNlbGVjdG9yIiwicmVuZGVyZXIiLCJfcmVuZGVyZXIiLCJfZWxlbWVudCIsInJlbmRlckl0ZW1zIiwiaXRlbXMiLCJpdGVtIiwiYWRkSXRlbXMiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJwcm9maWxlVGl0bGUiLCJwcm9maWxlRGVzY3JpcHRpb24iLCJwcm9maWxlQXZhdGFyIiwiX3Byb2ZpbGVUaXRsZSIsIl9wcm9maWxlRGVzY3JpcHRpb24iLCJfcHJvZmlsZUF2YXRhciIsInNldFVzZXJJbmZvIiwiX3JlZjIiLCJhYm91dCIsInNlbGVjdG9ycyIsImNhcmRTZWN0aW9uIiwiY2FyZFRlbXBsYXRlIiwicHJldmlld0ltYWdlTW9kYWwiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiY3JlYXRlQ2FyZCIsImNhcmQiLCJjYXJkUHJldmlld1BvcHVwIiwiaGFuZGxlQ2FyZERlbGV0ZSIsImNvbmZpcm1EZWxldGVQb3B1cCIsImNhdGNoIiwiZXJyIiwiZmluYWxseSIsImVycm9yIiwicmVuZGVyQ2FyZCIsImNhcmRFbGVtZW50IiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlRWRpdE1vZGFsIiwiaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQiLCJhZGROZXdDYXJkQnV0dG9uIiwiYWRkQ2FyZFZhbGlkYXRvciIsImFkZENhcmRGb3JtRWxlbWVudCIsInByb2ZpbGVUaXRsZUlucHV0IiwicHJvZmlsZURlc2NyaXB0aW9uSW5wdXQiLCJwcm9maWxlRWRpdEZvcm0iLCJmb3JtcyIsImF2YXRhck1vZGFsRm9ybSIsInVzZXJJbmZvIiwiaW5wdXRWYWx1ZSIsImluZm8iLCJhdmF0YXJNb2RhbFZhbGlkYXRvciIsImF2YXRhckVkaXRCdXR0b24iLCJOYW1lIiwiRGVzY3JpcHRpb24iLCJjdXJyZW50VXNlckluZm8iLCJwcm9maWxlRWRpdFZhbGlkYXRvciIsInVzZXJEYXRhIiwiY2FyZHNEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==