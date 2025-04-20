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
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    //get the card view
    //set event listeners
    this._setEventlisteners();
    return this._cardElement;
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
      profileDescription
    } = _ref;
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
  }
  getUserInfo() {
    return {
      profileTitle: this._profileTitle.textContent,
      profileDescription: this._profileDescription.textContent
    };
  }
  setUserInfo(profileTitleInput, profileDescriptionInput) {
    this._profileTitle.textContent = profileTitleInput;
    this._profileDescription.textContent = profileDescriptionInput;
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
  dislikeCard(CardID) {
    return fetch(`${this.baseUrl}/cards/${CardID}/likes`, {
      method: "DELETE",
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
  editprofileAvatar() {
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
      undefined.close();
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
const profileEditForm = document.forms["edit-profile-modal__form"];
const addCardFormElement = document.forms["add-card-modal__form"];
const userInfo = new _components_UserInfo__WEBPACK_IMPORTED_MODULE_7__["default"]({
  profileTitle,
  profileDescription
});
const avatarModal = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"]({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: inputValue => {
    avatarModal.setLoading(true, "Saving");
    api.avatarModal(inputValue).then(res => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxLQUFLLENBQUM7RUFDbkI4RSxRQUFRLENBQUN4RCxXQUFXLENBQUNrRSxRQUFRLENBQUMvTCxJQUFJLEVBQUUrTCxRQUFRLENBQUNMLEtBQUssQ0FBQztFQUNsRDFCLFdBQVcsQ0FBQzlDLFdBQVcsQ0FBQzhFLFNBQVMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FDRDNDLEtBQUssQ0FBQ0MsR0FBRyxJQUFJO0VBQ1poRCxPQUFPLENBQUNpRCxLQUFLLENBQUNELEdBQUcsQ0FBQztBQUNwQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvQXBpLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvciggY2FyZERhdGEsICBjYXJkU2VsZWN0b3IsIGhhbmRsZUltYWdlQ2xpY2ssaGFuZGxlRGVsZXRlLCBoYW5kbGVMaWtlKSB7XG4gICAgdGhpcy5fbmFtZSA9IGNhcmREYXRhLm5hbWU7XG4gICAgdGhpcy5fbGluayA9IGNhcmREYXRhLmxpbms7XG4gICAgdGhpcy5faWQgPSBjYXJkRGF0YS5faWQ7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xuICB0aGlzLmhhbmRsZURlbGV0ZSA9IGhhbmRsZURlbGV0ZTtcbiAgdGhpcy5oYW5kbGVMaWtlID0gaGFuZGxlTGlrZTtcbiAgXG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBfc2V0RXZlbnRsaXN0ZW5lcnMoKSB7XG4gICAgLy8gb24gdGhlIHNldEV2ZW50TGlzdGVuZXJzIG9mIENhcmQuanNcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saWtlLWJ1dHRvblwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VJY29uKCk7XG4gICAgICB9KTtcblxuICAgIC8vXCIuY2FyZF9fdHJhc2gtYnV0dG9uXCJcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10cmFzaC1idXR0b25cIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZURlbGV0ZSh0aGlzKTtcbiAgICAgIH0pO1xuXG4gICAgXG4gXG4gICAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2soeyBsaW5rOiB0aGlzLl9saW5rLCB0ZXh0OiB0aGlzLl90ZXh0IH0pXG4gICAgICApO1xuICB9XG5cbiAgX2hhbmRsZUxpa2VJY29uKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpa2UtYnV0dG9uXCIpXG4gICAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgfVxuXG4gIF9oYW5kbGVUcmFzaEljb24oKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgZ2V0VmlldygpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtaWRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGhpcy5fY2FyZENhcHRpb24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGl0bGUtaWRcIik7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkX19pbWFnZS1tb2RhbFwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl9jYXJkQ2FwdGlvbi50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XG4gICAgLy9nZXQgdGhlIGNhcmQgdmlld1xuICAgIC8vc2V0IGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuX3NldEV2ZW50bGlzdGVuZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRFbGVtZW50O1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IoeyBmb3JtRWwsIGNvbmZpZyB9KSB7XG4gICAgdGhpcy5fZm9ybUVsID0gZm9ybUVsO1xuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBjb25maWcuaW5wdXRTZWxlY3RvcjtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3M7XG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gY29uZmlnLmlucHV0RXJyb3JDbGFzcztcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gY29uZmlnLmVycm9yQ2xhc3M7XG4gICAgdGhpcy5fZm9ybVNlbGVjdG9yID0gY29uZmlnLmZvcm1TZWxlY3RvcjtcbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgfVxuXG4gIF9oYXNJbnZhbGlkSW5wdXQoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pbnB1dEVscy5ldmVyeSgoaW5wdXRFbCkgPT4gaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XG4gIH1cblxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XG4gICAgICB0aGlzLmRpc2FibGVCdXR0b24oKTsgIC8vIGRpc2FibGUgaWYgdGhlIGZvcm0gaXMgaW52YWxpZFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTsgIC8vIGVuYWJsZSB0aGUgYnV0dG9uIHVzaW5nIHRoZSBzdHlsZXNcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlOyAgLy8gZW5hYmxlIHRoZSBidXR0b24gdXNpbmcgdGhlIGBkaXNhYmxlZCBgIGF0dHJpYnV0ZVxuICAgIH1cbiAgfVxuICBcbiAgZGlzYWJsZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgX3NldEV2ZW50bGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2lucHV0RWxzID0gWy4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2lucHV0U2VsZWN0b3IpXTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3Rvcih0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3NldEV2ZW50bGlzdGVuZXJzKCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlID0gdGhpcy5faGFuZGxlRXNjQ2xvc2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlIChldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxfX2Nsb3NlXCIpIHx8XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBcIjtcblxuY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yLH0pIHtcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3J9KTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuXG4gICAgICAgIHNldFN1Ym1pdEFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZVN1Ym1pdENhbGxiYWNrID0gYWN0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVTdWJtaXRDYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRMb2FkaW5nKGlzTG9hZGluZywgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKXtcbiAgICAgICAgICAgIGlmKGlzTG9hZGluZyl7XG4gICAgICAgICAgICAgIC8vIGlmIGxvYWRpbmcgdXNlIHRoZSBsb2FkaW5nIHRleHRcbiAgICAgICAgICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBpZiBub3QgbG9hZGluZyB1c2UgdGhlIHN1Ym1pdEJ1dHRvbkNvbnRlbnRcbiAgICAgICAgICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uQ29udGVudFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAgIGV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aENvbmZpcm07XG5cbiAgICAgICAiLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0LH0pIHtcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3J9KTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9wb3B1cEZvcm0gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsX19mb3JtJyk7XG4gICAgdGhpcy5faW5wdXRMaXN0ID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbF9faW5wdXQnKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9wb3B1cEZvcm0ucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbkNvbnRlbnQgPSB0aGlzLl9zdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG5cbiAgfVxuXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICB0aGlzLl9mb3JtVmFsdWVzID0ge307XG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goaW5wdXQgPT4gdGhpcy5fZm9ybVZhbHVlc1tpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlKTtcblxuICAgIHJldHVybiB0aGlzLl9mb3JtVmFsdWVzO1xuICB9XG5cbiAgX3N1Ym1pdChldnQpIHsgLy90aGlzIG1ldGhvZCBpcyB0byBiZSBjYWxsZWQgd2hlbiBmb3JtIGlzIHN1Ym1pdGVkXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTsgLy9jYWxsIGV4dGVybmFsIGNhbGxiYWNrIF9oYW5kbGVGb3JtU3VibWl0XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAvL1VzZSAndGhpcy5fc3VibWl0JyBib3VuZGVkIG1ldGhvZCBpbnN0ZWFkIG9mIGFub255bW91cyBmdW5jdGlvblxuICAgIHRoaXMuX3BvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTsgXG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwRm9ybS5yZXNldCgpO1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gIH1cblxuICBzZXRMb2FkaW5nKGlzTG9hZGluZywgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKXtcbiAgICBpZihpc0xvYWRpbmcpe1xuICAgICAgLy8gaWYgbG9hZGluZyB1c2UgdGhlIGxvYWRpbmcgdGV4dFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQgICAgXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vdCBsb2FkaW5nIHVzZSB0aGUgc3VibWl0QnV0dG9uQ29udGVudFxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fc3VibWl0QnV0dG9uQ29udGVudFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nID1cbiAgICAgIHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24gPVxuICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XG4gIH1cblxuICBvcGVuKGRhdGEpIHtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZy5zcmMgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcuYWx0ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsQ2FwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IHJlbmRlcmVyfSwgc2VsZWN0b3IpIHtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3NlbGVjdG9yfWApO1xuICAgIFxuICB9XG5cbiAgcmVuZGVySXRlbXMoaXRlbXMpIHtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKVxuICAgIH0pO1xuICAgIFxuICB9XG5cbiAgYWRkSXRlbXMoaXRlbSkge1xuICAgIHRoaXMuX2VsZW1lbnQucHJlcGVuZChpdGVtKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IHByb2ZpbGVUaXRsZSwgcHJvZmlsZURlc2NyaXB0aW9uIH0pIHtcbiAgICB0aGlzLl9wcm9maWxlVGl0bGUgPSBwcm9maWxlVGl0bGU7XG4gICAgdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uID0gcHJvZmlsZURlc2NyaXB0aW9uO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb2ZpbGVUaXRsZTogdGhpcy5fcHJvZmlsZVRpdGxlLnRleHRDb250ZW50LFxuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uOiB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQsXG4gICAgfTtcbiAgfVxuXG4gIHNldFVzZXJJbmZvKHByb2ZpbGVUaXRsZUlucHV0LCBwcm9maWxlRGVzY3JpcHRpb25JbnB1dCkge1xuICAgIHRoaXMuX3Byb2ZpbGVUaXRsZS50ZXh0Q29udGVudCA9IHByb2ZpbGVUaXRsZUlucHV0O1xuICAgIHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2ZpbGVEZXNjcmlwdGlvbklucHV0O1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycztcbiAgfVxuXG4gIGdldEFwcEluZm8oKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFVzZXJJbmZvKCldKTtcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcbiAgfVxuXG4gIGZldGNoSW5pdGlhbERhdGEoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldFVzZXJJbmZvKCksIHRoaXMuZ2V0SW5pdGlhbENhcmRzKCldKTtcbiAgfVxuXG4gIGVkaXRwcm9maWxlSW5mbyhkYXRhKXtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gIH0pXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgIHJldHVybiByZXMub2sgPyByZXMuanNvbigpIDogUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YClcbiAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pXG59XG5cbiAgYWRkQ2FyZE1vZGFsKGRhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgbGluazogZGF0YS5saW5rXG4gICAgICB9KVxuICAgIH0pXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICByZXR1cm4gcmVzLm9rID8gcmVzLmpzb24oKSA6IFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH0pXG4gICAgICB9XG5cblxuICAgICAgcmVtb3ZlQ2FyZChDYXJkSUQpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9YCwge1xuICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5vayA/IHJlcy5qc29uKCkgOiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgICAgIGxpa2VDYXJkKENhcmRJRCkge1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9L2xpa2VzYCwge1xuICAgICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGF2YXRhclxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLm9rID8gcmVzLmpzb24oKSA6IFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSAgXG5cbiAgICAgICAgICAgICAgZGlzbGlrZUNhcmQoQ2FyZElEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vY2FyZHMvJHtDYXJkSUR9L2xpa2VzYCwge1xuICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICBhdmF0YXJcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMub2sgPyByZXMuanNvbigpIDogUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgIFxuICAgZWRpdHByb2ZpbGVBdmF0YXIoKXtcbiAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICBhdmF0YXJcbiAgICB9KVxuICB9KVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICByZXR1cm4gcmVzLm9rID8gcmVzLmpzb24oKSA6IFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApXG4gIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KVxufVxuXG59IiwiXG5cbmV4cG9ydCBjb25zdCBzZWxlY3RvcnMgPSB7XG4gIGNhcmRTZWN0aW9uOiBcIi5jYXJkc19fbGlzdFwiLFxuICBjYXJkVGVtcGxhdGU6IFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgcHJldmlld0ltYWdlTW9kYWw6IFwiI3ByZXZpZXctaW1hZ2UtbW9kYWxcIixcbn07XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2J1dHRvbl9kaXNhYmxlZFwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcblxuLy9pbXBvcnQgYWxsIHRoZSBjbGFzc2VzXG5pbXBvcnQgeyBzZWxlY3RvcnMsIGNvbmZpZyB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmRcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3JcIjtcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb25cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybVwiO1xuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi9wYWdlcy9BcGlcIjtcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm1cIjtcbi8vQ3JlYXRlIGluc3RhbmNlcyBvZiB0aGUgY2xhc3Nlc1xuXG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImQ3ODY0OWVkLWZkMTQtNDFmNy05YTJiLTA0YzNmYjEzY2MyOFwiLFxuICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gIH1cbn0pO1xuXG5cblxuXG5jb25zdCBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxuICB7XG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiB7Y2FyZFNlY3Rpb24uYWRkSXRlbXMoY3JlYXRlQ2FyZChkYXRhKSl9LFxuICB9LFxuICBzZWxlY3RvcnMuY2FyZFNlY3Rpb24sXG5cbik7XG5cbmNvbnN0IGNyZWF0ZUNhcmQgPSAoZGF0YSkgPT4ge1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoXG4gICAgZGF0YSxcbiAgICBcIiNjYXJkLXRlbXBsYXRlXCIsXG4gICAgKCkgPT4ge1xuICAgICAgY2FyZFByZXZpZXdQb3B1cC5vcGVuKGRhdGEpO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2FyZERlbGV0ZShjYXJkKSB7XG4gICAgICBjb25maXJtRGVsZXRlUG9wdXAub3BlbigpO1xuICAgICAgY29uZmlybURlbGV0ZVBvcHVwLnNldFN1Ym1pdEFjdGlvbigoKSA9PiB7XG4gICAgICBjb25maXJtRGVsZXRlUG9wdXAuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZ1wiKVxuICAgICAgICBhcGlcbiAgICAgICAgICAucmVtb3ZlQ2FyZChjYXJkLmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FyZC5faGFuZGxlVHJhc2hJY29uKCk7XG4gICAgICAgICAgICBjb25maXJtRGVsZXRlUG9wdXAuY2xvc2UoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgY29uZmlybURlbGV0ZVBvcHVwLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nXCIpXG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIChjYXJkKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IGNhcmQuZ2V0SWQoKTtcbiAgICAgIGFwaS5saWtlQ2FyZChpZCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmQuaGFuZGxlbGlrZSgpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgKTtcblxuICByZXR1cm4gY2FyZC5nZXRWaWV3KCk7XG59O1xuXG5jb25zdCBjYXJkUHJldmlld1BvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKHNlbGVjdG9ycy5wcmV2aWV3SW1hZ2VNb2RhbCk7XG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmREYXRhKSB7XG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY3JlYXRlQ2FyZChjYXJkRGF0YSk7XG4gIGNhcmRTZWN0aW9uLmFkZEl0ZW1zKGNhcmRFbGVtZW50KTtcbiAgXG59XG5cbmNvbnN0IGNvbmZpcm1EZWxldGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhDb25maXJtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjZGVsZXRlLWNhcmQtbW9kYWxcIixcbn0pO1xuY29uZmlybURlbGV0ZVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAvLyBpbml0aWFsaXplIGFsbCBteSBpbnN0YW5jZXNcblxuICAgIGNhcmRQcmV2aWV3UG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgXG5cbi8qKkVsZW1lbnRzICovXG5jb25zdCBwcm9maWxlRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0TW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybSh7XG4gIHBvcHVwU2VsZWN0b3I6IFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiLFxuICBoYW5kbGVGb3JtU3VibWl0OiBoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdCxcbn0pO1xucHJvZmlsZUVkaXRNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGROZXdDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWFkZC1idXR0b25cIik7XG5cbmNvbnN0IGFkZENhcmRNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjYWRkLWNhcmQtbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogKGRhdGEpID0+XG57IFxuICBhZGRDYXJkTW9kYWwuc2V0TG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKVxuICBhcGkuYWRkQ2FyZE1vZGFsKGRhdGEpXG4gIC50aGVuKChyZXMpID0+IHtcbiAgICBjYXJkU2VjdGlvbi5hZGRJdGVtcyhjcmVhdGVDYXJkKHJlcykpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuICAuZmluYWxseSgoKSA9PiB7XG4gICAgYWRkQ2FyZE1vZGFsLnNldExvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpXG4gIH0pXG5cblxufX0pO1xuXG5cblxuYWRkTmV3Q2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRDYXJkTW9kYWwub3BlbigpO1xufSk7XG5cbmFkZENhcmRNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBwcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGUtbmFtZVwiKTtcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi10aXRsZVwiKTtcbmNvbnN0IHByb2ZpbGVUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlLWlucHV0XCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCJcbik7XG5jb25zdCBwcm9maWxlRWRpdEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcImVkaXQtcHJvZmlsZS1tb2RhbF9fZm9ybVwiXTtcbmNvbnN0IGFkZENhcmRGb3JtRWxlbWVudCA9IGRvY3VtZW50LmZvcm1zW1wiYWRkLWNhcmQtbW9kYWxfX2Zvcm1cIl07XG5cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgcHJvZmlsZVRpdGxlLFxuICBwcm9maWxlRGVzY3JpcHRpb24sXG59KTtcblxuXG5jb25zdCBhdmF0YXJNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjZWRpdC1hdmF0YXItbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogKGlucHV0VmFsdWUpID0+IHtcbiAgICBhdmF0YXJNb2RhbC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nXCIpXG4gICAgYXBpLmF2YXRhck1vZGFsKGlucHV0VmFsdWUpXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIHJldHVybiByZXMub2sgPyByZXMuanNvbigpIDogUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YClcbiB9KVxuICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgfSlcbiAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICBhdmF0YXJNb2RhbC5zZXRMb2FkaW5nKGZhbHNlLCBcIlNhdmluZ1wiKVxuICAgIH0pXG4gIFxufVxufSk7XG5cblxuY29uc3QgYXZhdGFyRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1hdmF0YXItYnV0dG9uXCIpO1xuYXZhdGFyRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhdmF0YXJNb2RhbC5vcGVuKCk7XG59KTtcbmF2YXRhck1vZGFsLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cblxuLyoqRXZlbnQgSGFuZGxlcnMgKi9cbmZ1bmN0aW9uIGhhbmRsZVByb2ZpbGVFZGl0U3VibWl0KGRhdGEpIHtcbiAgcHJvZmlsZUVkaXRNb2RhbC5zZXRMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGkuZWRpdHByb2ZpbGVJbmZvKHsgbmFtZTogZGF0YS5OYW1lLCBhYm91dDogZGF0YS5EZXNjcmlwdGlvbiB9KVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHJlcy5uYW1lLCByZXMuYWJvdXQpO1xuIH0pXG4gICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHByb2ZpbGVFZGl0TW9kYWwuc2V0TG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59XG5cblxuXG4vKipFdmVudCBMaXN0ZW5lcnMgKi9cblxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgY3VycmVudFVzZXJJbmZvID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgcHJvZmlsZVRpdGxlSW5wdXQudmFsdWUgPSBjdXJyZW50VXNlckluZm8ucHJvZmlsZVRpdGxlO1xuICBwcm9maWxlRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VySW5mby5wcm9maWxlRGVzY3JpcHRpb247XG4gIHByb2ZpbGVFZGl0TW9kYWwub3BlbigpO1xufSk7XG5cbmNvbnN0IGFkZENhcmRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogYWRkQ2FyZEZvcm1FbGVtZW50LFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xuYWRkQ2FyZFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG5cbmNvbnN0IHByb2ZpbGVFZGl0VmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioe1xuICBmb3JtRWw6IHByb2ZpbGVFZGl0Rm9ybSxcbiAgY29uZmlnOiBjb25maWcsXG59KTtcbnByb2ZpbGVFZGl0VmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbmFwaS5mZXRjaEluaXRpYWxEYXRhKClcbi50aGVuKChbdXNlckRhdGEsIGNhcmRzRGF0YV0pID0+IHtcbiAgY29uc29sZS5sb2coXCJoZXlcIik7XG4gdXNlckluZm8uc2V0VXNlckluZm8odXNlckRhdGEubmFtZSwgdXNlckRhdGEuYWJvdXQpXG4gIGNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKGNhcmRzRGF0YSk7XG59KVxuLmNhdGNoKGVyciA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoZXJyKTtcbn0pO1xuXG5cblxuXG5cblxuXG5cblxuIFxuXG5cblxuXG5cblxuICBcblxuXG4gXG5cblxuICBcblxuXG4gIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImNhcmREYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlSW1hZ2VDbGljayIsImhhbmRsZURlbGV0ZSIsImhhbmRsZUxpa2UiLCJfbmFtZSIsIm5hbWUiLCJfbGluayIsImxpbmsiLCJfaWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJnZXRJZCIsIl9zZXRFdmVudGxpc3RlbmVycyIsIl9jYXJkRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiX2hhbmRsZUxpa2VJY29uIiwiX2NhcmRJbWFnZSIsInRleHQiLCJfdGV4dCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIl9oYW5kbGVUcmFzaEljb24iLCJyZW1vdmUiLCJnZXRWaWV3IiwiZG9jdW1lbnQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX2NhcmRDYXB0aW9uIiwic3JjIiwiYWx0IiwidGV4dENvbnRlbnQiLCJGb3JtVmFsaWRhdG9yIiwiX3JlZiIsImZvcm1FbCIsImNvbmZpZyIsIl9mb3JtRWwiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbCIsIl9lcnJvck1lc3NhZ2VFbCIsImlkIiwiYWRkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfaW5wdXRFbHMiLCJldmVyeSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImRpc2FibGVCdXR0b24iLCJfc3VibWl0QnV0dG9uIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlIiwiZW5hYmxlVmFsaWRhdGlvbiIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwib3BlbiIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiX3N1Ym1pdEJ1dHRvbkNvbnRlbnQiLCJzZXRTdWJtaXRBY3Rpb24iLCJhY3Rpb24iLCJfaGFuZGxlU3VibWl0Q2FsbGJhY2siLCJwcmV2ZW50RGVmYXVsdCIsInNldExvYWRpbmciLCJpc0xvYWRpbmciLCJsb2FkaW5nVGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfcG9wdXBGb3JtIiwiX2lucHV0TGlzdCIsIl9nZXRJbnB1dFZhbHVlcyIsIl9mb3JtVmFsdWVzIiwiaW5wdXQiLCJ2YWx1ZSIsIl9zdWJtaXQiLCJjb25zb2xlIiwibG9nIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9wcmV2aWV3SW1hZ2VNb2RhbEltZyIsIl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24iLCJkYXRhIiwiU2VjdGlvbiIsInNlbGVjdG9yIiwicmVuZGVyZXIiLCJfcmVuZGVyZXIiLCJfZWxlbWVudCIsInJlbmRlckl0ZW1zIiwiaXRlbXMiLCJpdGVtIiwiYWRkSXRlbXMiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJwcm9maWxlVGl0bGUiLCJwcm9maWxlRGVzY3JpcHRpb24iLCJfcHJvZmlsZVRpdGxlIiwiX3Byb2ZpbGVEZXNjcmlwdGlvbiIsImdldFVzZXJJbmZvIiwic2V0VXNlckluZm8iLCJwcm9maWxlVGl0bGVJbnB1dCIsInByb2ZpbGVEZXNjcmlwdGlvbklucHV0IiwiQXBpIiwib3B0aW9ucyIsImJhc2VVcmwiLCJoZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZmV0Y2hJbml0aWFsRGF0YSIsImVkaXRwcm9maWxlSW5mbyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJyZWplY3QiLCJzdGF0dXMiLCJjYXRjaCIsImVyciIsImVycm9yIiwiYWRkQ2FyZE1vZGFsIiwicmVtb3ZlQ2FyZCIsIkNhcmRJRCIsImxpa2VDYXJkIiwiYXZhdGFyIiwiZGlzbGlrZUNhcmQiLCJlZGl0cHJvZmlsZUF2YXRhciIsInNlbGVjdG9ycyIsImNhcmRTZWN0aW9uIiwiY2FyZFRlbXBsYXRlIiwicHJldmlld0ltYWdlTW9kYWwiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiY3JlYXRlQ2FyZCIsImNhcmQiLCJjYXJkUHJldmlld1BvcHVwIiwiaGFuZGxlQ2FyZERlbGV0ZSIsImNvbmZpcm1EZWxldGVQb3B1cCIsImZpbmFsbHkiLCJoYW5kbGVsaWtlIiwicmVuZGVyQ2FyZCIsImNhcmRFbGVtZW50IiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlRWRpdE1vZGFsIiwiaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQiLCJhZGROZXdDYXJkQnV0dG9uIiwicHJvZmlsZUVkaXRGb3JtIiwiZm9ybXMiLCJhZGRDYXJkRm9ybUVsZW1lbnQiLCJ1c2VySW5mbyIsImF2YXRhck1vZGFsIiwiaW5wdXRWYWx1ZSIsImF2YXRhckVkaXRCdXR0b24iLCJOYW1lIiwiYWJvdXQiLCJEZXNjcmlwdGlvbiIsImN1cnJlbnRVc2VySW5mbyIsImFkZENhcmRWYWxpZGF0b3IiLCJwcm9maWxlRWRpdFZhbGlkYXRvciIsInVzZXJEYXRhIiwiY2FyZHNEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==