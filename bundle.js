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
      api.dislikeCard(id).then(res => {
        card.updateLikesView();
      });
    } else {
      console.log("liking");
      api.likeCard(id).then(res => {
        card.updateLikesView();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3FELFNBQVMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FDRDNCLEtBQUssQ0FBRUMsR0FBRyxJQUFLO0VBQ2R0QyxPQUFPLENBQUN5RCxLQUFLLENBQUNuQixHQUFHLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUosTUFBTTJCLG9CQUFvQixHQUFHLElBQUkxSSxpRUFBYSxDQUFDO0VBQzdDQyxNQUFNLEVBQUU2SCxlQUFlO0VBQ3ZCNUgsTUFBTSxFQUFFQSxvREFBTUE7QUFDaEIsQ0FBQyxDQUFDO0FBQ0Z3SSxvQkFBb0IsQ0FBQ3RHLGdCQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9wYWdlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG4gIH1cblxuICBnZXRBcHBJbmZvKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSk7XG4gIH1cblxuICBmZXRjaEluaXRpYWxEYXRhKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRVc2VySW5mbygpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSk7XG4gIH1cblxuICBlZGl0cHJvZmlsZUluZm8oZGF0YSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgXG5cbiAgYWRkQ2FyZE1vZGFsKGRhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgbGluazogZGF0YS5saW5rLFxuICAgICAgfSksXG4gICAgfSlcbiAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gICAgICBcbiAgXG5cbiAgcmVtb3ZlQ2FyZChDYXJkSUQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkcy8ke0NhcmRJRH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICAgIH1cbiAgXG5cbiAgbGlrZUNhcmQoQ2FyZElEKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuICAgXG4gIFxuXG4gIGRpc2xpa2VDYXJkKENhcmRJRCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzLyR7Q2FyZElEfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgXG5cbiAgYXZhdGFyTW9kYWwoeyBhdmF0YXIgfSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhdmF0YXIsXG4gICAgICB9KSxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgXG5fY2hlY2tSZXNwb25zZShyZXMpe1xuICBpZihyZXMub2spe1xuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlamVjdChgVGhlcmUgaGFzIGJlZW4gYW4gZXJyb3JgKTtcbn1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYXJkRGF0YSxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlSW1hZ2VDbGljayxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgaGFuZGxlTGlrZVxuICApIHtcbiAgICB0aGlzLl9uYW1lID0gY2FyZERhdGEubmFtZTtcbiAgICB0aGlzLl9saW5rID0gY2FyZERhdGEubGluaztcbiAgICB0aGlzLl9pZCA9IGNhcmREYXRhLl9pZDtcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XG4gICAgdGhpcy5faGFuZGxlSW1hZ2VDbGljayA9IGhhbmRsZUltYWdlQ2xpY2s7XG4gICAgdGhpcy5oYW5kbGVEZWxldGUgPSBoYW5kbGVEZWxldGU7XG4gICAgdGhpcy5oYW5kbGVMaWtlID0gaGFuZGxlTGlrZTtcbiAgICB0aGlzLl9pc0xpa2VkID0gY2FyZERhdGEuaXNMaWtlZDtcbiAgfVxuXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIF9zZXRFdmVudGxpc3RlbmVycygpIHtcbiAgICAvLyBvbiB0aGUgc2V0RXZlbnRMaXN0ZW5lcnMgb2YgQ2FyZC5qc1xuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlTGlrZUljb24oKTtcbiAgICAgIH0pO1xuXG4gICAgLy9cIi5jYXJkX190cmFzaC1idXR0b25cIlxuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRyYXNoLWJ1dHRvblwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlRGVsZXRlKHRoaXMpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHsgbGluazogdGhpcy5fbGluaywgdGV4dDogdGhpcy5fdGV4dCB9KVxuICAgICk7XG4gIH1cblxuICBfaGFuZGxlTGlrZUljb24oKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGlrZS1idXR0b25cIilcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICB9XG5cbiAgX2hhbmRsZVRyYXNoSWNvbigpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBnZXRWaWV3KCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1pZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLl9jYXJkQ2FwdGlvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10aXRsZS1pZFwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmRfX2ltYWdlLW1vZGFsXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9saW5rO1xuICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xuICAgIHRoaXMuX2NhcmRDYXB0aW9uLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl91cGRhdGVMaWtlc1ZpZXcoKTtcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxuXG4gIGlzTGlrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTGlrZWQ7XG4gIH1cblxuICBfdXBkYXRlTGlrZXNWaWV3KCkge1xuICAgIGlmICh0aGlzLmlzTGlrZWQoKSkge1xuICAgICAgdGhpcy5fY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3Rvcih7IGZvcm1FbCwgY29uZmlnIH0pIHtcbiAgICB0aGlzLl9mb3JtRWwgPSBmb3JtRWw7XG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IGNvbmZpZy5pbnB1dFNlbGVjdG9yO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yO1xuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcztcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBjb25maWcuaW5wdXRFcnJvckNsYXNzO1xuICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSBjb25maWcuZXJyb3JDbGFzcztcbiAgICB0aGlzLl9mb3JtU2VsZWN0b3IgPSBjb25maWcuZm9ybVNlbGVjdG9yO1xuICB9XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xuICB9XG5cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xuICB9XG5cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKSB7XG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfVxuICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICB9XG5cbiAgX2hhc0ludmFsaWRJbnB1dCgpIHtcbiAgICByZXR1cm4gIXRoaXMuX2lucHV0RWxzLmV2ZXJ5KChpbnB1dEVsKSA9PiBpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKTtcbiAgfVxuXG4gIF90b2dnbGVCdXR0b25TdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigpOyAvLyBkaXNhYmxlIGlmIHRoZSBmb3JtIGlzIGludmFsaWRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7IC8vIGVuYWJsZSB0aGUgYnV0dG9uIHVzaW5nIHRoZSBzdHlsZXNcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlOyAvLyBlbmFibGUgdGhlIGJ1dHRvbiB1c2luZyB0aGUgYGRpc2FibGVkIGAgYXR0cmlidXRlXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgX3NldEV2ZW50bGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2lucHV0RWxzID0gWy4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2lucHV0U2VsZWN0b3IpXTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3Rvcih0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3NldEV2ZW50bGlzdGVuZXJzKCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlID0gdGhpcy5faGFuZGxlRXNjQ2xvc2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9fY2xvc2VcIikgfHxcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxcIilcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFwiO1xuXG5jbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcih7IHBvcHVwU2VsZWN0b3IgfSkge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRTdWJtaXRBY3Rpb24oYWN0aW9uKSB7XG4gICAgdGhpcy5faGFuZGxlU3VibWl0Q2FsbGJhY2sgPSBhY3Rpb247XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZVN1Ym1pdENhbGxiYWNrKCk7XG4gICAgfSk7XG5cbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgc2V0TG9hZGluZyhpc0xvYWRpbmcsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIC8vIGlmIGxvYWRpbmcgdXNlIHRoZSBsb2FkaW5nIHRleHRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBub3QgbG9hZGluZyB1c2UgdGhlIHN1Ym1pdEJ1dHRvbkNvbnRlbnRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhDb25maXJtO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCB9KSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX3BvcHVwRm9ybSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19pbnB1dFwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9wb3B1cEZvcm0ucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgdGhpcy5fZm9ybVZhbHVlcyA9IHt9O1xuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKFxuICAgICAgKGlucHV0KSA9PiAodGhpcy5fZm9ybVZhbHVlc1tpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5fZm9ybVZhbHVlcztcbiAgfVxuXG4gIF9zdWJtaXQoZXZ0KSB7XG4gICAgLy90aGlzIG1ldGhvZCBpcyB0byBiZSBjYWxsZWQgd2hlbiBmb3JtIGlzIHN1Ym1pdGVkXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTsgLy9jYWxsIGV4dGVybmFsIGNhbGxiYWNrIF9oYW5kbGVGb3JtU3VibWl0XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAvL1VzZSAndGhpcy5fc3VibWl0JyBib3VuZGVkIG1ldGhvZCBpbnN0ZWFkIG9mIGFub255bW91cyBmdW5jdGlvblxuICAgIHRoaXMuX3BvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwRm9ybS5yZXNldCgpO1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gIH1cblxuICBzZXRMb2FkaW5nKGlzTG9hZGluZywgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgLy8gaWYgbG9hZGluZyB1c2UgdGhlIGxvYWRpbmcgdGV4dFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vdCBsb2FkaW5nIHVzZSB0aGUgc3VibWl0QnV0dG9uQ29udGVudFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uQ29udGVudDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZyA9XG4gICAgICB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxDYXB0aW9uID1cbiAgICAgIHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYXB0aW9uXCIpO1xuICB9XG5cbiAgb3BlbihkYXRhKSB7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcuc3JjID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nLmFsdCA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyByZW5kZXJlciB9LCBzZWxlY3Rvcikge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7c2VsZWN0b3J9YCk7XG4gIH1cblxuICByZW5kZXJJdGVtcyhpdGVtcykge1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbXMoaXRlbSkge1xuICAgIHRoaXMuX2VsZW1lbnQucHJlcGVuZChpdGVtKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IHByb2ZpbGVUaXRsZSwgcHJvZmlsZURlc2NyaXB0aW9uLCBwcm9maWxlQXZhdGFyIH0pIHtcbiAgICB0aGlzLl9wcm9maWxlVGl0bGUgPSBwcm9maWxlVGl0bGU7XG4gICAgdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uID0gcHJvZmlsZURlc2NyaXB0aW9uO1xuICAgIHRoaXMuX3Byb2ZpbGVBdmF0YXIgPSBwcm9maWxlQXZhdGFyO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb2ZpbGVUaXRsZTogdGhpcy5fcHJvZmlsZVRpdGxlLnRleHRDb250ZW50LFxuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uOiB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQsXG4gICAgICBwcm9maWxlQXZhdGFyOiB0aGlzLl9wcm9maWxlQXZhdGFyLnNyYyxcbiAgICB9O1xuICB9XG5cbiAgc2V0VXNlckluZm8oe25hbWUsIGFib3V0LCBhdmF0YXJ9KSB7XG4gICAgaWYgKG5hbWUpIHRoaXMuX3Byb2ZpbGVUaXRsZS50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgaWYgKGFib3V0KSB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBhYm91dDtcbiAgICBpZiAoYXZhdGFyKSB0aGlzLl9wcm9maWxlQXZhdGFyLnNyYyA9IGF2YXRhcjtcbiAgfVxufVxuIiwiXG5cbmV4cG9ydCBjb25zdCBzZWxlY3RvcnMgPSB7XG4gIGNhcmRTZWN0aW9uOiBcIi5jYXJkc19fbGlzdFwiLFxuICBjYXJkVGVtcGxhdGU6IFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgcHJldmlld0ltYWdlTW9kYWw6IFwiI3ByZXZpZXctaW1hZ2UtbW9kYWxcIixcbn07XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2J1dHRvbl9kaXNhYmxlZFwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcblxuLy9pbXBvcnQgYWxsIHRoZSBjbGFzc2VzXG5pbXBvcnQgeyBzZWxlY3RvcnMsIGNvbmZpZyB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmRcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3JcIjtcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb25cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybVwiO1xuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi9jb21wb25lbnRzL0FwaVwiO1xuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybVwiO1xuLy9DcmVhdGUgaW5zdGFuY2VzIG9mIHRoZSBjbGFzc2VzXG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImQ3ODY0OWVkLWZkMTQtNDFmNy05YTJiLTA0YzNmYjEzY2MyOFwiLFxuICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmNvbnN0IGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gIHtcbiAgICByZW5kZXJlcjogKGRhdGEpID0+IHtcbiAgICAgIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNyZWF0ZUNhcmQoZGF0YSkpO1xuICAgIH0sXG4gIH0sXG4gIHNlbGVjdG9ycy5jYXJkU2VjdGlvblxuKTtcblxuY29uc3QgY3JlYXRlQ2FyZCA9IChkYXRhKSA9PiB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBkYXRhLFxuICAgIFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgICAoKSA9PiB7XG4gICAgICBjYXJkUHJldmlld1BvcHVwLm9wZW4oZGF0YSk7XG4gICAgfSxcbiAgICBmdW5jdGlvbiBoYW5kbGVDYXJkRGVsZXRlKGNhcmQpIHtcbiAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5vcGVuKCk7XG4gICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0U3VibWl0QWN0aW9uKCgpID0+IHtcbiAgICAgICAgY29uZmlybURlbGV0ZVBvcHVwLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmdcIik7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5yZW1vdmVDYXJkKGNhcmQuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYXJkLl9oYW5kbGVUcmFzaEljb24oKTtcbiAgICAgICAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5jbG9zZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmdcIik7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIChjYXJkKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IGNhcmQuZ2V0SWQoKTtcbiAgICAgIGlmIChjYXJkLmlzTGlrZWQoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRpc2xpa2luZ1wiKTtcbiAgICAgICAgYXBpLmRpc2xpa2VDYXJkKGlkKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzVmlldygpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibGlraW5nXCIpO1xuICAgICAgICBhcGkubGlrZUNhcmQoaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGNhcmQudXBkYXRlTGlrZXNWaWV3KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gIFxuICByZXR1cm4gY2FyZC5nZXRWaWV3KCk7XG59O1xuXG5jb25zdCBjYXJkUHJldmlld1BvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKHNlbGVjdG9ycy5wcmV2aWV3SW1hZ2VNb2RhbCk7XG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmREYXRhKSB7XG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY3JlYXRlQ2FyZChjYXJkRGF0YSk7XG4gIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNhcmRFbGVtZW50KTtcbn1cblxuY29uc3QgY29uZmlybURlbGV0ZVBvcHVwID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNkZWxldGUtY2FyZC1tb2RhbFwiLFxufSk7XG5jb25maXJtRGVsZXRlUG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLy8gaW5pdGlhbGl6ZSBhbGwgbXkgaW5zdGFuY2VzXG5cbmNhcmRQcmV2aWV3UG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLyoqRWxlbWVudHMgKi9cbmNvbnN0IHByb2ZpbGVFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWVkaXQtYnV0dG9uXCIpO1xuY29uc3QgcHJvZmlsZUVkaXRNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjcHJvZmlsZS1lZGl0LW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IGhhbmRsZVByb2ZpbGVFZGl0U3VibWl0LFxufSk7XG5wcm9maWxlRWRpdE1vZGFsLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZE5ld0NhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtYWRkLWJ1dHRvblwiKTtcblxuY29uc3QgYWRkQ2FyZE1vZGFsID0gbmV3IFBvcHVwV2l0aEZvcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNhZGQtY2FyZC1tb2RhbFwiLFxuICBoYW5kbGVGb3JtU3VibWl0OiAoZGF0YSkgPT4ge1xuICAgIGFkZENhcmRNb2RhbC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmFkZENhcmRNb2RhbChkYXRhKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkU2VjdGlvbi5hZGRJdGVtcyhjcmVhdGVDYXJkKHJlcykpO1xuICAgICAgICBhZGRDYXJkVmFsaWRhdG9yLmRpc2FibGVCdXR0b24oKTtcbiAgICAgICAgYWRkQ2FyZEZvcm1FbGVtZW50LnJlc2V0KCk7XG4gICAgICAgIGFkZENhcmRNb2RhbC5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBhZGRDYXJkTW9kYWwuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfSxcbn0pO1xuXG5hZGROZXdDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZENhcmRNb2RhbC5vcGVuKCk7XG59KTtcblxuYWRkQ2FyZE1vZGFsLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IHByb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZS1uYW1lXCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWRlc2NyaXB0aW9uLXRpdGxlXCIpO1xuY29uc3QgcHJvZmlsZVRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGUtaW5wdXRcIik7XG5jb25zdCBwcm9maWxlRGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiI3Byb2ZpbGUtZGVzY3JpcHRpb24taW5wdXRcIlxuKTtcbmNvbnN0IHByb2ZpbGVBdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtaW1hZ2UtaWRcIik7XG5jb25zdCBwcm9maWxlRWRpdEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcImVkaXQtcHJvZmlsZS1tb2RhbF9fZm9ybVwiXTtcbmNvbnN0IGFkZENhcmRGb3JtRWxlbWVudCA9IGRvY3VtZW50LmZvcm1zW1wiYWRkLWNhcmQtbW9kYWxfX2Zvcm1cIl07XG5jb25zdCBhdmF0YXJNb2RhbEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcImVkaXQtYXZhdGFyLW1vZGFsX19mb3JtXCJdO1xuXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XG4gIHByb2ZpbGVUaXRsZSxcbiAgcHJvZmlsZURlc2NyaXB0aW9uLFxuICBwcm9maWxlQXZhdGFyLFxufSk7XG5cbmNvbnN0IGF2YXRhck1vZGFsID0gbmV3IFBvcHVwV2l0aEZvcm0oe1xuICBwb3B1cFNlbGVjdG9yOiBcIiNlZGl0LWF2YXRhci1tb2RhbFwiLFxuICBoYW5kbGVGb3JtU3VibWl0OiAoaW5wdXRWYWx1ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGlucHV0VmFsdWUpO1xuICAgIGF2YXRhck1vZGFsLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmdcIik7XG4gICAgYXBpXG4gICAgICAuYXZhdGFyTW9kYWwoaW5wdXRWYWx1ZSlcbiAgICAgIC50aGVuKChpbmZvKSA9PiB7XG4gICAgICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKGluZm8pO1xuICAgICAgfSlcbiAgICAgIC8vIC50aGVuKChyZXMpID0+IHtcbiAgICAgIC8vICAgcmV0dXJuIHJlcy5vayA/IHJlcy5qc29uKCkgOiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICAgIC8vIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBhdmF0YXJNb2RhbC5zZXRMb2FkaW5nKGZhbHNlLCBcIlNhdmluZ1wiKTtcbiAgICAgIH0pO1xuICB9LFxufSk7XG5cbmNvbnN0IGF2YXRhckVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtYXZhdGFyLWJ1dHRvblwiKTtcbmF2YXRhckVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYXZhdGFyTW9kYWwub3BlbigpO1xufSk7XG5hdmF0YXJNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vKipFdmVudCBIYW5kbGVycyAqL1xuZnVuY3Rpb24gaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQoZGF0YSkge1xuICBwcm9maWxlRWRpdE1vZGFsLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5lZGl0cHJvZmlsZUluZm8oeyBuYW1lOiBkYXRhLk5hbWUsIGFib3V0OiBkYXRhLkRlc2NyaXB0aW9uIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckluZm8ocmVzKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwcm9maWxlRWRpdE1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufVxuXG4vKipFdmVudCBMaXN0ZW5lcnMgKi9cblxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgY3VycmVudFVzZXJJbmZvID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgcHJvZmlsZVRpdGxlSW5wdXQudmFsdWUgPSBjdXJyZW50VXNlckluZm8ucHJvZmlsZVRpdGxlO1xuICBwcm9maWxlRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VySW5mby5wcm9maWxlRGVzY3JpcHRpb247XG4gIHByb2ZpbGVFZGl0TW9kYWwub3BlbigpO1xufSk7XG5cbmNvbnN0IGFkZENhcmRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogYWRkQ2FyZEZvcm1FbGVtZW50LFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xuYWRkQ2FyZFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG5cbmNvbnN0IHByb2ZpbGVFZGl0VmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioe1xuICBmb3JtRWw6IHByb2ZpbGVFZGl0Rm9ybSxcbiAgY29uZmlnOiBjb25maWcsXG59KTtcbnByb2ZpbGVFZGl0VmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbmFwaVxuICAuZmV0Y2hJbml0aWFsRGF0YSgpXG4gIC50aGVuKChbdXNlckRhdGEsIGNhcmRzRGF0YV0pID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImhleVwiKTtcbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh1c2VyRGF0YSk7XG4gICAgY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoY2FyZHNEYXRhKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH0pO1xuXG5jb25zdCBhdmF0YXJNb2RhbFZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHtcbiAgZm9ybUVsOiBhdmF0YXJNb2RhbEZvcm0sXG4gIGNvbmZpZzogY29uZmlnLFxufSk7XG5hdmF0YXJNb2RhbFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG4iXSwibmFtZXMiOlsiQXBpIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwiYmFzZVVybCIsImhlYWRlcnMiLCJnZXRBcHBJbmZvIiwiUHJvbWlzZSIsImFsbCIsImdldEluaXRpYWxDYXJkcyIsImdldFVzZXJJbmZvIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwianNvbiIsImZldGNoSW5pdGlhbERhdGEiLCJlZGl0cHJvZmlsZUluZm8iLCJkYXRhIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJfY2hlY2tSZXNwb25zZSIsImFkZENhcmRNb2RhbCIsIm5hbWUiLCJsaW5rIiwicmVtb3ZlQ2FyZCIsIkNhcmRJRCIsImxpa2VDYXJkIiwiZGlzbGlrZUNhcmQiLCJhdmF0YXJNb2RhbCIsIl9yZWYiLCJhdmF0YXIiLCJvayIsInJlamVjdCIsIkNhcmQiLCJjYXJkRGF0YSIsImNhcmRTZWxlY3RvciIsImhhbmRsZUltYWdlQ2xpY2siLCJoYW5kbGVEZWxldGUiLCJoYW5kbGVMaWtlIiwiX25hbWUiLCJfbGluayIsIl9pZCIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlSW1hZ2VDbGljayIsIl9pc0xpa2VkIiwiaXNMaWtlZCIsImdldElkIiwiX3NldEV2ZW50bGlzdGVuZXJzIiwiX2NhcmRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJfaGFuZGxlTGlrZUljb24iLCJfY2FyZEltYWdlIiwidGV4dCIsIl90ZXh0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiX2hhbmRsZVRyYXNoSWNvbiIsInJlbW92ZSIsImdldFZpZXciLCJkb2N1bWVudCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJfY2FyZENhcHRpb24iLCJzcmMiLCJfY2FyZExpa2VCdXR0b24iLCJhbHQiLCJ0ZXh0Q29udGVudCIsIl91cGRhdGVMaWtlc1ZpZXciLCJhZGQiLCJGb3JtVmFsaWRhdG9yIiwiZm9ybUVsIiwiY29uZmlnIiwiX2Zvcm1FbCIsIl9pbnB1dFNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsIl9zdWJtaXRCdXR0b25TZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiX2luYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiX2lucHV0RXJyb3JDbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsIl9lcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsIl9mb3JtU2VsZWN0b3IiLCJmb3JtU2VsZWN0b3IiLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsIiwiX2Vycm9yTWVzc2FnZUVsIiwiaWQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsIl9oaWRlSW5wdXRFcnJvciIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX2hhc0ludmFsaWRJbnB1dCIsIl9pbnB1dEVscyIsImV2ZXJ5IiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiZGlzYWJsZUJ1dHRvbiIsIl9zdWJtaXRCdXR0b24iLCJkaXNhYmxlZCIsImVuYWJsZWQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImUiLCJlbmFibGVWYWxpZGF0aW9uIiwicmVzZXRWYWxpZGF0aW9uIiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwiX3BvcHVwRWxlbWVudCIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJvcGVuIiwiY2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0Iiwia2V5Iiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aENvbmZpcm0iLCJfc3VibWl0QnV0dG9uQ29udGVudCIsInNldFN1Ym1pdEFjdGlvbiIsImFjdGlvbiIsIl9oYW5kbGVTdWJtaXRDYWxsYmFjayIsInByZXZlbnREZWZhdWx0Iiwic2V0TG9hZGluZyIsImlzTG9hZGluZyIsImxvYWRpbmdUZXh0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiUG9wdXBXaXRoRm9ybSIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsIl9wb3B1cEZvcm0iLCJfaW5wdXRMaXN0IiwiX2dldElucHV0VmFsdWVzIiwiX2Zvcm1WYWx1ZXMiLCJpbnB1dCIsInZhbHVlIiwiX3N1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX3ByZXZpZXdJbWFnZU1vZGFsSW1nIiwiX3ByZXZpZXdJbWFnZU1vZGFsQ2FwdGlvbiIsIlNlY3Rpb24iLCJzZWxlY3RvciIsInJlbmRlcmVyIiwiX3JlbmRlcmVyIiwiX2VsZW1lbnQiLCJyZW5kZXJJdGVtcyIsIml0ZW1zIiwiaXRlbSIsImFkZEl0ZW1zIiwicHJlcGVuZCIsIlVzZXJJbmZvIiwicHJvZmlsZVRpdGxlIiwicHJvZmlsZURlc2NyaXB0aW9uIiwicHJvZmlsZUF2YXRhciIsIl9wcm9maWxlVGl0bGUiLCJfcHJvZmlsZURlc2NyaXB0aW9uIiwiX3Byb2ZpbGVBdmF0YXIiLCJzZXRVc2VySW5mbyIsIl9yZWYyIiwiYWJvdXQiLCJzZWxlY3RvcnMiLCJjYXJkU2VjdGlvbiIsImNhcmRUZW1wbGF0ZSIsInByZXZpZXdJbWFnZU1vZGFsIiwiYXBpIiwiYXV0aG9yaXphdGlvbiIsImNyZWF0ZUNhcmQiLCJjYXJkIiwiY2FyZFByZXZpZXdQb3B1cCIsImhhbmRsZUNhcmREZWxldGUiLCJjb25maXJtRGVsZXRlUG9wdXAiLCJjYXRjaCIsImVyciIsImZpbmFsbHkiLCJ1cGRhdGVMaWtlc1ZpZXciLCJyZW5kZXJDYXJkIiwiY2FyZEVsZW1lbnQiLCJwcm9maWxlRWRpdEJ1dHRvbiIsInByb2ZpbGVFZGl0TW9kYWwiLCJoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdCIsImFkZE5ld0NhcmRCdXR0b24iLCJhZGRDYXJkVmFsaWRhdG9yIiwiYWRkQ2FyZEZvcm1FbGVtZW50IiwicHJvZmlsZVRpdGxlSW5wdXQiLCJwcm9maWxlRGVzY3JpcHRpb25JbnB1dCIsInByb2ZpbGVFZGl0Rm9ybSIsImZvcm1zIiwiYXZhdGFyTW9kYWxGb3JtIiwidXNlckluZm8iLCJpbnB1dFZhbHVlIiwiaW5mbyIsImVycm9yIiwiYXZhdGFyRWRpdEJ1dHRvbiIsIk5hbWUiLCJEZXNjcmlwdGlvbiIsImN1cnJlbnRVc2VySW5mbyIsInByb2ZpbGVFZGl0VmFsaWRhdG9yIiwidXNlckRhdGEiLCJjYXJkc0RhdGEiLCJhdmF0YXJNb2RhbFZhbGlkYXRvciJdLCJzb3VyY2VSb290IjoiIn0=