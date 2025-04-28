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
      api.likeCard(id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVKLE1BQU0wQixvQkFBb0IsR0FBRyxJQUFJekksaUVBQWEsQ0FBQztFQUM3Q0MsTUFBTSxFQUFFNEgsZUFBZTtFQUN2QjNILE1BQU0sRUFBRUEsb0RBQU1BO0FBQ2hCLENBQUMsQ0FBQztBQUNGdUksb0JBQW9CLENBQUNyRyxnQkFBZ0IsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmJhc2VVcmwgPSBvcHRpb25zLmJhc2VVcmw7XG4gICAgdGhpcy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICB9XG5cbiAgZ2V0QXBwSW5mbygpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SW5pdGlhbENhcmRzKCksIHRoaXMuZ2V0VXNlckluZm8oKV0pO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpO1xuICB9XG5cbiAgZmV0Y2hJbml0aWFsRGF0YSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0VXNlckluZm8oKSwgdGhpcy5nZXRJbml0aWFsQ2FyZHMoKV0pO1xuICB9XG5cbiAgZWRpdHByb2ZpbGVJbmZvKGRhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gIFxuXG4gIGFkZENhcmRNb2RhbChkYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIGxpbms6IGRhdGEubGluayxcbiAgICAgIH0pLFxuICAgIH0pXG4gICAgLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuICAgICAgXG4gIFxuXG4gIHJlbW92ZUNhcmQoQ2FyZElEKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgICB9XG4gIFxuXG4gIGxpa2VDYXJkKENhcmRJRCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzLyR7Q2FyZElEfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgIFxuICBcblxuICBkaXNsaWtlQ2FyZChDYXJkSUQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkcy8ke0NhcmRJRH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gIFxuXG4gIGF2YXRhck1vZGFsKHsgYXZhdGFyIH0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9tZS9hdmF0YXJgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYXZhdGFyLFxuICAgICAgfSksXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gIFxuX2NoZWNrUmVzcG9uc2UocmVzKXtcbiAgaWYocmVzLm9rKXtcbiAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYFRoZXJlIGhhcyBiZWVuIGFuIGVycm9yYCk7XG59XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2FyZERhdGEsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUltYWdlQ2xpY2ssXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIGhhbmRsZUxpa2VcbiAgKSB7XG4gICAgdGhpcy5fbmFtZSA9IGNhcmREYXRhLm5hbWU7XG4gICAgdGhpcy5fbGluayA9IGNhcmREYXRhLmxpbms7XG4gICAgdGhpcy5faWQgPSBjYXJkRGF0YS5faWQ7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xuICAgIHRoaXMuaGFuZGxlRGVsZXRlID0gaGFuZGxlRGVsZXRlO1xuICAgIHRoaXMuaGFuZGxlTGlrZSA9IGhhbmRsZUxpa2U7XG4gICAgdGhpcy5faXNMaWtlZCA9IGNhcmREYXRhLmlzTGlrZWQ7XG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBfc2V0RXZlbnRsaXN0ZW5lcnMoKSB7XG4gICAgLy8gb24gdGhlIHNldEV2ZW50TGlzdGVuZXJzIG9mIENhcmQuanNcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saWtlLWJ1dHRvblwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VJY29uKCk7XG4gICAgICAgIHRoaXMuaGFuZGxlTGlrZSh0aGlzKTtcbiAgICAgIH0pO1xuXG4gICAgLy9cIi5jYXJkX190cmFzaC1idXR0b25cIlxuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRyYXNoLWJ1dHRvblwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlRGVsZXRlKHRoaXMpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHsgbGluazogdGhpcy5fbGluaywgdGV4dDogdGhpcy5fdGV4dCB9KVxuICAgICk7XG4gIH1cblxuICBfaGFuZGxlTGlrZUljb24oKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGlrZS1idXR0b25cIilcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICB9XG5cbiAgX2hhbmRsZVRyYXNoSWNvbigpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBnZXRWaWV3KCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1pZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLl9jYXJkQ2FwdGlvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10aXRsZS1pZFwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmRfX2ltYWdlLW1vZGFsXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9saW5rO1xuICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xuICAgIHRoaXMuX2NhcmRDYXB0aW9uLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl91cGRhdGVMaWtlc1ZpZXcoKTtcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxuXG4gIGlzTGlrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTGlrZWQ7XG4gIH1cblxuICBfdXBkYXRlTGlrZXNWaWV3KCkge1xuICAgIGlmICh0aGlzLmlzTGlrZWQoKSkge1xuICAgICAgdGhpcy5fY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3Rvcih7IGZvcm1FbCwgY29uZmlnIH0pIHtcbiAgICB0aGlzLl9mb3JtRWwgPSBmb3JtRWw7XG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IGNvbmZpZy5pbnB1dFNlbGVjdG9yO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yO1xuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcztcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBjb25maWcuaW5wdXRFcnJvckNsYXNzO1xuICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSBjb25maWcuZXJyb3JDbGFzcztcbiAgICB0aGlzLl9mb3JtU2VsZWN0b3IgPSBjb25maWcuZm9ybVNlbGVjdG9yO1xuICB9XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xuICB9XG5cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xuICB9XG5cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKSB7XG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfVxuICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICB9XG5cbiAgX2hhc0ludmFsaWRJbnB1dCgpIHtcbiAgICByZXR1cm4gIXRoaXMuX2lucHV0RWxzLmV2ZXJ5KChpbnB1dEVsKSA9PiBpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKTtcbiAgfVxuXG4gIF90b2dnbGVCdXR0b25TdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigpOyAvLyBkaXNhYmxlIGlmIHRoZSBmb3JtIGlzIGludmFsaWRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7IC8vIGVuYWJsZSB0aGUgYnV0dG9uIHVzaW5nIHRoZSBzdHlsZXNcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlOyAvLyBlbmFibGUgdGhlIGJ1dHRvbiB1c2luZyB0aGUgYGRpc2FibGVkIGAgYXR0cmlidXRlXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgX3NldEV2ZW50bGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2lucHV0RWxzID0gWy4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2lucHV0U2VsZWN0b3IpXTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3Rvcih0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3NldEV2ZW50bGlzdGVuZXJzKCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlID0gdGhpcy5faGFuZGxlRXNjQ2xvc2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9fY2xvc2VcIikgfHxcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxcIilcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFwiO1xuXG5jbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcih7IHBvcHVwU2VsZWN0b3IgfSkge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRTdWJtaXRBY3Rpb24oYWN0aW9uKSB7XG4gICAgdGhpcy5faGFuZGxlU3VibWl0Q2FsbGJhY2sgPSBhY3Rpb247XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZVN1Ym1pdENhbGxiYWNrKCk7XG4gICAgfSk7XG5cbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgc2V0TG9hZGluZyhpc0xvYWRpbmcsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIC8vIGlmIGxvYWRpbmcgdXNlIHRoZSBsb2FkaW5nIHRleHRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBub3QgbG9hZGluZyB1c2UgdGhlIHN1Ym1pdEJ1dHRvbkNvbnRlbnRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhDb25maXJtO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCB9KSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX3BvcHVwRm9ybSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19pbnB1dFwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9wb3B1cEZvcm0ucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgdGhpcy5fZm9ybVZhbHVlcyA9IHt9O1xuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKFxuICAgICAgKGlucHV0KSA9PiAodGhpcy5fZm9ybVZhbHVlc1tpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5fZm9ybVZhbHVlcztcbiAgfVxuXG4gIF9zdWJtaXQoZXZ0KSB7XG4gICAgLy90aGlzIG1ldGhvZCBpcyB0byBiZSBjYWxsZWQgd2hlbiBmb3JtIGlzIHN1Ym1pdGVkXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTsgLy9jYWxsIGV4dGVybmFsIGNhbGxiYWNrIF9oYW5kbGVGb3JtU3VibWl0XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAvL1VzZSAndGhpcy5fc3VibWl0JyBib3VuZGVkIG1ldGhvZCBpbnN0ZWFkIG9mIGFub255bW91cyBmdW5jdGlvblxuICAgIHRoaXMuX3BvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwRm9ybS5yZXNldCgpO1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gIH1cblxuICBzZXRMb2FkaW5nKGlzTG9hZGluZywgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgLy8gaWYgbG9hZGluZyB1c2UgdGhlIGxvYWRpbmcgdGV4dFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vdCBsb2FkaW5nIHVzZSB0aGUgc3VibWl0QnV0dG9uQ29udGVudFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uQ29udGVudDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZyA9XG4gICAgICB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxDYXB0aW9uID1cbiAgICAgIHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYXB0aW9uXCIpO1xuICB9XG5cbiAgb3BlbihkYXRhKSB7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcuc3JjID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nLmFsdCA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyByZW5kZXJlciB9LCBzZWxlY3Rvcikge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7c2VsZWN0b3J9YCk7XG4gIH1cblxuICByZW5kZXJJdGVtcyhpdGVtcykge1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbXMoaXRlbSkge1xuICAgIHRoaXMuX2VsZW1lbnQucHJlcGVuZChpdGVtKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IHByb2ZpbGVUaXRsZSwgcHJvZmlsZURlc2NyaXB0aW9uLCBwcm9maWxlQXZhdGFyIH0pIHtcbiAgICB0aGlzLl9wcm9maWxlVGl0bGUgPSBwcm9maWxlVGl0bGU7XG4gICAgdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uID0gcHJvZmlsZURlc2NyaXB0aW9uO1xuICAgIHRoaXMuX3Byb2ZpbGVBdmF0YXIgPSBwcm9maWxlQXZhdGFyO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb2ZpbGVUaXRsZTogdGhpcy5fcHJvZmlsZVRpdGxlLnRleHRDb250ZW50LFxuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uOiB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQsXG4gICAgICBwcm9maWxlQXZhdGFyOiB0aGlzLl9wcm9maWxlQXZhdGFyLnNyYyxcbiAgICB9O1xuICB9XG5cbiAgc2V0VXNlckluZm8oe25hbWUsIGFib3V0LCBhdmF0YXJ9KSB7XG4gICAgaWYgKG5hbWUpIHRoaXMuX3Byb2ZpbGVUaXRsZS50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgaWYgKGFib3V0KSB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBhYm91dDtcbiAgICBpZiAoYXZhdGFyKSB0aGlzLl9wcm9maWxlQXZhdGFyLnNyYyA9IGF2YXRhcjtcbiAgfVxufVxuIiwiXG5cbmV4cG9ydCBjb25zdCBzZWxlY3RvcnMgPSB7XG4gIGNhcmRTZWN0aW9uOiBcIi5jYXJkc19fbGlzdFwiLFxuICBjYXJkVGVtcGxhdGU6IFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgcHJldmlld0ltYWdlTW9kYWw6IFwiI3ByZXZpZXctaW1hZ2UtbW9kYWxcIixcbn07XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2J1dHRvbl9kaXNhYmxlZFwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcblxuLy9pbXBvcnQgYWxsIHRoZSBjbGFzc2VzXG5pbXBvcnQgeyBzZWxlY3RvcnMsIGNvbmZpZyB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmRcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3JcIjtcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb25cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybVwiO1xuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi9jb21wb25lbnRzL0FwaVwiO1xuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybVwiO1xuLy9DcmVhdGUgaW5zdGFuY2VzIG9mIHRoZSBjbGFzc2VzXG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImQ3ODY0OWVkLWZkMTQtNDFmNy05YTJiLTA0YzNmYjEzY2MyOFwiLFxuICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmNvbnN0IGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gIHtcbiAgICByZW5kZXJlcjogKGRhdGEpID0+IHtcbiAgICAgIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNyZWF0ZUNhcmQoZGF0YSkpO1xuICAgIH0sXG4gIH0sXG4gIHNlbGVjdG9ycy5jYXJkU2VjdGlvblxuKTtcblxuY29uc3QgY3JlYXRlQ2FyZCA9IChkYXRhKSA9PiB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBkYXRhLFxuICAgIFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgICAoKSA9PiB7XG4gICAgICBjYXJkUHJldmlld1BvcHVwLm9wZW4oZGF0YSk7XG4gICAgfSxcbiAgICBmdW5jdGlvbiBoYW5kbGVDYXJkRGVsZXRlKGNhcmQpIHtcbiAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5vcGVuKCk7XG4gICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0U3VibWl0QWN0aW9uKCgpID0+IHtcbiAgICAgICAgY29uZmlybURlbGV0ZVBvcHVwLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmdcIik7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5yZW1vdmVDYXJkKGNhcmQuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYXJkLl9oYW5kbGVUcmFzaEljb24oKTtcbiAgICAgICAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5jbG9zZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmdcIik7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIChjYXJkKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IGNhcmQuZ2V0SWQoKTtcbiAgICAgIGlmIChjYXJkLmlzTGlrZWQoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRpc2xpa2luZ1wiKTtcbiAgICAgICAgYXBpLmRpc2xpa2VDYXJkKGlkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsaWtpbmdcIik7XG4gICAgICAgIGFwaS5saWtlQ2FyZChpZClcbiAgICAgIH1cbiAgICB9KVxuICBcbiAgcmV0dXJuIGNhcmQuZ2V0VmlldygpO1xufTtcblxuY29uc3QgY2FyZFByZXZpZXdQb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZShzZWxlY3RvcnMucHJldmlld0ltYWdlTW9kYWwpO1xuZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkRGF0YSkge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGNyZWF0ZUNhcmQoY2FyZERhdGEpO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtcyhjYXJkRWxlbWVudCk7XG59XG5cbmNvbnN0IGNvbmZpcm1EZWxldGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhDb25maXJtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjZGVsZXRlLWNhcmQtbW9kYWxcIixcbn0pO1xuY29uZmlybURlbGV0ZVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8vIGluaXRpYWxpemUgYWxsIG15IGluc3RhbmNlc1xuXG5jYXJkUHJldmlld1BvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8qKkVsZW1lbnRzICovXG5jb25zdCBwcm9maWxlRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0TW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiLFxuICBoYW5kbGVGb3JtU3VibWl0OiBoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdCxcbn0pO1xucHJvZmlsZUVkaXRNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGROZXdDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWFkZC1idXR0b25cIik7XG5cbmNvbnN0IGFkZENhcmRNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjYWRkLWNhcmQtbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogKGRhdGEpID0+IHtcbiAgICBhZGRDYXJkTW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5hZGRDYXJkTW9kYWwoZGF0YSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZFNlY3Rpb24uYWRkSXRlbXMoY3JlYXRlQ2FyZChyZXMpKTtcbiAgICAgICAgYWRkQ2FyZFZhbGlkYXRvci5kaXNhYmxlQnV0dG9uKCk7XG4gICAgICAgIGFkZENhcmRGb3JtRWxlbWVudC5yZXNldCgpO1xuICAgICAgICBhZGRDYXJkTW9kYWwuY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgYWRkQ2FyZE1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH0sXG59KTtcblxuYWRkTmV3Q2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRDYXJkTW9kYWwub3BlbigpO1xufSk7XG5cbmFkZENhcmRNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBwcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGUtbmFtZVwiKTtcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi10aXRsZVwiKTtcbmNvbnN0IHByb2ZpbGVUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlLWlucHV0XCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCJcbik7XG5jb25zdCBwcm9maWxlQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWltYWdlLWlkXCIpO1xuY29uc3QgcHJvZmlsZUVkaXRGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJlZGl0LXByb2ZpbGUtbW9kYWxfX2Zvcm1cIl07XG5jb25zdCBhZGRDYXJkRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5mb3Jtc1tcImFkZC1jYXJkLW1vZGFsX19mb3JtXCJdO1xuY29uc3QgYXZhdGFyTW9kYWxGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJlZGl0LWF2YXRhci1tb2RhbF9fZm9ybVwiXTtcblxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xuICBwcm9maWxlVGl0bGUsXG4gIHByb2ZpbGVEZXNjcmlwdGlvbixcbiAgcHJvZmlsZUF2YXRhcixcbn0pO1xuXG5jb25zdCBhdmF0YXJNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjZWRpdC1hdmF0YXItbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogKGlucHV0VmFsdWUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhpbnB1dFZhbHVlKTtcbiAgICBhdmF0YXJNb2RhbC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nXCIpO1xuICAgIGFwaVxuICAgICAgLmF2YXRhck1vZGFsKGlucHV0VmFsdWUpXG4gICAgICAudGhlbigoaW5mbykgPT4ge1xuICAgICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhpbmZvKTtcbiAgICAgIH0pXG4gICAgICAvLyAudGhlbigocmVzKSA9PiB7XG4gICAgICAvLyAgIHJldHVybiByZXMub2sgPyByZXMuanNvbigpIDogUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICAvLyB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgYXZhdGFyTW9kYWwuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmdcIik7XG4gICAgICB9KTtcbiAgfSxcbn0pO1xuXG5jb25zdCBhdmF0YXJFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LWF2YXRhci1idXR0b25cIik7XG5hdmF0YXJFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGF2YXRhck1vZGFsLm9wZW4oKTtcbn0pO1xuYXZhdGFyTW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLyoqRXZlbnQgSGFuZGxlcnMgKi9cbmZ1bmN0aW9uIGhhbmRsZVByb2ZpbGVFZGl0U3VibWl0KGRhdGEpIHtcbiAgcHJvZmlsZUVkaXRNb2RhbC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuZWRpdHByb2ZpbGVJbmZvKHsgbmFtZTogZGF0YS5OYW1lLCBhYm91dDogZGF0YS5EZXNjcmlwdGlvbiB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHJlcyk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcHJvZmlsZUVkaXRNb2RhbC5zZXRMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn1cblxuLyoqRXZlbnQgTGlzdGVuZXJzICovXG5cbnByb2ZpbGVFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRVc2VySW5mbyA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XG4gIHByb2ZpbGVUaXRsZUlucHV0LnZhbHVlID0gY3VycmVudFVzZXJJbmZvLnByb2ZpbGVUaXRsZTtcbiAgcHJvZmlsZURlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSBjdXJyZW50VXNlckluZm8ucHJvZmlsZURlc2NyaXB0aW9uO1xuICBwcm9maWxlRWRpdE1vZGFsLm9wZW4oKTtcbn0pO1xuXG5jb25zdCBhZGRDYXJkVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioe1xuICBmb3JtRWw6IGFkZENhcmRGb3JtRWxlbWVudCxcbiAgY29uZmlnOiBjb25maWcsXG59KTtcbmFkZENhcmRWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuXG5jb25zdCBwcm9maWxlRWRpdFZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHtcbiAgZm9ybUVsOiBwcm9maWxlRWRpdEZvcm0sXG4gIGNvbmZpZzogY29uZmlnLFxufSk7XG5wcm9maWxlRWRpdFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG5hcGlcbiAgLmZldGNoSW5pdGlhbERhdGEoKVxuICAudGhlbigoW3VzZXJEYXRhLCBjYXJkc0RhdGFdKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJoZXlcIik7XG4gICAgdXNlckluZm8uc2V0VXNlckluZm8odXNlckRhdGEpO1xuICAgIGNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKGNhcmRzRGF0YSk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9KTtcblxuY29uc3QgYXZhdGFyTW9kYWxWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogYXZhdGFyTW9kYWxGb3JtLFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xuYXZhdGFyTW9kYWxWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuIl0sIm5hbWVzIjpbIkFwaSIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImJhc2VVcmwiLCJoZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJmZXRjaEluaXRpYWxEYXRhIiwiZWRpdHByb2ZpbGVJbmZvIiwiZGF0YSIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiX2NoZWNrUmVzcG9uc2UiLCJhZGRDYXJkTW9kYWwiLCJuYW1lIiwibGluayIsInJlbW92ZUNhcmQiLCJDYXJkSUQiLCJsaWtlQ2FyZCIsImRpc2xpa2VDYXJkIiwiYXZhdGFyTW9kYWwiLCJfcmVmIiwiYXZhdGFyIiwib2siLCJyZWplY3QiLCJDYXJkIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwiaGFuZGxlRGVsZXRlIiwiaGFuZGxlTGlrZSIsIl9uYW1lIiwiX2xpbmsiLCJfaWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJfaXNMaWtlZCIsImlzTGlrZWQiLCJnZXRJZCIsIl9zZXRFdmVudGxpc3RlbmVycyIsIl9jYXJkRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiX2hhbmRsZUxpa2VJY29uIiwiX2NhcmRJbWFnZSIsInRleHQiLCJfdGV4dCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIl9oYW5kbGVUcmFzaEljb24iLCJyZW1vdmUiLCJnZXRWaWV3IiwiZG9jdW1lbnQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX2NhcmRDYXB0aW9uIiwic3JjIiwiX2NhcmRMaWtlQnV0dG9uIiwiYWx0IiwidGV4dENvbnRlbnQiLCJfdXBkYXRlTGlrZXNWaWV3IiwiYWRkIiwiRm9ybVZhbGlkYXRvciIsImZvcm1FbCIsImNvbmZpZyIsIl9mb3JtRWwiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbCIsIl9lcnJvck1lc3NhZ2VFbCIsImlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfaW5wdXRFbHMiLCJldmVyeSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImRpc2FibGVCdXR0b24iLCJfc3VibWl0QnV0dG9uIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlIiwiZW5hYmxlVmFsaWRhdGlvbiIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwib3BlbiIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiX3N1Ym1pdEJ1dHRvbkNvbnRlbnQiLCJzZXRTdWJtaXRBY3Rpb24iLCJhY3Rpb24iLCJfaGFuZGxlU3VibWl0Q2FsbGJhY2siLCJwcmV2ZW50RGVmYXVsdCIsInNldExvYWRpbmciLCJpc0xvYWRpbmciLCJsb2FkaW5nVGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfcG9wdXBGb3JtIiwiX2lucHV0TGlzdCIsIl9nZXRJbnB1dFZhbHVlcyIsIl9mb3JtVmFsdWVzIiwiaW5wdXQiLCJ2YWx1ZSIsIl9zdWJtaXQiLCJjb25zb2xlIiwibG9nIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9wcmV2aWV3SW1hZ2VNb2RhbEltZyIsIl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24iLCJTZWN0aW9uIiwic2VsZWN0b3IiLCJyZW5kZXJlciIsIl9yZW5kZXJlciIsIl9lbGVtZW50IiwicmVuZGVySXRlbXMiLCJpdGVtcyIsIml0ZW0iLCJhZGRJdGVtcyIsInByZXBlbmQiLCJVc2VySW5mbyIsInByb2ZpbGVUaXRsZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsInByb2ZpbGVBdmF0YXIiLCJfcHJvZmlsZVRpdGxlIiwiX3Byb2ZpbGVEZXNjcmlwdGlvbiIsIl9wcm9maWxlQXZhdGFyIiwic2V0VXNlckluZm8iLCJfcmVmMiIsImFib3V0Iiwic2VsZWN0b3JzIiwiY2FyZFNlY3Rpb24iLCJjYXJkVGVtcGxhdGUiLCJwcmV2aWV3SW1hZ2VNb2RhbCIsImFwaSIsImF1dGhvcml6YXRpb24iLCJjcmVhdGVDYXJkIiwiY2FyZCIsImNhcmRQcmV2aWV3UG9wdXAiLCJoYW5kbGVDYXJkRGVsZXRlIiwiY29uZmlybURlbGV0ZVBvcHVwIiwiY2F0Y2giLCJlcnIiLCJmaW5hbGx5IiwicmVuZGVyQ2FyZCIsImNhcmRFbGVtZW50IiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlRWRpdE1vZGFsIiwiaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQiLCJhZGROZXdDYXJkQnV0dG9uIiwiYWRkQ2FyZFZhbGlkYXRvciIsImFkZENhcmRGb3JtRWxlbWVudCIsInByb2ZpbGVUaXRsZUlucHV0IiwicHJvZmlsZURlc2NyaXB0aW9uSW5wdXQiLCJwcm9maWxlRWRpdEZvcm0iLCJmb3JtcyIsImF2YXRhck1vZGFsRm9ybSIsInVzZXJJbmZvIiwiaW5wdXRWYWx1ZSIsImluZm8iLCJlcnJvciIsImF2YXRhckVkaXRCdXR0b24iLCJOYW1lIiwiRGVzY3JpcHRpb24iLCJjdXJyZW50VXNlckluZm8iLCJwcm9maWxlRWRpdFZhbGlkYXRvciIsInVzZXJEYXRhIiwiY2FyZHNEYXRhIiwiYXZhdGFyTW9kYWxWYWxpZGF0b3IiXSwic291cmNlUm9vdCI6IiJ9