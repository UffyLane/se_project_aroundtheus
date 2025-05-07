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
      confirmDeletePopup.setLoading(true, "Deleting");
      api.removeCard(card.getId()).then(() => {
        card._handleTrashIcon();
        confirmDeletePopup.close();
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        confirmDeletePopup.setLoading(false, "Deleting");
      });
    }, card => {
      const id = card.getId();
      if (card.isLiked()) {
        console.log("disliking");
        api.dislikeCard(id);
      } else {
        console.log("liking");
        api.likeCard(id).then(res => {
          card._updateLikesView();
        });
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUNwQixDQUFDLENBQUM7QUFHTixNQUFNa0Isb0JBQW9CLEdBQUcsSUFBSWpJLGlFQUFhLENBQUM7RUFDN0NDLE1BQU0sRUFBRTRILGVBQWU7RUFDdkIzSCxNQUFNLEVBQUVBLG9EQUFNQTtBQUNoQixDQUFDLENBQUM7QUFDRitILG9CQUFvQixDQUFDN0YsZ0JBQWdCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3BhZ2VzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9wYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycztcbiAgfVxuXG4gIGdldEFwcEluZm8oKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFVzZXJJbmZvKCldKTtcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KVxuICAgIC50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpIFxuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG5cbiAgZmV0Y2hJbml0aWFsRGF0YSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0VXNlckluZm8oKSwgdGhpcy5nZXRJbml0aWFsQ2FyZHMoKV0pO1xuICB9XG5cbiAgZWRpdHByb2ZpbGVJbmZvKGRhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gIFxuXG4gIGFkZENhcmRNb2RhbChkYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIGxpbms6IGRhdGEubGluayxcbiAgICAgIH0pLFxuICAgIH0pXG4gICAgLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgfVxuICAgICAgXG4gIFxuXG4gIHJlbW92ZUNhcmQoQ2FyZElEKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSlcbiAgICB9XG4gIFxuXG4gIGxpa2VDYXJkKENhcmRJRCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9L2NhcmRzLyR7Q2FyZElEfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbiAgIFxuICBcblxuICBkaXNsaWtlQ2FyZChDYXJkSUQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkcy8ke0NhcmRJRH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG4gIFxuXG4gIGF2YXRhck1vZGFsKHsgYXZhdGFyIH0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9tZS9hdmF0YXJgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYXZhdGFyLFxuICAgICAgfSksXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxuICB9XG5cbl9jaGVja1Jlc3BvbnNlKHJlcyl7XG4gIGlmKHJlcy5vayl7XG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBUaGVyZSBoYXMgYmVlbiBhbiBlcnJvcmApO1xufVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNhcmREYXRhLFxuICAgIGNhcmRTZWxlY3RvcixcbiAgICBoYW5kbGVJbWFnZUNsaWNrLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBoYW5kbGVMaWtlXG4gICkge1xuICAgIHRoaXMuX25hbWUgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX2lkID0gY2FyZERhdGEuX2lkO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcbiAgICB0aGlzLmhhbmRsZURlbGV0ZSA9IGhhbmRsZURlbGV0ZTtcbiAgICB0aGlzLmhhbmRsZUxpa2UgPSBoYW5kbGVMaWtlO1xuICAgIHRoaXMuX2lzTGlrZWQgPSBjYXJkRGF0YS5pc0xpa2VkO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgX3NldEV2ZW50bGlzdGVuZXJzKCkge1xuICAgIC8vIG9uIHRoZSBzZXRFdmVudExpc3RlbmVycyBvZiBDYXJkLmpzXG4gICAgdGhpcy5fY2FyZEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGlrZS1idXR0b25cIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlSWNvbigpO1xuICAgICAgXG4gICAgICB9KTtcblxuICAgIC8vXCIuY2FyZF9fdHJhc2gtYnV0dG9uXCJcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10cmFzaC1idXR0b25cIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZURlbGV0ZSh0aGlzKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgdGhpcy5faGFuZGxlSW1hZ2VDbGljayh7IGxpbms6IHRoaXMuX2xpbmssIHRleHQ6IHRoaXMuX3RleHQgfSlcbiAgICApO1xuICB9XG5cbiAgX2hhbmRsZUxpa2VJY29uKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpXG4gICAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgfVxuXG4gIF9oYW5kbGVUcmFzaEljb24oKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgZ2V0VmlldygpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtaWRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGhpcy5fY2FyZENhcHRpb24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGl0bGUtaWRcIik7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkX19pbWFnZS1tb2RhbFwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcbiAgICB0aGlzLl9jYXJkTGlrZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saWtlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl9jYXJkQ2FwdGlvbi50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XG4gICAgdGhpcy5fdXBkYXRlTGlrZXNWaWV3KCk7XG4gICAgdGhpcy5fc2V0RXZlbnRsaXN0ZW5lcnMoKTtcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XG4gIH1cblxuICBpc0xpa2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xpa2VkO1xuICB9XG5cbiAgX3VwZGF0ZUxpa2VzVmlldygpIHtcbiAgICBpZiAodGhpcy5pc0xpa2VkKCkpIHtcbiAgICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IoeyBmb3JtRWwsIGNvbmZpZyB9KSB7XG4gICAgdGhpcy5fZm9ybUVsID0gZm9ybUVsO1xuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBjb25maWcuaW5wdXRTZWxlY3RvcjtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3M7XG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gY29uZmlnLmlucHV0RXJyb3JDbGFzcztcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gY29uZmlnLmVycm9yQ2xhc3M7XG4gICAgdGhpcy5fZm9ybVNlbGVjdG9yID0gY29uZmlnLmZvcm1TZWxlY3RvcjtcbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgfVxuXG4gIF9oYXNJbnZhbGlkSW5wdXQoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pbnB1dEVscy5ldmVyeSgoaW5wdXRFbCkgPT4gaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XG4gIH1cblxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XG4gICAgICB0aGlzLmRpc2FibGVCdXR0b24oKTsgLy8gZGlzYWJsZSBpZiB0aGUgZm9ybSBpcyBpbnZhbGlkXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpOyAvLyBlbmFibGUgdGhlIGJ1dHRvbiB1c2luZyB0aGUgc3R5bGVzXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTsgLy8gZW5hYmxlIHRoZSBidXR0b24gdXNpbmcgdGhlIGBkaXNhYmxlZCBgIGF0dHJpYnV0ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVCdXR0b24oKSB7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIF9zZXRFdmVudGxpc3RlbmVycygpIHtcbiAgICB0aGlzLl9pbnB1dEVscyA9IFsuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKV07XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxfX2Nsb3NlXCIpIHx8XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBcIjtcblxuY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yIH0pIHtcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgc2V0U3VibWl0QWN0aW9uKGFjdGlvbikge1xuICAgIHRoaXMuX2hhbmRsZVN1Ym1pdENhbGxiYWNrID0gYWN0aW9uO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXRDYWxsYmFjaygpO1xuICAgIH0pO1xuXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHNldExvYWRpbmcoaXNMb2FkaW5nLCBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCIpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAvLyBpZiBsb2FkaW5nIHVzZSB0aGUgbG9hZGluZyB0ZXh0XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBsb2FkaW5nVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm90IGxvYWRpbmcgdXNlIHRoZSBzdWJtaXRCdXR0b25Db250ZW50XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50O1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoQ29uZmlybTtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcih7IHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQgfSkge1xuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9wb3B1cEZvcm0gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcbiAgICB0aGlzLl9pbnB1dExpc3QgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9faW5wdXRcIik7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fcG9wdXBGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25Db250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIHRoaXMuX2Zvcm1WYWx1ZXMgPSB7fTtcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaChcbiAgICAgIChpbnB1dCkgPT4gKHRoaXMuX2Zvcm1WYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1WYWx1ZXM7XG4gIH1cblxuICBfc3VibWl0KGV2dCkge1xuICAgIC8vdGhpcyBtZXRob2QgaXMgdG8gYmUgY2FsbGVkIHdoZW4gZm9ybSBpcyBzdWJtaXRlZFxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7IC8vY2FsbCBleHRlcm5hbCBjYWxsYmFjayBfaGFuZGxlRm9ybVN1Ym1pdFxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgLy9Vc2UgJ3RoaXMuX3N1Ym1pdCcgYm91bmRlZCBtZXRob2QgaW5zdGVhZCBvZiBhbm9ueW1vdXMgZnVuY3Rpb25cbiAgICB0aGlzLl9wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cEZvcm0ucmVzZXQoKTtcbiAgICBzdXBlci5jbG9zZSgpO1xuICB9XG5cbiAgc2V0TG9hZGluZyhpc0xvYWRpbmcsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIC8vIGlmIGxvYWRpbmcgdXNlIHRoZSBsb2FkaW5nIHRleHRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBub3QgbG9hZGluZyB1c2UgdGhlIHN1Ym1pdEJ1dHRvbkNvbnRlbnRcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcgPVxuICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlXCIpO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsQ2FwdGlvbiA9XG4gICAgICB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2FwdGlvblwiKTtcbiAgfVxuXG4gIG9wZW4oZGF0YSkge1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nLnNyYyA9IGRhdGEubGluaztcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZy5hbHQgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxDYXB0aW9uLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgcmVuZGVyZXIgfSwgc2VsZWN0b3IpIHtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3NlbGVjdG9yfWApO1xuICB9XG5cbiAgcmVuZGVySXRlbXMoaXRlbXMpIHtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEl0ZW1zKGl0ZW0pIHtcbiAgICB0aGlzLl9lbGVtZW50LnByZXBlbmQoaXRlbSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyBwcm9maWxlVGl0bGUsIHByb2ZpbGVEZXNjcmlwdGlvbiwgcHJvZmlsZUF2YXRhciB9KSB7XG4gICAgdGhpcy5fcHJvZmlsZVRpdGxlID0gcHJvZmlsZVRpdGxlO1xuICAgIHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbiA9IHByb2ZpbGVEZXNjcmlwdGlvbjtcbiAgICB0aGlzLl9wcm9maWxlQXZhdGFyID0gcHJvZmlsZUF2YXRhcjtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9maWxlVGl0bGU6IHRoaXMuX3Byb2ZpbGVUaXRsZS50ZXh0Q29udGVudCxcbiAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbjogdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50LFxuICAgICAgcHJvZmlsZUF2YXRhcjogdGhpcy5fcHJvZmlsZUF2YXRhci5zcmMsXG4gICAgfTtcbiAgfVxuXG4gIHNldFVzZXJJbmZvKHtuYW1lLCBhYm91dCwgYXZhdGFyfSkge1xuICAgIGlmIChuYW1lKSB0aGlzLl9wcm9maWxlVGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIGlmIChhYm91dCkgdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYWJvdXQ7XG4gICAgaWYgKGF2YXRhcikgdGhpcy5fcHJvZmlsZUF2YXRhci5zcmMgPSBhdmF0YXI7XG4gIH1cbn1cbiIsIlxuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3JzID0ge1xuICBjYXJkU2VjdGlvbjogXCIuY2FyZHNfX2xpc3RcIixcbiAgY2FyZFRlbXBsYXRlOiBcIiNjYXJkLXRlbXBsYXRlXCIsXG4gIHByZXZpZXdJbWFnZU1vZGFsOiBcIiNwcmV2aWV3LWltYWdlLW1vZGFsXCIsXG59O1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX2J1dHRvblwiLFxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcIm1vZGFsX19idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcbn07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5cbi8vaW1wb3J0IGFsbCB0aGUgY2xhc3Nlc1xuaW1wb3J0IHsgc2VsZWN0b3JzLCBjb25maWcgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkXCI7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uXCI7XG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2VcIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mb1wiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGlcIjtcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm1cIjtcbi8vQ3JlYXRlIGluc3RhbmNlcyBvZiB0aGUgY2xhc3Nlc1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC1hcGkuZW4udHJpcGxldGVuLXNlcnZpY2VzLmNvbS92MVwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJkNzg2NDllZC1mZDE0LTQxZjctOWEyYi0wNGMzZmIxM2NjMjhcIixcbiAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5jb25zdCBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxuICB7XG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiB7XG4gICAgICBjYXJkU2VjdGlvbi5hZGRJdGVtcyhjcmVhdGVDYXJkKGRhdGEpKTtcbiAgICB9LFxuICB9LFxuICBzZWxlY3RvcnMuY2FyZFNlY3Rpb25cbik7XG5cbmNvbnN0IGNyZWF0ZUNhcmQgPSAoZGF0YSkgPT4ge1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoXG4gICAgZGF0YSxcbiAgICBcIiNjYXJkLXRlbXBsYXRlXCIsXG4gICAgKCkgPT4ge1xuICAgICAgY2FyZFByZXZpZXdQb3B1cC5vcGVuKGRhdGEpO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2FyZERlbGV0ZShjYXJkKSB7XG4gICAgICBjb25maXJtRGVsZXRlUG9wdXAub3BlbigpO1xuICAgICAgY29uZmlybURlbGV0ZVBvcHVwLnNldFN1Ym1pdEFjdGlvbigoKSA9PiB7XG4gICAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5zZXRMb2FkaW5nKHRydWUsIFwiRGVsZXRpbmdcIik7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5yZW1vdmVDYXJkKGNhcmQuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYXJkLl9oYW5kbGVUcmFzaEljb24oKTtcbiAgICAgICAgICAgIGNvbmZpcm1EZWxldGVQb3B1cC5jbG9zZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyhmYWxzZSwgXCJEZWxldGluZ1wiKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgKGNhcmQpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gY2FyZC5nZXRJZCgpO1xuICAgICAgaWYgKGNhcmQuaXNMaWtlZCgpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGlzbGlraW5nXCIpO1xuICAgICAgICBhcGkuZGlzbGlrZUNhcmQoaWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcImxpa2luZ1wiKTtcbiAgICAgICAgYXBpLmxpa2VDYXJkKGlkKS50aGVuKChyZXMpID0+IHtjYXJkLl91cGRhdGVMaWtlc1ZpZXcoKTt9KVxuICAgICAgfVxuICAgIH0pO1xuICAgIH0pXG4gIHJldHVybiBjYXJkLmdldFZpZXcoKTtcbiAgfTtcblxuY29uc3QgY2FyZFByZXZpZXdQb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZShzZWxlY3RvcnMucHJldmlld0ltYWdlTW9kYWwpO1xuZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkRGF0YSkge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGNyZWF0ZUNhcmQoY2FyZERhdGEpO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtcyhjYXJkRWxlbWVudCk7XG59XG5cbmNvbnN0IGNvbmZpcm1EZWxldGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhDb25maXJtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjZGVsZXRlLWNhcmQtbW9kYWxcIixcbn0pO1xuY29uZmlybURlbGV0ZVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8vIGluaXRpYWxpemUgYWxsIG15IGluc3RhbmNlc1xuXG5jYXJkUHJldmlld1BvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8qKkVsZW1lbnRzICovXG5jb25zdCBwcm9maWxlRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0TW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiLFxuICBoYW5kbGVGb3JtU3VibWl0OiBoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdCxcbn0pO1xucHJvZmlsZUVkaXRNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGROZXdDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWFkZC1idXR0b25cIik7XG5cbmNvbnN0IGFkZENhcmRNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjYWRkLWNhcmQtbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogKGRhdGEpID0+IHtcbiAgICBhZGRDYXJkTW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5hZGRDYXJkTW9kYWwoZGF0YSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZFNlY3Rpb24uYWRkSXRlbXMoY3JlYXRlQ2FyZChyZXMpKTtcbiAgICAgICAgYWRkQ2FyZFZhbGlkYXRvci5kaXNhYmxlQnV0dG9uKCk7XG4gICAgICAgIGFkZENhcmRGb3JtRWxlbWVudC5yZXNldCgpO1xuICAgICAgICBhZGRDYXJkTW9kYWwuY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgYWRkQ2FyZE1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH0sXG59KTtcblxuYWRkTmV3Q2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRDYXJkTW9kYWwub3BlbigpO1xufSk7XG5cbmFkZENhcmRNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBwcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGUtbmFtZVwiKTtcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi10aXRsZVwiKTtcbmNvbnN0IHByb2ZpbGVUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlLWlucHV0XCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCJcbik7XG5jb25zdCBwcm9maWxlQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWltYWdlLWlkXCIpO1xuY29uc3QgcHJvZmlsZUVkaXRGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJlZGl0LXByb2ZpbGUtbW9kYWxfX2Zvcm1cIl07XG5jb25zdCBhZGRDYXJkRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5mb3Jtc1tcImFkZC1jYXJkLW1vZGFsX19mb3JtXCJdO1xuY29uc3QgYXZhdGFyTW9kYWxGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJlZGl0LWF2YXRhci1tb2RhbF9fZm9ybVwiXTtcblxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xuICBwcm9maWxlVGl0bGUsXG4gIHByb2ZpbGVEZXNjcmlwdGlvbixcbiAgcHJvZmlsZUF2YXRhcixcbn0pO1xuXG5jb25zdCBhdmF0YXJNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjZWRpdC1hdmF0YXItbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogKGlucHV0VmFsdWUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhpbnB1dFZhbHVlKTtcbiAgICBhdmF0YXJNb2RhbC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nXCIpO1xuICAgIGFwaVxuICAgICAgLmF2YXRhck1vZGFsKGlucHV0VmFsdWUpXG4gICAgICAudGhlbigoaW5mbykgPT4ge1xuICAgICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhpbmZvKTtcbiAgICAgICAgYXZhdGFyTW9kYWxWYWxpZGF0b3IuZGlzYWJsZUJ1dHRvbigpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSlcblxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBhdmF0YXJNb2RhbC5zZXRMb2FkaW5nKGZhbHNlLCBcIlNhdmluZ1wiKTtcbiAgICAgIH0pO1xuICB9LFxufSk7XG5cbmNvbnN0IGF2YXRhckVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtYXZhdGFyLWJ1dHRvblwiKTtcbmF2YXRhckVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYXZhdGFyTW9kYWwub3BlbigpO1xufSk7XG5hdmF0YXJNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vKipFdmVudCBIYW5kbGVycyAqL1xuZnVuY3Rpb24gaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQoZGF0YSkge1xuICBwcm9maWxlRWRpdE1vZGFsLnNldExvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5lZGl0cHJvZmlsZUluZm8oeyBuYW1lOiBkYXRhLk5hbWUsIGFib3V0OiBkYXRhLkRlc2NyaXB0aW9uIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckluZm8ocmVzKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwcm9maWxlRWRpdE1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufVxuXG4vKipFdmVudCBMaXN0ZW5lcnMgKi9cblxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgY3VycmVudFVzZXJJbmZvID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgcHJvZmlsZVRpdGxlSW5wdXQudmFsdWUgPSBjdXJyZW50VXNlckluZm8ucHJvZmlsZVRpdGxlO1xuICBwcm9maWxlRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VySW5mby5wcm9maWxlRGVzY3JpcHRpb247XG4gIHByb2ZpbGVFZGl0TW9kYWwub3BlbigpO1xufSk7XG5cbmNvbnN0IGFkZENhcmRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogYWRkQ2FyZEZvcm1FbGVtZW50LFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xuYWRkQ2FyZFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG5cbmNvbnN0IHByb2ZpbGVFZGl0VmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioe1xuICBmb3JtRWw6IHByb2ZpbGVFZGl0Rm9ybSxcbiAgY29uZmlnOiBjb25maWcsXG59KTtcbnByb2ZpbGVFZGl0VmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbmFwaVxuICAuZmV0Y2hJbml0aWFsRGF0YSgpXG4gIC50aGVuKChbdXNlckRhdGEsIGNhcmRzRGF0YV0pID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImhleVwiKTtcbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh1c2VyRGF0YSk7XG4gICAgY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoY2FyZHNEYXRhKTtcbiAgfSlcbiAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pXG4gICBcblxuY29uc3QgYXZhdGFyTW9kYWxWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogYXZhdGFyTW9kYWxGb3JtLFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xuYXZhdGFyTW9kYWxWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuIl0sIm5hbWVzIjpbIkFwaSIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImJhc2VVcmwiLCJoZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsImZldGNoIiwidGhlbiIsIl9jaGVja1Jlc3BvbnNlIiwiZmV0Y2hJbml0aWFsRGF0YSIsImVkaXRwcm9maWxlSW5mbyIsImRhdGEiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFkZENhcmRNb2RhbCIsIm5hbWUiLCJsaW5rIiwicmVtb3ZlQ2FyZCIsIkNhcmRJRCIsImxpa2VDYXJkIiwiZGlzbGlrZUNhcmQiLCJhdmF0YXJNb2RhbCIsIl9yZWYiLCJhdmF0YXIiLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJDYXJkIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwiaGFuZGxlRGVsZXRlIiwiaGFuZGxlTGlrZSIsIl9uYW1lIiwiX2xpbmsiLCJfaWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJfaXNMaWtlZCIsImlzTGlrZWQiLCJnZXRJZCIsIl9zZXRFdmVudGxpc3RlbmVycyIsIl9jYXJkRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiX2hhbmRsZUxpa2VJY29uIiwiX2NhcmRJbWFnZSIsInRleHQiLCJfdGV4dCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIl9oYW5kbGVUcmFzaEljb24iLCJyZW1vdmUiLCJnZXRWaWV3IiwiZG9jdW1lbnQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX2NhcmRDYXB0aW9uIiwic3JjIiwiX2NhcmRMaWtlQnV0dG9uIiwiYWx0IiwidGV4dENvbnRlbnQiLCJfdXBkYXRlTGlrZXNWaWV3IiwiYWRkIiwiRm9ybVZhbGlkYXRvciIsImZvcm1FbCIsImNvbmZpZyIsIl9mb3JtRWwiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbCIsIl9lcnJvck1lc3NhZ2VFbCIsImlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfaW5wdXRFbHMiLCJldmVyeSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImRpc2FibGVCdXR0b24iLCJfc3VibWl0QnV0dG9uIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlIiwiZW5hYmxlVmFsaWRhdGlvbiIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwib3BlbiIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiX3N1Ym1pdEJ1dHRvbkNvbnRlbnQiLCJzZXRTdWJtaXRBY3Rpb24iLCJhY3Rpb24iLCJfaGFuZGxlU3VibWl0Q2FsbGJhY2siLCJwcmV2ZW50RGVmYXVsdCIsInNldExvYWRpbmciLCJpc0xvYWRpbmciLCJsb2FkaW5nVGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfcG9wdXBGb3JtIiwiX2lucHV0TGlzdCIsIl9nZXRJbnB1dFZhbHVlcyIsIl9mb3JtVmFsdWVzIiwiaW5wdXQiLCJ2YWx1ZSIsIl9zdWJtaXQiLCJjb25zb2xlIiwibG9nIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9wcmV2aWV3SW1hZ2VNb2RhbEltZyIsIl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24iLCJTZWN0aW9uIiwic2VsZWN0b3IiLCJyZW5kZXJlciIsIl9yZW5kZXJlciIsIl9lbGVtZW50IiwicmVuZGVySXRlbXMiLCJpdGVtcyIsIml0ZW0iLCJhZGRJdGVtcyIsInByZXBlbmQiLCJVc2VySW5mbyIsInByb2ZpbGVUaXRsZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsInByb2ZpbGVBdmF0YXIiLCJfcHJvZmlsZVRpdGxlIiwiX3Byb2ZpbGVEZXNjcmlwdGlvbiIsIl9wcm9maWxlQXZhdGFyIiwic2V0VXNlckluZm8iLCJfcmVmMiIsImFib3V0Iiwic2VsZWN0b3JzIiwiY2FyZFNlY3Rpb24iLCJjYXJkVGVtcGxhdGUiLCJwcmV2aWV3SW1hZ2VNb2RhbCIsImFwaSIsImF1dGhvcml6YXRpb24iLCJjcmVhdGVDYXJkIiwiY2FyZCIsImNhcmRQcmV2aWV3UG9wdXAiLCJoYW5kbGVDYXJkRGVsZXRlIiwiY29uZmlybURlbGV0ZVBvcHVwIiwiY2F0Y2giLCJlcnIiLCJmaW5hbGx5IiwicmVuZGVyQ2FyZCIsImNhcmRFbGVtZW50IiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlRWRpdE1vZGFsIiwiaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQiLCJhZGROZXdDYXJkQnV0dG9uIiwiYWRkQ2FyZFZhbGlkYXRvciIsImFkZENhcmRGb3JtRWxlbWVudCIsInByb2ZpbGVUaXRsZUlucHV0IiwicHJvZmlsZURlc2NyaXB0aW9uSW5wdXQiLCJwcm9maWxlRWRpdEZvcm0iLCJmb3JtcyIsImF2YXRhck1vZGFsRm9ybSIsInVzZXJJbmZvIiwiaW5wdXRWYWx1ZSIsImluZm8iLCJhdmF0YXJNb2RhbFZhbGlkYXRvciIsImVycm9yIiwiYXZhdGFyRWRpdEJ1dHRvbiIsIk5hbWUiLCJEZXNjcmlwdGlvbiIsImN1cnJlbnRVc2VySW5mbyIsInByb2ZpbGVFZGl0VmFsaWRhdG9yIiwidXNlckRhdGEiLCJjYXJkc0RhdGEiXSwic291cmNlUm9vdCI6IiJ9