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
        card._updatelikesView();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU8sQ0FBQzBELEtBQUssQ0FBQ3BCLEdBQUcsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFHTixNQUFNbUIsb0JBQW9CLEdBQUcsSUFBSWxJLGlFQUFhLENBQUM7RUFDN0NDLE1BQU0sRUFBRTZILGVBQWU7RUFDdkI1SCxNQUFNLEVBQUVBLG9EQUFNQTtBQUNoQixDQUFDLENBQUM7QUFDRmdJLG9CQUFvQixDQUFDOUYsZ0JBQWdCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3BhZ2VzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9wYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycztcbiAgfVxuXG4gIGdldEFwcEluZm8oKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFVzZXJJbmZvKCldKTtcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KVxuICAgIC50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpIFxuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG5cbiAgZmV0Y2hJbml0aWFsRGF0YSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0VXNlckluZm8oKSwgdGhpcy5nZXRJbml0aWFsQ2FyZHMoKV0pO1xuICB9XG5cbiAgZWRpdHByb2ZpbGVJbmZvKGRhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gIFxuXG4gIGFkZENhcmRNb2RhbChkYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIGxpbms6IGRhdGEubGluayxcbiAgICAgIH0pLFxuICAgIH0pXG4gICAgLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuICAgICAgXG4gIFxuXG4gIHJlbW92ZUNhcmQoQ2FyZElEKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgICB9XG4gIFxuXG4gIGxpa2VDYXJkKENhcmRJRCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzLyR7Q2FyZElEfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgIFxuICBcblxuICBkaXNsaWtlQ2FyZChDYXJkSUQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkcy8ke0NhcmRJRH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gIFxuXG4gIGF2YXRhck1vZGFsKHsgYXZhdGFyIH0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9tZS9hdmF0YXJgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYXZhdGFyLFxuICAgICAgfSksXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG5cbl9jaGVja1Jlc3BvbnNlKHJlcyl7XG4gIGlmKHJlcy5vayl7XG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBUaGVyZSBoYXMgYmVlbiBhbiBlcnJvcmApO1xufVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNhcmREYXRhLFxuICAgIGNhcmRTZWxlY3RvcixcbiAgICBoYW5kbGVJbWFnZUNsaWNrLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBoYW5kbGVMaWtlXG4gICkge1xuICAgIHRoaXMuX25hbWUgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX2lkID0gY2FyZERhdGEuX2lkO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcbiAgICB0aGlzLmhhbmRsZURlbGV0ZSA9IGhhbmRsZURlbGV0ZTtcbiAgICB0aGlzLmhhbmRsZUxpa2UgPSBoYW5kbGVMaWtlO1xuICAgIHRoaXMuX2lzTGlrZWQgPSBjYXJkRGF0YS5pc0xpa2VkO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgX3NldEV2ZW50bGlzdGVuZXJzKCkge1xuICAgIC8vIG9uIHRoZSBzZXRFdmVudExpc3RlbmVycyBvZiBDYXJkLmpzXG4gICAgdGhpcy5fY2FyZEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGlrZS1idXR0b25cIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlSWNvbigpO1xuICAgICAgICB0aGlzLmhhbmRsZUxpa2UodGhpcyk7XG4gICAgICB9KTtcblxuICAgIC8vXCIuY2FyZF9fdHJhc2gtYnV0dG9uXCJcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10cmFzaC1idXR0b25cIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZURlbGV0ZSh0aGlzKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgdGhpcy5faGFuZGxlSW1hZ2VDbGljayh7IGxpbms6IHRoaXMuX2xpbmssIHRleHQ6IHRoaXMuX3RleHQgfSlcbiAgICApO1xuICB9XG5cbiAgX2hhbmRsZUxpa2VJY29uKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpXG4gICAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgfVxuXG4gIF9oYW5kbGVUcmFzaEljb24oKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgZ2V0VmlldygpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtaWRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGhpcy5fY2FyZENhcHRpb24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGl0bGUtaWRcIik7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkX19pbWFnZS1tb2RhbFwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcbiAgICB0aGlzLl9jYXJkTGlrZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saWtlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl9jYXJkQ2FwdGlvbi50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XG4gICAgdGhpcy5fdXBkYXRlTGlrZXNWaWV3KCk7XG4gICAgdGhpcy5fc2V0RXZlbnRsaXN0ZW5lcnMoKTtcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XG4gIH1cblxuICBpc0xpa2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xpa2VkO1xuICB9XG5cbiAgX3VwZGF0ZUxpa2VzVmlldygpIHtcbiAgICBpZiAodGhpcy5pc0xpa2VkKCkpIHtcbiAgICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IoeyBmb3JtRWwsIGNvbmZpZyB9KSB7XG4gICAgdGhpcy5fZm9ybUVsID0gZm9ybUVsO1xuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBjb25maWcuaW5wdXRTZWxlY3RvcjtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3M7XG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gY29uZmlnLmlucHV0RXJyb3JDbGFzcztcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gY29uZmlnLmVycm9yQ2xhc3M7XG4gICAgdGhpcy5fZm9ybVNlbGVjdG9yID0gY29uZmlnLmZvcm1TZWxlY3RvcjtcbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgfVxuXG4gIF9oYXNJbnZhbGlkSW5wdXQoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pbnB1dEVscy5ldmVyeSgoaW5wdXRFbCkgPT4gaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XG4gIH1cblxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XG4gICAgICB0aGlzLmRpc2FibGVCdXR0b24oKTsgLy8gZGlzYWJsZSBpZiB0aGUgZm9ybSBpcyBpbnZhbGlkXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpOyAvLyBlbmFibGUgdGhlIGJ1dHRvbiB1c2luZyB0aGUgc3R5bGVzXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTsgLy8gZW5hYmxlIHRoZSBidXR0b24gdXNpbmcgdGhlIGBkaXNhYmxlZCBgIGF0dHJpYnV0ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVCdXR0b24oKSB7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIF9zZXRFdmVudGxpc3RlbmVycygpIHtcbiAgICB0aGlzLl9pbnB1dEVscyA9IFsuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKV07XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxfX2Nsb3NlXCIpIHx8XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBcIjtcblxuY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yIH0pIHtcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgc2V0U3VibWl0QWN0aW9uKGFjdGlvbikge1xuICAgIHRoaXMuX2hhbmRsZVN1Ym1pdENhbGxiYWNrID0gYWN0aW9uO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXRDYWxsYmFjaygpO1xuICAgIH0pO1xuXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHNldExvYWRpbmcoaXNMb2FkaW5nLCBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCIpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAvLyBpZiBsb2FkaW5nIHVzZSB0aGUgbG9hZGluZyB0ZXh0XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBsb2FkaW5nVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm90IGxvYWRpbmcgdXNlIHRoZSBzdWJtaXRCdXR0b25Db250ZW50XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50O1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoQ29uZmlybTtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcih7IHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQgfSkge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9wb3B1cEZvcm0gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcbiAgICB0aGlzLl9pbnB1dExpc3QgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9faW5wdXRcIik7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fcG9wdXBGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIHRoaXMuX2Zvcm1WYWx1ZXMgPSB7fTtcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaChcbiAgICAgIChpbnB1dCkgPT4gKHRoaXMuX2Zvcm1WYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1WYWx1ZXM7XG4gIH1cblxuICBfc3VibWl0KGV2dCkge1xuICAgIC8vdGhpcyBtZXRob2QgaXMgdG8gYmUgY2FsbGVkIHdoZW4gZm9ybSBpcyBzdWJtaXRlZFxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7IC8vY2FsbCBleHRlcm5hbCBjYWxsYmFjayBfaGFuZGxlRm9ybVN1Ym1pdFxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgLy9Vc2UgJ3RoaXMuX3N1Ym1pdCcgYm91bmRlZCBtZXRob2QgaW5zdGVhZCBvZiBhbm9ueW1vdXMgZnVuY3Rpb25cbiAgICB0aGlzLl9wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cEZvcm0ucmVzZXQoKTtcbiAgICBzdXBlci5jbG9zZSgpO1xuICB9XG5cbiAgc2V0TG9hZGluZyhpc0xvYWRpbmcsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIC8vIGlmIGxvYWRpbmcgdXNlIHRoZSBsb2FkaW5nIHRleHRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBub3QgbG9hZGluZyB1c2UgdGhlIHN1Ym1pdEJ1dHRvbkNvbnRlbnRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcgPVxuICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlXCIpO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsQ2FwdGlvbiA9XG4gICAgICB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2FwdGlvblwiKTtcbiAgfVxuXG4gIG9wZW4oZGF0YSkge1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nLnNyYyA9IGRhdGEubGluaztcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZy5hbHQgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxDYXB0aW9uLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgcmVuZGVyZXIgfSwgc2VsZWN0b3IpIHtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3NlbGVjdG9yfWApO1xuICB9XG5cbiAgcmVuZGVySXRlbXMoaXRlbXMpIHtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEl0ZW1zKGl0ZW0pIHtcbiAgICB0aGlzLl9lbGVtZW50LnByZXBlbmQoaXRlbSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyBwcm9maWxlVGl0bGUsIHByb2ZpbGVEZXNjcmlwdGlvbiwgcHJvZmlsZUF2YXRhciB9KSB7XG4gICAgdGhpcy5fcHJvZmlsZVRpdGxlID0gcHJvZmlsZVRpdGxlO1xuICAgIHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbiA9IHByb2ZpbGVEZXNjcmlwdGlvbjtcbiAgICB0aGlzLl9wcm9maWxlQXZhdGFyID0gcHJvZmlsZUF2YXRhcjtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9maWxlVGl0bGU6IHRoaXMuX3Byb2ZpbGVUaXRsZS50ZXh0Q29udGVudCxcbiAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbjogdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50LFxuICAgICAgcHJvZmlsZUF2YXRhcjogdGhpcy5fcHJvZmlsZUF2YXRhci5zcmMsXG4gICAgfTtcbiAgfVxuXG4gIHNldFVzZXJJbmZvKHtuYW1lLCBhYm91dCwgYXZhdGFyfSkge1xuICAgIGlmIChuYW1lKSB0aGlzLl9wcm9maWxlVGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIGlmIChhYm91dCkgdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYWJvdXQ7XG4gICAgaWYgKGF2YXRhcikgdGhpcy5fcHJvZmlsZUF2YXRhci5zcmMgPSBhdmF0YXI7XG4gIH1cbn1cbiIsIlxuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3JzID0ge1xuICBjYXJkU2VjdGlvbjogXCIuY2FyZHNfX2xpc3RcIixcbiAgY2FyZFRlbXBsYXRlOiBcIiNjYXJkLXRlbXBsYXRlXCIsXG4gIHByZXZpZXdJbWFnZU1vZGFsOiBcIiNwcmV2aWV3LWltYWdlLW1vZGFsXCIsXG59O1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX2J1dHRvblwiLFxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcIm1vZGFsX19idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcbn07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5cbi8vaW1wb3J0IGFsbCB0aGUgY2xhc3Nlc1xuaW1wb3J0IHsgc2VsZWN0b3JzLCBjb25maWcgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkXCI7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uXCI7XG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2VcIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mb1wiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGlcIjtcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm1cIjtcbi8vQ3JlYXRlIGluc3RhbmNlcyBvZiB0aGUgY2xhc3Nlc1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC1hcGkuZW4udHJpcGxldGVuLXNlcnZpY2VzLmNvbS92MVwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJkNzg2NDllZC1mZDE0LTQxZjctOWEyYi0wNGMzZmIxM2NjMjhcIixcbiAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5jb25zdCBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxuICB7XG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiB7XG4gICAgICBjYXJkU2VjdGlvbi5hZGRJdGVtcyhjcmVhdGVDYXJkKGRhdGEpKTtcbiAgICB9LFxuICB9LFxuICBzZWxlY3RvcnMuY2FyZFNlY3Rpb25cbik7XG5cbmNvbnN0IGNyZWF0ZUNhcmQgPSAoZGF0YSkgPT4ge1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoXG4gICAgZGF0YSxcbiAgICBcIiNjYXJkLXRlbXBsYXRlXCIsXG4gICAgKCkgPT4ge1xuICAgICAgY2FyZFByZXZpZXdQb3B1cC5vcGVuKGRhdGEpO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2FyZERlbGV0ZShjYXJkKSB7XG4gICAgICBjb25maXJtRGVsZXRlUG9wdXAub3BlbigpO1xuICAgICAgY29uZmlybURlbGV0ZVBvcHVwLnNldFN1Ym1pdEFjdGlvbigoKSA9PiB7XG4gICAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nXCIpO1xuICAgICAgICBhcGlcbiAgICAgICAgICAucmVtb3ZlQ2FyZChjYXJkLmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FyZC5faGFuZGxlVHJhc2hJY29uKCk7XG4gICAgICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuY2xvc2UoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgY29uZmlybURlbGV0ZVBvcHVwLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICAoY2FyZCkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBjYXJkLmdldElkKCk7XG4gICAgICBpZiAoY2FyZC5pc0xpa2VkKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkaXNsaWtpbmdcIik7XG4gICAgICAgIGFwaS5kaXNsaWtlQ2FyZChpZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibGlraW5nXCIpO1xuICAgICAgICBhcGkubGlrZUNhcmQoaWQpLnRoZW4oKHJlcykgPT4ge2NhcmQuX3VwZGF0ZWxpa2VzVmlldygpO30pXG4gICAgICB9XG4gICAgfSlcbiAgXG4gIHJldHVybiBjYXJkLmdldFZpZXcoKTtcbn07XG5cbmNvbnN0IGNhcmRQcmV2aWV3UG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2Uoc2VsZWN0b3JzLnByZXZpZXdJbWFnZU1vZGFsKTtcbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZERhdGEpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKGNhcmREYXRhKTtcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbXMoY2FyZEVsZW1lbnQpO1xufVxuXG5jb25zdCBjb25maXJtRGVsZXRlUG9wdXAgPSBuZXcgUG9wdXBXaXRoQ29uZmlybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2RlbGV0ZS1jYXJkLW1vZGFsXCIsXG59KTtcbmNvbmZpcm1EZWxldGVQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vLyBpbml0aWFsaXplIGFsbCBteSBpbnN0YW5jZXNcblxuY2FyZFByZXZpZXdQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vKipFbGVtZW50cyAqL1xuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZWRpdC1idXR0b25cIik7XG5jb25zdCBwcm9maWxlRWRpdE1vZGFsID0gbmV3IFBvcHVwV2l0aEZvcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNwcm9maWxlLWVkaXQtbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQsXG59KTtcbnByb2ZpbGVFZGl0TW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgYWRkTmV3Q2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1hZGQtYnV0dG9uXCIpO1xuXG5jb25zdCBhZGRDYXJkTW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2FkZC1jYXJkLW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IChkYXRhKSA9PiB7XG4gICAgYWRkQ2FyZE1vZGFsLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuYWRkQ2FyZE1vZGFsKGRhdGEpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNyZWF0ZUNhcmQocmVzKSk7XG4gICAgICAgIGFkZENhcmRWYWxpZGF0b3IuZGlzYWJsZUJ1dHRvbigpO1xuICAgICAgICBhZGRDYXJkRm9ybUVsZW1lbnQucmVzZXQoKTtcbiAgICAgICAgYWRkQ2FyZE1vZGFsLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGFkZENhcmRNb2RhbC5zZXRMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9LFxufSk7XG5cbmFkZE5ld0NhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkQ2FyZE1vZGFsLm9wZW4oKTtcbn0pO1xuXG5hZGRDYXJkTW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgcHJvZmlsZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlLW5hbWVcIik7XG5jb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZGVzY3JpcHRpb24tdGl0bGVcIik7XG5jb25zdCBwcm9maWxlVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZS1pbnB1dFwiKTtcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi1pbnB1dFwiXG4pO1xuY29uc3QgcHJvZmlsZUF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1pbWFnZS1pZFwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0Rm9ybSA9IGRvY3VtZW50LmZvcm1zW1wiZWRpdC1wcm9maWxlLW1vZGFsX19mb3JtXCJdO1xuY29uc3QgYWRkQ2FyZEZvcm1FbGVtZW50ID0gZG9jdW1lbnQuZm9ybXNbXCJhZGQtY2FyZC1tb2RhbF9fZm9ybVwiXTtcbmNvbnN0IGF2YXRhck1vZGFsRm9ybSA9IGRvY3VtZW50LmZvcm1zW1wiZWRpdC1hdmF0YXItbW9kYWxfX2Zvcm1cIl07XG5cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgcHJvZmlsZVRpdGxlLFxuICBwcm9maWxlRGVzY3JpcHRpb24sXG4gIHByb2ZpbGVBdmF0YXIsXG59KTtcblxuY29uc3QgYXZhdGFyTW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2VkaXQtYXZhdGFyLW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IChpbnB1dFZhbHVlKSA9PiB7XG4gICAgY29uc29sZS5sb2coaW5wdXRWYWx1ZSk7XG4gICAgYXZhdGFyTW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZ1wiKTtcbiAgICBhcGlcbiAgICAgIC5hdmF0YXJNb2RhbChpbnB1dFZhbHVlKVxuICAgICAgLnRoZW4oKGluZm8pID0+IHtcbiAgICAgICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5mbyk7XG4gICAgICAgIGF2YXRhck1vZGFsVmFsaWRhdG9yKGRpc2FibGVCdXR0b24pXG4gICAgICB9KVxuICAgIFxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSlcblxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBhdmF0YXJNb2RhbC5zZXRMb2FkaW5nKGZhbHNlLCBcIlNhdmluZ1wiKTtcbiAgICAgIH0pO1xuICB9LFxufSk7XG5cbmNvbnN0IGF2YXRhckVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtYXZhdGFyLWJ1dHRvblwiKTtcbmF2YXRhckVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYXZhdGFyTW9kYWwub3BlbigpO1xufSk7XG5hdmF0YXJNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vKipFdmVudCBIYW5kbGVycyAqL1xuZnVuY3Rpb24gaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQoZGF0YSkge1xuICBwcm9maWxlRWRpdE1vZGFsLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5lZGl0cHJvZmlsZUluZm8oeyBuYW1lOiBkYXRhLk5hbWUsIGFib3V0OiBkYXRhLkRlc2NyaXB0aW9uIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckluZm8ocmVzKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwcm9maWxlRWRpdE1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufVxuXG4vKipFdmVudCBMaXN0ZW5lcnMgKi9cblxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgY3VycmVudFVzZXJJbmZvID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgcHJvZmlsZVRpdGxlSW5wdXQudmFsdWUgPSBjdXJyZW50VXNlckluZm8ucHJvZmlsZVRpdGxlO1xuICBwcm9maWxlRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VySW5mby5wcm9maWxlRGVzY3JpcHRpb247XG4gIHByb2ZpbGVFZGl0TW9kYWwub3BlbigpO1xufSk7XG5cbmNvbnN0IGFkZENhcmRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogYWRkQ2FyZEZvcm1FbGVtZW50LFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xuYWRkQ2FyZFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG5cbmNvbnN0IHByb2ZpbGVFZGl0VmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioe1xuICBmb3JtRWw6IHByb2ZpbGVFZGl0Rm9ybSxcbiAgY29uZmlnOiBjb25maWcsXG59KTtcbnByb2ZpbGVFZGl0VmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbmFwaVxuICAuZmV0Y2hJbml0aWFsRGF0YSgpXG4gIC50aGVuKChbdXNlckRhdGEsIGNhcmRzRGF0YV0pID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImhleVwiKTtcbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh1c2VyRGF0YSk7XG4gICAgY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoY2FyZHNEYXRhKTtcbiAgfSlcbiAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pXG4gICBcblxuY29uc3QgYXZhdGFyTW9kYWxWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogYXZhdGFyTW9kYWxGb3JtLFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xuYXZhdGFyTW9kYWxWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuIl0sIm5hbWVzIjpbIkFwaSIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImJhc2VVcmwiLCJoZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsImZldGNoIiwidGhlbiIsIl9jaGVja1Jlc3BvbnNlIiwiZmV0Y2hJbml0aWFsRGF0YSIsImVkaXRwcm9maWxlSW5mbyIsImRhdGEiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFkZENhcmRNb2RhbCIsIm5hbWUiLCJsaW5rIiwicmVtb3ZlQ2FyZCIsIkNhcmRJRCIsImxpa2VDYXJkIiwiZGlzbGlrZUNhcmQiLCJhdmF0YXJNb2RhbCIsIl9yZWYiLCJhdmF0YXIiLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJDYXJkIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwiaGFuZGxlRGVsZXRlIiwiaGFuZGxlTGlrZSIsIl9uYW1lIiwiX2xpbmsiLCJfaWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJfaXNMaWtlZCIsImlzTGlrZWQiLCJnZXRJZCIsIl9zZXRFdmVudGxpc3RlbmVycyIsIl9jYXJkRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiX2hhbmRsZUxpa2VJY29uIiwiX2NhcmRJbWFnZSIsInRleHQiLCJfdGV4dCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIl9oYW5kbGVUcmFzaEljb24iLCJyZW1vdmUiLCJnZXRWaWV3IiwiZG9jdW1lbnQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX2NhcmRDYXB0aW9uIiwic3JjIiwiX2NhcmRMaWtlQnV0dG9uIiwiYWx0IiwidGV4dENvbnRlbnQiLCJfdXBkYXRlTGlrZXNWaWV3IiwiYWRkIiwiRm9ybVZhbGlkYXRvciIsImZvcm1FbCIsImNvbmZpZyIsIl9mb3JtRWwiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbCIsIl9lcnJvck1lc3NhZ2VFbCIsImlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfaW5wdXRFbHMiLCJldmVyeSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImRpc2FibGVCdXR0b24iLCJfc3VibWl0QnV0dG9uIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlIiwiZW5hYmxlVmFsaWRhdGlvbiIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwib3BlbiIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiX3N1Ym1pdEJ1dHRvbkNvbnRlbnQiLCJzZXRTdWJtaXRBY3Rpb24iLCJhY3Rpb24iLCJfaGFuZGxlU3VibWl0Q2FsbGJhY2siLCJwcmV2ZW50RGVmYXVsdCIsInNldExvYWRpbmciLCJpc0xvYWRpbmciLCJsb2FkaW5nVGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfcG9wdXBGb3JtIiwiX2lucHV0TGlzdCIsIl9nZXRJbnB1dFZhbHVlcyIsIl9mb3JtVmFsdWVzIiwiaW5wdXQiLCJ2YWx1ZSIsIl9zdWJtaXQiLCJjb25zb2xlIiwibG9nIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9wcmV2aWV3SW1hZ2VNb2RhbEltZyIsIl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24iLCJTZWN0aW9uIiwic2VsZWN0b3IiLCJyZW5kZXJlciIsIl9yZW5kZXJlciIsIl9lbGVtZW50IiwicmVuZGVySXRlbXMiLCJpdGVtcyIsIml0ZW0iLCJhZGRJdGVtcyIsInByZXBlbmQiLCJVc2VySW5mbyIsInByb2ZpbGVUaXRsZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsInByb2ZpbGVBdmF0YXIiLCJfcHJvZmlsZVRpdGxlIiwiX3Byb2ZpbGVEZXNjcmlwdGlvbiIsIl9wcm9maWxlQXZhdGFyIiwic2V0VXNlckluZm8iLCJfcmVmMiIsImFib3V0Iiwic2VsZWN0b3JzIiwiY2FyZFNlY3Rpb24iLCJjYXJkVGVtcGxhdGUiLCJwcmV2aWV3SW1hZ2VNb2RhbCIsImFwaSIsImF1dGhvcml6YXRpb24iLCJjcmVhdGVDYXJkIiwiY2FyZCIsImNhcmRQcmV2aWV3UG9wdXAiLCJoYW5kbGVDYXJkRGVsZXRlIiwiY29uZmlybURlbGV0ZVBvcHVwIiwiY2F0Y2giLCJlcnIiLCJmaW5hbGx5IiwiX3VwZGF0ZWxpa2VzVmlldyIsInJlbmRlckNhcmQiLCJjYXJkRWxlbWVudCIsInByb2ZpbGVFZGl0QnV0dG9uIiwicHJvZmlsZUVkaXRNb2RhbCIsImhhbmRsZVByb2ZpbGVFZGl0U3VibWl0IiwiYWRkTmV3Q2FyZEJ1dHRvbiIsImFkZENhcmRWYWxpZGF0b3IiLCJhZGRDYXJkRm9ybUVsZW1lbnQiLCJwcm9maWxlVGl0bGVJbnB1dCIsInByb2ZpbGVEZXNjcmlwdGlvbklucHV0IiwicHJvZmlsZUVkaXRGb3JtIiwiZm9ybXMiLCJhdmF0YXJNb2RhbEZvcm0iLCJ1c2VySW5mbyIsImlucHV0VmFsdWUiLCJpbmZvIiwiYXZhdGFyTW9kYWxWYWxpZGF0b3IiLCJlcnJvciIsImF2YXRhckVkaXRCdXR0b24iLCJOYW1lIiwiRGVzY3JpcHRpb24iLCJjdXJyZW50VXNlckluZm8iLCJwcm9maWxlRWRpdFZhbGlkYXRvciIsInVzZXJEYXRhIiwiY2FyZHNEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==