/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._inputList = this._popupElement.querySelectorAll('.modal__input');
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
    this._popupForm.addEventListener('submit', evt => {
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
  setUserInfo(data) {
    if (data.name) this._profileTitle.textContent = data.name;
    if (data.about) this._profileDescription.textContent = data.about;
    if (data.avatar) this._profileAvatar.src = data.avatar;
  }
}

/***/ }),

/***/ "./src/pages/Api.js":
/*!**************************!*\
  !*** ./src/pages/Api.js ***!
  \**************************/
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
    }).then(res => res.json());
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    }).then(res => res.json());
  }
  fetchInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
  editprofileInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }).catch(err => {
      console.error(err);
    });
  }
  addCardModal(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }).catch(err => {
      console.error(err);
    });
  }
  removeCard(CardID) {
    return fetch(`${this.baseUrl}/cards/${CardID}`, {
      method: "DELETE",
      headers: this.headers
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }).catch(err => {
      console.error(err);
    });
  }
  likeCard(CardID) {
    return fetch(`${this.baseUrl}/cards/${CardID}/likes`, {
      method: "PUT",
      headers: this.headers
    }).then(res => {
      return this._checkResponse;
    }).catch(err => {
      console.error(err);
    });
  }
  dislikeCard(CardID) {
    return fetch(`${this.baseUrl}/cards/${CardID}/likes`, {
      method: "DELETE",
      headers: this.headers
    }).then(res => {
      return this._checkResponse;
    }).catch(err => {
      console.error(err);
    });
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
    }).then(res => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }).catch(err => {
      console.error(err);
    });
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
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
/* harmony import */ var _pages_Api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pages/Api */ "./src/pages/Api.js");
/* harmony import */ var _components_PopupWithConfirm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/PopupWithConfirm */ "./src/components/PopupWithConfirm.js");


//import all the classes









//Create instances of the classes

const api = new _pages_Api__WEBPACK_IMPORTED_MODULE_8__["default"]({
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
    api.likeCard(id).then(res => {
      card.handlelike();
    });
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
    })
    // .then((res) => {
    //   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    // })
    .catch(err => {
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
    userInfo.setUserInfo(res.name, res.about);
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
  userInfo.setUserInfo(userData.name, userData.about);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUNEN0MsS0FBSyxDQUFFQyxHQUFHLElBQUs7RUFDZGxELE9BQU8sQ0FBQ21ELEtBQUssQ0FBQ0QsR0FBRyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVKLE1BQU02QyxvQkFBb0IsR0FBRyxJQUFJekssaUVBQWEsQ0FBQztFQUM3Q0UsTUFBTSxFQUFFNEosZUFBZTtFQUN2QjNKLE1BQU0sRUFBRUEsb0RBQU1BO0FBQ2hCLENBQUMsQ0FBQztBQUNGc0ssb0JBQW9CLENBQUNwSSxnQkFBZ0IsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3BhZ2VzL0FwaS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3BhZ2VzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9wYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoIGNhcmREYXRhLCAgY2FyZFNlbGVjdG9yLCBoYW5kbGVJbWFnZUNsaWNrLGhhbmRsZURlbGV0ZSwgaGFuZGxlTGlrZSwpIHtcbiAgICB0aGlzLl9uYW1lID0gY2FyZERhdGEubmFtZTtcbiAgICB0aGlzLl9saW5rID0gY2FyZERhdGEubGluaztcbiAgICB0aGlzLl9pZCA9IGNhcmREYXRhLl9pZDtcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XG4gICAgdGhpcy5faGFuZGxlSW1hZ2VDbGljayA9IGhhbmRsZUltYWdlQ2xpY2s7XG4gIHRoaXMuaGFuZGxlRGVsZXRlID0gaGFuZGxlRGVsZXRlO1xuICB0aGlzLmhhbmRsZUxpa2UgPSBoYW5kbGVMaWtlO1xuICB0aGlzLl9pc0xpa2VkID0gY2FyZERhdGEuaXNMaWtlZDtcbiAgXG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBfc2V0RXZlbnRsaXN0ZW5lcnMoKSB7XG4gICAgLy8gb24gdGhlIHNldEV2ZW50TGlzdGVuZXJzIG9mIENhcmQuanNcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saWtlLWJ1dHRvblwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VJY29uKCk7XG4gICAgICB9KTtcblxuICAgIC8vXCIuY2FyZF9fdHJhc2gtYnV0dG9uXCJcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10cmFzaC1idXR0b25cIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZURlbGV0ZSh0aGlzKTtcbiAgICAgIH0pO1xuXG4gICAgXG4gXG4gICAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2soeyBsaW5rOiB0aGlzLl9saW5rLCB0ZXh0OiB0aGlzLl90ZXh0IH0pXG4gICAgICApO1xuICB9XG5cbiAgX2hhbmRsZUxpa2VJY29uKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpXG4gICAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgfVxuXG4gIF9oYW5kbGVUcmFzaEljb24oKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgZ2V0VmlldygpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtaWRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGhpcy5fY2FyZENhcHRpb24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGl0bGUtaWRcIik7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkX19pbWFnZS1tb2RhbFwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcbiAgICB0aGlzLl9jYXJkTGlrZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saWtlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl9jYXJkQ2FwdGlvbi50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XG4gICAgdGhpcy5fdXBkYXRlTGlrZXNWaWV3KCk7XG4gICAgdGhpcy5fc2V0RXZlbnRsaXN0ZW5lcnMoKTtcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XG4gIH1cblxuICBpc0xpa2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xpa2VkO1xuICB9XG5cbiAgX3VwZGF0ZUxpa2VzVmlldygpIHtcbiAgICBpZiAodGhpcy5pc0xpa2VkKCkpIHtcbiAgICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfVxuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHsgZm9ybUVsLCBjb25maWcgfSkge1xuICAgIHRoaXMuX2Zvcm1FbCA9IGZvcm1FbDtcbiAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gY29uZmlnLmlucHV0U2VsZWN0b3I7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3I7XG4gICAgdGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyA9IGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xuICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IGNvbmZpZy5pbnB1dEVycm9yQ2xhc3M7XG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IGNvbmZpZy5lcnJvckNsYXNzO1xuICAgIHRoaXMuX2Zvcm1TZWxlY3RvciA9IGNvbmZpZy5mb3JtU2VsZWN0b3I7XG4gIH1cblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWwuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5hZGQodGhpcy5fZXJyb3JDbGFzcyk7XG4gIH1cblxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWwuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3JDbGFzcyk7XG4gIH1cblxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpIHtcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9XG4gICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gIH1cblxuICBfaGFzSW52YWxpZElucHV0KCkge1xuICAgIHJldHVybiAhdGhpcy5faW5wdXRFbHMuZXZlcnkoKGlucHV0RWwpID0+IGlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xuICB9XG5cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoKSkge1xuICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKCk7ICAvLyBkaXNhYmxlIGlmIHRoZSBmb3JtIGlzIGludmFsaWRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7ICAvLyBlbmFibGUgdGhlIGJ1dHRvbiB1c2luZyB0aGUgc3R5bGVzXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTsgIC8vIGVuYWJsZSB0aGUgYnV0dG9uIHVzaW5nIHRoZSBgZGlzYWJsZWQgYCBhdHRyaWJ1dGVcbiAgICB9XG4gIH1cbiAgXG4gIGRpc2FibGVCdXR0b24oKSB7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIF9zZXRFdmVudGxpc3RlbmVycygpIHtcbiAgICB0aGlzLl9pbnB1dEVscyA9IFsuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKV07XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZSAoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsX19jbG9zZVwiKSB8fFxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwXCI7XG5cbmNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3Rvcix9KSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yfSk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cblxuICAgICAgICBzZXRTdWJtaXRBY3Rpb24oYWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVTdWJtaXRDYWxsYmFjayA9IGFjdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgdGhpcy5faGFuZGxlU3VibWl0Q2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0TG9hZGluZyhpc0xvYWRpbmcsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIil7XG4gICAgICAgICAgICBpZihpc0xvYWRpbmcpe1xuICAgICAgICAgICAgICAvLyBpZiBsb2FkaW5nIHVzZSB0aGUgbG9hZGluZyB0ZXh0XG4gICAgICAgICAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0ICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gaWYgbm90IGxvYWRpbmcgdXNlIHRoZSBzdWJtaXRCdXR0b25Db250ZW50XG4gICAgICAgICAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgICBleHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhDb25maXJtO1xuXG4gICAgICAgIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCx9KSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yfSk7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fcG9wdXBGb3JtID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fZm9ybScpO1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWxfX2lucHV0Jyk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fcG9wdXBGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50O1xuXG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgdGhpcy5fZm9ybVZhbHVlcyA9IHt9O1xuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKGlucHV0ID0+IHRoaXMuX2Zvcm1WYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5fZm9ybVZhbHVlcztcbiAgfVxuXG4gIF9zdWJtaXQoZXZ0KSB7IC8vdGhpcyBtZXRob2QgaXMgdG8gYmUgY2FsbGVkIHdoZW4gZm9ybSBpcyBzdWJtaXRlZFxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7IC8vY2FsbCBleHRlcm5hbCBjYWxsYmFjayBfaGFuZGxlRm9ybVN1Ym1pdFxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgLy9Vc2UgJ3RoaXMuX3N1Ym1pdCcgYm91bmRlZCBtZXRob2QgaW5zdGVhZCBvZiBhbm9ueW1vdXMgZnVuY3Rpb25cbiAgICB0aGlzLl9wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7IFxuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9ICk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cEZvcm0ucmVzZXQoKTtcbiAgICBzdXBlci5jbG9zZSgpO1xuICB9XG5cbiAgc2V0TG9hZGluZyhpc0xvYWRpbmcsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIil7XG4gICAgaWYoaXNMb2FkaW5nKXtcbiAgICAgIC8vIGlmIGxvYWRpbmcgdXNlIHRoZSBsb2FkaW5nIHRleHRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0ICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBub3QgbG9hZGluZyB1c2UgdGhlIHN1Ym1pdEJ1dHRvbkNvbnRlbnRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnRcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZyA9XG4gICAgICB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxDYXB0aW9uID1cbiAgICAgIHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYXB0aW9uXCIpO1xuICB9XG5cbiAgb3BlbihkYXRhKSB7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcuc3JjID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nLmFsdCA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyByZW5kZXJlcn0sIHNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtzZWxlY3Rvcn1gKTtcbiAgICBcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKGl0ZW1zKSB7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSlcbiAgICB9KTtcbiAgICBcbiAgfVxuXG4gIGFkZEl0ZW1zKGl0ZW0pIHtcbiAgICB0aGlzLl9lbGVtZW50LnByZXBlbmQoaXRlbSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyBwcm9maWxlVGl0bGUsIHByb2ZpbGVEZXNjcmlwdGlvbiwgcHJvZmlsZUF2YXRhciB9KSB7XG4gICAgdGhpcy5fcHJvZmlsZVRpdGxlID0gcHJvZmlsZVRpdGxlO1xuICAgIHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbiA9IHByb2ZpbGVEZXNjcmlwdGlvbjtcbiAgICB0aGlzLl9wcm9maWxlQXZhdGFyID0gcHJvZmlsZUF2YXRhcjtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9maWxlVGl0bGU6IHRoaXMuX3Byb2ZpbGVUaXRsZS50ZXh0Q29udGVudCxcbiAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbjogdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50LFxuICAgICAgcHJvZmlsZUF2YXRhcjogdGhpcy5fcHJvZmlsZUF2YXRhci5zcmMsXG4gICAgfTtcbiAgfVxuXG4gIHNldFVzZXJJbmZvKGRhdGEpIHtcbiAgICBpZiAoZGF0YS5uYW1lKSB0aGlzLl9wcm9maWxlVGl0bGUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgaWYgKGRhdGEuYWJvdXQpIHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEuYWJvdXQ7XG4gICAgaWYgKGRhdGEuYXZhdGFyKSB0aGlzLl9wcm9maWxlQXZhdGFyLnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycztcbiAgfVxuXG4gIGdldEFwcEluZm8oKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFVzZXJJbmZvKCldKTtcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcbiAgfVxuXG4gIGZldGNoSW5pdGlhbERhdGEoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldFVzZXJJbmZvKCksIHRoaXMuZ2V0SW5pdGlhbENhcmRzKCldKTtcbiAgfVxuXG4gIGVkaXRwcm9maWxlSW5mbyhkYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMub2sgPyByZXMuanNvbigpIDogUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSk7XG4gIH1cblxuICBhZGRDYXJkTW9kYWwoZGF0YSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICBsaW5rOiBkYXRhLmxpbmssXG4gICAgICB9KSxcbiAgICB9KVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLm9rID8gcmVzLmpzb24oKSA6IFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ2FyZChDYXJkSUQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkcy8ke0NhcmRJRH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5vayA/IHJlcy5qc29uKCkgOiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KTtcbiAgfVxuXG4gIGxpa2VDYXJkKENhcmRJRCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzLyR7Q2FyZElEfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tSZXNwb25zZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KTtcbiAgfVxuXG4gIGRpc2xpa2VDYXJkKENhcmRJRCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzLyR7Q2FyZElEfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tSZXNwb25zZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KTtcbiAgfVxuXG4gIGF2YXRhck1vZGFsKHthdmF0YXJ9KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGF2YXRhcixcbiAgICAgIH0pLFxuICAgIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMub2sgPyByZXMuanNvbigpIDogUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSk7XG4gIH1cblxuICBfY2hlY2tSZXNwb25zZShyZXMpIHtcbiAgICByZXR1cm4gcmVzLm9rID8gcmVzLmpzb24oKSA6IFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICB9XG59XG4iLCJcblxuZXhwb3J0IGNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgY2FyZFNlY3Rpb246IFwiLmNhcmRzX19saXN0XCIsXG4gIGNhcmRUZW1wbGF0ZTogXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICBwcmV2aWV3SW1hZ2VNb2RhbDogXCIjcHJldmlldy1pbWFnZS1tb2RhbFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fYnV0dG9uX2Rpc2FibGVkXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvcl92aXNpYmxlXCIsXG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG4vL2ltcG9ydCBhbGwgdGhlIGNsYXNzZXNcbmltcG9ydCB7IHNlbGVjdG9ycywgY29uZmlnIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZFwiO1xuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvclwiO1xuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvblwiO1xuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlXCI7XG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm9cIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL3BhZ2VzL0FwaVwiO1xuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybVwiO1xuLy9DcmVhdGUgaW5zdGFuY2VzIG9mIHRoZSBjbGFzc2VzXG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImQ3ODY0OWVkLWZkMTQtNDFmNy05YTJiLTA0YzNmYjEzY2MyOFwiLFxuICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmNvbnN0IGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gIHtcbiAgICByZW5kZXJlcjogKGRhdGEpID0+IHtcbiAgICAgIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNyZWF0ZUNhcmQoZGF0YSkpO1xuICAgIH0sXG4gIH0sXG4gIHNlbGVjdG9ycy5jYXJkU2VjdGlvblxuKTtcblxuY29uc3QgY3JlYXRlQ2FyZCA9IChkYXRhKSA9PiB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBkYXRhLFxuICAgIFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgICAoKSA9PiB7XG4gICAgICBjYXJkUHJldmlld1BvcHVwLm9wZW4oZGF0YSk7XG4gICAgfSxcbiAgICBmdW5jdGlvbiBoYW5kbGVDYXJkRGVsZXRlKGNhcmQpIHtcbiAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5vcGVuKCk7XG4gICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0U3VibWl0QWN0aW9uKCgpID0+IHtcbiAgICAgICAgY29uZmlybURlbGV0ZVBvcHVwLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmdcIik7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5yZW1vdmVDYXJkKGNhcmQuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYXJkLl9oYW5kbGVUcmFzaEljb24oKTtcbiAgICAgICAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5jbG9zZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmdcIik7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIChjYXJkKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IGNhcmQuZ2V0SWQoKTtcbiAgICAgIGFwaS5saWtlQ2FyZChpZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmQuaGFuZGxlbGlrZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICApO1xuXG4gIHJldHVybiBjYXJkLmdldFZpZXcoKTtcbn07XG5cbmNvbnN0IGNhcmRQcmV2aWV3UG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2Uoc2VsZWN0b3JzLnByZXZpZXdJbWFnZU1vZGFsKTtcbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZERhdGEpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKGNhcmREYXRhKTtcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbXMoY2FyZEVsZW1lbnQpO1xufVxuXG5jb25zdCBjb25maXJtRGVsZXRlUG9wdXAgPSBuZXcgUG9wdXBXaXRoQ29uZmlybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2RlbGV0ZS1jYXJkLW1vZGFsXCIsXG59KTtcbmNvbmZpcm1EZWxldGVQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vLyBpbml0aWFsaXplIGFsbCBteSBpbnN0YW5jZXNcblxuY2FyZFByZXZpZXdQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vKipFbGVtZW50cyAqL1xuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZWRpdC1idXR0b25cIik7XG5jb25zdCBwcm9maWxlRWRpdE1vZGFsID0gbmV3IFBvcHVwV2l0aEZvcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNwcm9maWxlLWVkaXQtbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQsXG59KTtcbnByb2ZpbGVFZGl0TW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgYWRkTmV3Q2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1hZGQtYnV0dG9uXCIpO1xuXG5jb25zdCBhZGRDYXJkTW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2FkZC1jYXJkLW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IChkYXRhKSA9PiB7XG4gICAgYWRkQ2FyZE1vZGFsLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuYWRkQ2FyZE1vZGFsKGRhdGEpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNyZWF0ZUNhcmQocmVzKSk7XG4gICAgICAgIGFkZENhcmRWYWxpZGF0b3IuZGlzYWJsZUJ1dHRvbigpO1xuICAgICAgICBhZGRDYXJkRm9ybUVsZW1lbnQucmVzZXQoKTtcbiAgICAgICAgYWRkQ2FyZE1vZGFsLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGFkZENhcmRNb2RhbC5zZXRMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9LFxufSk7XG5cbmFkZE5ld0NhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkQ2FyZE1vZGFsLm9wZW4oKTtcbn0pO1xuXG5hZGRDYXJkTW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgcHJvZmlsZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlLW5hbWVcIik7XG5jb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZGVzY3JpcHRpb24tdGl0bGVcIik7XG5jb25zdCBwcm9maWxlVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZS1pbnB1dFwiKTtcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi1pbnB1dFwiXG4pO1xuY29uc3QgcHJvZmlsZUF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1pbWFnZS1pZFwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0Rm9ybSA9IGRvY3VtZW50LmZvcm1zW1wiZWRpdC1wcm9maWxlLW1vZGFsX19mb3JtXCJdO1xuY29uc3QgYWRkQ2FyZEZvcm1FbGVtZW50ID0gZG9jdW1lbnQuZm9ybXNbXCJhZGQtY2FyZC1tb2RhbF9fZm9ybVwiXTtcbmNvbnN0IGF2YXRhck1vZGFsRm9ybSA9IGRvY3VtZW50LmZvcm1zW1wiZWRpdC1hdmF0YXItbW9kYWxfX2Zvcm1cIl07XG5cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgcHJvZmlsZVRpdGxlLFxuICBwcm9maWxlRGVzY3JpcHRpb24sXG4gIHByb2ZpbGVBdmF0YXIsXG59KTtcblxuY29uc3QgYXZhdGFyTW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI2VkaXQtYXZhdGFyLW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IChpbnB1dFZhbHVlKSA9PiB7XG4gICAgY29uc29sZS5sb2coaW5wdXRWYWx1ZSk7XG4gICAgYXZhdGFyTW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZ1wiKTtcbiAgICBhcGlcbiAgICAgIC5hdmF0YXJNb2RhbChpbnB1dFZhbHVlKVxuICAgICAgLnRoZW4oKGluZm8pID0+IHtcbiAgICAgICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5mbyk7XG4gICAgICB9KVxuICAgICAgLy8gLnRoZW4oKHJlcykgPT4ge1xuICAgICAgLy8gICByZXR1cm4gcmVzLm9rID8gcmVzLmpzb24oKSA6IFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgICAgLy8gfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGF2YXRhck1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nXCIpO1xuICAgICAgfSk7XG4gIH0sXG59KTtcblxuY29uc3QgYXZhdGFyRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1hdmF0YXItYnV0dG9uXCIpO1xuYXZhdGFyRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhdmF0YXJNb2RhbC5vcGVuKCk7XG59KTtcbmF2YXRhck1vZGFsLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8qKkV2ZW50IEhhbmRsZXJzICovXG5mdW5jdGlvbiBoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdChkYXRhKSB7XG4gIHByb2ZpbGVFZGl0TW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmVkaXRwcm9maWxlSW5mbyh7IG5hbWU6IGRhdGEuTmFtZSwgYWJvdXQ6IGRhdGEuRGVzY3JpcHRpb24gfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhyZXMubmFtZSwgcmVzLmFib3V0KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwcm9maWxlRWRpdE1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufVxuXG4vKipFdmVudCBMaXN0ZW5lcnMgKi9cblxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgY3VycmVudFVzZXJJbmZvID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgcHJvZmlsZVRpdGxlSW5wdXQudmFsdWUgPSBjdXJyZW50VXNlckluZm8ucHJvZmlsZVRpdGxlO1xuICBwcm9maWxlRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VySW5mby5wcm9maWxlRGVzY3JpcHRpb247XG4gIHByb2ZpbGVFZGl0TW9kYWwub3BlbigpO1xufSk7XG5cbmNvbnN0IGFkZENhcmRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogYWRkQ2FyZEZvcm1FbGVtZW50LFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xuYWRkQ2FyZFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG5cbmNvbnN0IHByb2ZpbGVFZGl0VmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioe1xuICBmb3JtRWw6IHByb2ZpbGVFZGl0Rm9ybSxcbiAgY29uZmlnOiBjb25maWcsXG59KTtcbnByb2ZpbGVFZGl0VmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbmFwaVxuICAuZmV0Y2hJbml0aWFsRGF0YSgpXG4gIC50aGVuKChbdXNlckRhdGEsIGNhcmRzRGF0YV0pID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImhleVwiKTtcbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh1c2VyRGF0YS5uYW1lLCB1c2VyRGF0YS5hYm91dCk7XG4gICAgY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoY2FyZHNEYXRhKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH0pO1xuXG5jb25zdCBhdmF0YXJNb2RhbFZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHtcbiAgZm9ybUVsOiBhdmF0YXJNb2RhbEZvcm0sXG4gIGNvbmZpZzogY29uZmlnLFxufSk7XG5hdmF0YXJNb2RhbFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG4iXSwibmFtZXMiOlsiQ2FyZCIsImNvbnN0cnVjdG9yIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwiaGFuZGxlRGVsZXRlIiwiaGFuZGxlTGlrZSIsIl9uYW1lIiwibmFtZSIsIl9saW5rIiwibGluayIsIl9pZCIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlSW1hZ2VDbGljayIsIl9pc0xpa2VkIiwiaXNMaWtlZCIsImdldElkIiwiX3NldEV2ZW50bGlzdGVuZXJzIiwiX2NhcmRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJfaGFuZGxlTGlrZUljb24iLCJfY2FyZEltYWdlIiwidGV4dCIsIl90ZXh0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiX2hhbmRsZVRyYXNoSWNvbiIsInJlbW92ZSIsImdldFZpZXciLCJkb2N1bWVudCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJfY2FyZENhcHRpb24iLCJzcmMiLCJfY2FyZExpa2VCdXR0b24iLCJhbHQiLCJ0ZXh0Q29udGVudCIsIl91cGRhdGVMaWtlc1ZpZXciLCJhZGQiLCJGb3JtVmFsaWRhdG9yIiwiX3JlZiIsImZvcm1FbCIsImNvbmZpZyIsIl9mb3JtRWwiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbCIsIl9lcnJvck1lc3NhZ2VFbCIsImlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfaW5wdXRFbHMiLCJldmVyeSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImRpc2FibGVCdXR0b24iLCJfc3VibWl0QnV0dG9uIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlIiwiZW5hYmxlVmFsaWRhdGlvbiIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwib3BlbiIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiX3N1Ym1pdEJ1dHRvbkNvbnRlbnQiLCJzZXRTdWJtaXRBY3Rpb24iLCJhY3Rpb24iLCJfaGFuZGxlU3VibWl0Q2FsbGJhY2siLCJwcmV2ZW50RGVmYXVsdCIsInNldExvYWRpbmciLCJpc0xvYWRpbmciLCJsb2FkaW5nVGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfcG9wdXBGb3JtIiwiX2lucHV0TGlzdCIsIl9nZXRJbnB1dFZhbHVlcyIsIl9mb3JtVmFsdWVzIiwiaW5wdXQiLCJ2YWx1ZSIsIl9zdWJtaXQiLCJjb25zb2xlIiwibG9nIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9wcmV2aWV3SW1hZ2VNb2RhbEltZyIsIl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24iLCJkYXRhIiwiU2VjdGlvbiIsInNlbGVjdG9yIiwicmVuZGVyZXIiLCJfcmVuZGVyZXIiLCJfZWxlbWVudCIsInJlbmRlckl0ZW1zIiwiaXRlbXMiLCJpdGVtIiwiYWRkSXRlbXMiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJwcm9maWxlVGl0bGUiLCJwcm9maWxlRGVzY3JpcHRpb24iLCJwcm9maWxlQXZhdGFyIiwiX3Byb2ZpbGVUaXRsZSIsIl9wcm9maWxlRGVzY3JpcHRpb24iLCJfcHJvZmlsZUF2YXRhciIsImdldFVzZXJJbmZvIiwic2V0VXNlckluZm8iLCJhYm91dCIsImF2YXRhciIsIkFwaSIsIm9wdGlvbnMiLCJiYXNlVXJsIiwiaGVhZGVycyIsImdldEFwcEluZm8iLCJQcm9taXNlIiwiYWxsIiwiZ2V0SW5pdGlhbENhcmRzIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwianNvbiIsImZldGNoSW5pdGlhbERhdGEiLCJlZGl0cHJvZmlsZUluZm8iLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwicmVqZWN0Iiwic3RhdHVzIiwiY2F0Y2giLCJlcnIiLCJlcnJvciIsImFkZENhcmRNb2RhbCIsInJlbW92ZUNhcmQiLCJDYXJkSUQiLCJsaWtlQ2FyZCIsIl9jaGVja1Jlc3BvbnNlIiwiZGlzbGlrZUNhcmQiLCJhdmF0YXJNb2RhbCIsInNlbGVjdG9ycyIsImNhcmRTZWN0aW9uIiwiY2FyZFRlbXBsYXRlIiwicHJldmlld0ltYWdlTW9kYWwiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiY3JlYXRlQ2FyZCIsImNhcmQiLCJjYXJkUHJldmlld1BvcHVwIiwiaGFuZGxlQ2FyZERlbGV0ZSIsImNvbmZpcm1EZWxldGVQb3B1cCIsImZpbmFsbHkiLCJoYW5kbGVsaWtlIiwicmVuZGVyQ2FyZCIsImNhcmRFbGVtZW50IiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlRWRpdE1vZGFsIiwiaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQiLCJhZGROZXdDYXJkQnV0dG9uIiwiYWRkQ2FyZFZhbGlkYXRvciIsImFkZENhcmRGb3JtRWxlbWVudCIsInByb2ZpbGVUaXRsZUlucHV0IiwicHJvZmlsZURlc2NyaXB0aW9uSW5wdXQiLCJwcm9maWxlRWRpdEZvcm0iLCJmb3JtcyIsImF2YXRhck1vZGFsRm9ybSIsInVzZXJJbmZvIiwiaW5wdXRWYWx1ZSIsImluZm8iLCJhdmF0YXJFZGl0QnV0dG9uIiwiTmFtZSIsIkRlc2NyaXB0aW9uIiwiY3VycmVudFVzZXJJbmZvIiwicHJvZmlsZUVkaXRWYWxpZGF0b3IiLCJ1c2VyRGF0YSIsImNhcmRzRGF0YSIsImF2YXRhck1vZGFsVmFsaWRhdG9yIl0sInNvdXJjZVJvb3QiOiIifQ==