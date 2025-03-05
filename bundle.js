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
  constructor(_ref, cardSelector, handleImageClick) {
    let {
      name,
      link
    } = _ref;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setEventlisteners() {
    // on the setEventListeners of Card.js
    this._cardElement.querySelector("#card-like-button").addEventListener("click", () => {
      this._handleLikeIcon();
    });

    //".card__trash-button"
    this._cardElement.querySelector("#card-trash-button").addEventListener("click", () => {
      this._handleTrashIcon();
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
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", event => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
    });
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
      items,
      renderer
    } = _ref;
    this._renderer = renderer;
    this._element = document.querySelector(selector);
    this._items = items;
  }
  renderItems() {
    this._items.forEach(item => this._renderer(item));
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

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   initialCards: () => (/* binding */ initialCards),
/* harmony export */   selectors: () => (/* binding */ selectors)
/* harmony export */ });
const initialCards = [{
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
}, {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
}, {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
}, {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
}, {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
}, {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
}];
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


//import all the classes








//Create instances of the classes
const createCard = data => {
  const card = new _components_Card__WEBPACK_IMPORTED_MODULE_2__["default"](data, "#card-template", () => {
    cardPreviewPopup.open(data);
  });
  return card.getView();
};
const cardPreviewPopup = new _components_PopupWithImage__WEBPACK_IMPORTED_MODULE_5__["default"](_utils_constants__WEBPACK_IMPORTED_MODULE_1__.selectors.previewImageModal);
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItems(cardElement);
}
const cardSection = new _components_Section__WEBPACK_IMPORTED_MODULE_4__["default"]({
  items: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.initialCards,
  renderer: renderCard
}, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.selectors.cardSection);

// initialize all my instances
cardSection.renderItems();
cardPreviewPopup.setEventListeners();
//all the rest

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
  handleFormSubmit: handleAddCardFormSubmit
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
const cardlistEl = document.querySelector("card-list-id");
const userInfo = new _components_UserInfo__WEBPACK_IMPORTED_MODULE_7__["default"]({
  profileTitle,
  profileDescription
});

/**Event Handlers */
function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data.Name, data.Description);
  profileEditModal.close();
}
function handleAddCardFormSubmit(cardData) {
  console.log(cardData);
  renderCard(cardData, cardlistEl);
  addCardModal.close();
  addCardValidator.disableButton();
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWdCLENBQUN2RCxLQUFLLENBQUMsQ0FBQztBQUMxQjtBQUVBLFNBQVMyRCx1QkFBdUJBLENBQUNQLFFBQVEsRUFBRTtFQUN6Q2UsT0FBTyxDQUFDQyxHQUFHLENBQUNoQixRQUFRLENBQUM7RUFDckJELFVBQVUsQ0FBQ0MsUUFBUSxFQUFFVyxVQUFVLENBQUM7RUFDaENMLFlBQVksQ0FBQzFELEtBQUssQ0FBQyxDQUFDO0VBQ3BCcUUsZ0JBQWdCLENBQUNwRixhQUFhLENBQUMsQ0FBQztBQUNsQzs7QUFFQTs7QUFFQXFFLGlCQUFpQixDQUFDcEgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDaEQsTUFBTW9JLGVBQWUsR0FBR04sUUFBUSxDQUFDekIsV0FBVyxDQUFDLENBQUM7RUFDOUNFLGlCQUFpQixDQUFDMUIsS0FBSyxHQUFHdUQsZUFBZSxDQUFDbkMsWUFBWTtFQUN0RE8sdUJBQXVCLENBQUMzQixLQUFLLEdBQUd1RCxlQUFlLENBQUNsQyxrQkFBa0I7RUFDbEVtQixnQkFBZ0IsQ0FBQ3hELElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQztBQUVGLE1BQU1zRSxnQkFBZ0IsR0FBRyxJQUFJbEgsaUVBQWEsQ0FBQztFQUN6Q0MsTUFBTSxFQUFFMEcsa0JBQWtCO0VBQzFCekcsTUFBTSxFQUFFQSxvREFBTUE7QUFDaEIsQ0FBQyxDQUFDO0FBQ0ZnSCxnQkFBZ0IsQ0FBQzdFLGdCQUFnQixDQUFDLENBQUM7QUFFbkMsTUFBTStFLG9CQUFvQixHQUFHLElBQUlwSCxpRUFBYSxDQUFDO0VBQzdDQyxNQUFNLEVBQUV3RyxlQUFlO0VBQ3ZCdkcsTUFBTSxFQUFFQSxvREFBTUE7QUFDaEIsQ0FBQyxDQUFDO0FBQ0ZrSCxvQkFBb0IsQ0FBQy9FLGdCQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3Rvcih7IG5hbWUsIGxpbmsgfSwgY2FyZFNlbGVjdG9yLCBoYW5kbGVJbWFnZUNsaWNrKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5fbGluayA9IGxpbms7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xuICB9XG5cbiAgX3NldEV2ZW50bGlzdGVuZXJzKCkge1xuICAgIC8vIG9uIHRoZSBzZXRFdmVudExpc3RlbmVycyBvZiBDYXJkLmpzXG4gICAgdGhpcy5fY2FyZEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGlrZS1idXR0b25cIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlSWNvbigpO1xuICAgICAgfSk7XG5cbiAgICAvL1wiLmNhcmRfX3RyYXNoLWJ1dHRvblwiXG4gICAgdGhpcy5fY2FyZEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdHJhc2gtYnV0dG9uXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlVHJhc2hJY29uKCk7XG4gICAgICB9KTtcblxuICAgIFxuIFxuICAgICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHsgbGluazogdGhpcy5fbGluaywgdGV4dDogdGhpcy5fdGV4dCB9KVxuICAgICAgKTtcbiAgfVxuXG4gIF9oYW5kbGVMaWtlSWNvbigpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saWtlLWJ1dHRvblwiKVxuICAgICAgLmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gIH1cblxuICBfaGFuZGxlVHJhc2hJY29uKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50LnJlbW92ZSgpO1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gbnVsbDtcbiAgfVxuXG4gIGdldFZpZXcoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFNlbGVjdG9yKVxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLWlkXCIpXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xuICAgIHRoaXMuX2NhcmRDYXB0aW9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRpdGxlLWlkXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZF9faW1hZ2UtbW9kYWxcIik7XG4gICAgdGhpcy5fY2FyZEltYWdlLnNyYyA9IHRoaXMuX2xpbms7XG4gICAgdGhpcy5fY2FyZEltYWdlLmFsdCA9IHRoaXMuX25hbWU7XG4gICAgdGhpcy5fY2FyZENhcHRpb24udGV4dENvbnRlbnQgPSB0aGlzLl9uYW1lO1xuICAgIC8vZ2V0IHRoZSBjYXJkIHZpZXdcbiAgICAvL3NldCBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHsgZm9ybUVsLCBjb25maWcgfSkge1xuICAgIHRoaXMuX2Zvcm1FbCA9IGZvcm1FbDtcbiAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gY29uZmlnLmlucHV0U2VsZWN0b3I7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3I7XG4gICAgdGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyA9IGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xuICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IGNvbmZpZy5pbnB1dEVycm9yQ2xhc3M7XG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IGNvbmZpZy5lcnJvckNsYXNzO1xuICAgIHRoaXMuX2Zvcm1TZWxlY3RvciA9IGNvbmZpZy5mb3JtU2VsZWN0b3I7XG4gIH1cblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWwuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5hZGQodGhpcy5fZXJyb3JDbGFzcyk7XG4gIH1cblxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWwuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3JDbGFzcyk7XG4gIH1cblxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpIHtcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9XG4gICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gIH1cblxuICBfaGFzSW52YWxpZElucHV0KCkge1xuICAgIHJldHVybiAhdGhpcy5faW5wdXRFbHMuZXZlcnkoKGlucHV0RWwpID0+IGlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xuICB9XG5cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoKSkge1xuICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKCk7ICAvLyBkaXNhYmxlIGlmIHRoZSBmb3JtIGlzIGludmFsaWRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7ICAvLyBlbmFibGUgdGhlIGJ1dHRvbiB1c2luZyB0aGUgc3R5bGVzXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTsgIC8vIGVuYWJsZSB0aGUgYnV0dG9uIHVzaW5nIHRoZSBgZGlzYWJsZWQgYCBhdHRyaWJ1dGVcbiAgICB9XG4gIH1cbiAgXG4gIGRpc2FibGVCdXR0b24oKSB7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIF9zZXRFdmVudGxpc3RlbmVycygpIHtcbiAgICB0aGlzLl9pbnB1dEVscyA9IFsuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKV07XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudGxpc3RlbmVycygpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XG4gICAgdGhpcy5fcG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZSAoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsX19jbG9zZVwiKSB8fFxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCx9KSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xuICAgIHRoaXMuX3BvcHVwRm9ybSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19pbnB1dFwiKTtcbiAgICB0aGlzLl9mb3JtVmFsdWVzID0ge307XG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICB0aGlzLl9mb3JtVmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5fZm9ybVZhbHVlcztcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICB0aGlzLl9wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xuICAgICAgdGhpcy5fcG9wdXBGb3JtLnJlc2V0KCk7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsSW1nID1cbiAgICAgIHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24gPVxuICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XG4gIH1cblxuICBvcGVuKGRhdGEpIHtcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2VNb2RhbEltZy5zcmMgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fcHJldmlld0ltYWdlTW9kYWxJbWcuYWx0ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX3ByZXZpZXdJbWFnZU1vZGFsQ2FwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBzZWxlY3Rvcikge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gIH1cblxuICByZW5kZXJJdGVtcygpIHtcbiAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB0aGlzLl9yZW5kZXJlcihpdGVtKSk7XG4gIH1cblxuICBhZGRJdGVtcyhpdGVtKSB7XG4gICAgdGhpcy5fZWxlbWVudC5wcmVwZW5kKGl0ZW0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgcHJvZmlsZVRpdGxlLCBwcm9maWxlRGVzY3JpcHRpb24gfSkge1xuICAgIHRoaXMuX3Byb2ZpbGVUaXRsZSA9IHByb2ZpbGVUaXRsZTtcbiAgICB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24gPSBwcm9maWxlRGVzY3JpcHRpb247XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvZmlsZVRpdGxlOiB0aGlzLl9wcm9maWxlVGl0bGUudGV4dENvbnRlbnQsXG4gICAgICBwcm9maWxlRGVzY3JpcHRpb246IHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCxcbiAgICB9O1xuICB9XG5cbiAgc2V0VXNlckluZm8ocHJvZmlsZVRpdGxlSW5wdXQsIHByb2ZpbGVEZXNjcmlwdGlvbklucHV0KSB7XG4gICAgdGhpcy5fcHJvZmlsZVRpdGxlLnRleHRDb250ZW50ID0gcHJvZmlsZVRpdGxlSW5wdXQ7XG4gICAgdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcHJvZmlsZURlc2NyaXB0aW9uSW5wdXQ7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIllvc2VtaXRlIFZhbGxleVwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC95b3NlbWl0ZS5qcGdcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTGFrZSBMb3Vpc2VcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGFrZS1sb3Vpc2UuanBnXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkJhbGQgTW91bnRhaW5zXCIsXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2JhbGQtbW91bnRhaW5zLmpwZ1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJMYXRlbWFyXCIsXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xhdGVtYXIuanBnXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC92YW5vaXNlLmpwZ1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYWdvLmpwZ1wiLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgY2FyZFNlY3Rpb246IFwiLmNhcmRzX19saXN0XCIsXG4gIGNhcmRUZW1wbGF0ZTogXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICBwcmV2aWV3SW1hZ2VNb2RhbDogXCIjcHJldmlldy1pbWFnZS1tb2RhbFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fYnV0dG9uX2Rpc2FibGVkXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvcl92aXNpYmxlXCIsXG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG4vL2ltcG9ydCBhbGwgdGhlIGNsYXNzZXNcbmltcG9ydCB7IGluaXRpYWxDYXJkcywgc2VsZWN0b3JzLCBjb25maWcgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkXCI7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uXCI7XG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2VcIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mb1wiO1xuXG4vL0NyZWF0ZSBpbnN0YW5jZXMgb2YgdGhlIGNsYXNzZXNcbmNvbnN0IGNyZWF0ZUNhcmQgPSAoZGF0YSkgPT4ge1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoZGF0YSwgXCIjY2FyZC10ZW1wbGF0ZVwiLCAoKSA9PiB7XG4gICAgY2FyZFByZXZpZXdQb3B1cC5vcGVuKGRhdGEpO1xuICB9KTtcbiAgcmV0dXJuIGNhcmQuZ2V0VmlldygpO1xufTtcbmNvbnN0IGNhcmRQcmV2aWV3UG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2Uoc2VsZWN0b3JzLnByZXZpZXdJbWFnZU1vZGFsKTtcbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZERhdGEpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKGNhcmREYXRhKTtcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbXMoY2FyZEVsZW1lbnQpO1xufVxuY29uc3QgY2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIGl0ZW1zOiBpbml0aWFsQ2FyZHMsXG4gICAgcmVuZGVyZXI6IHJlbmRlckNhcmQsXG4gIH0sXG4gIHNlbGVjdG9ycy5jYXJkU2VjdGlvblxuKTtcblxuLy8gaW5pdGlhbGl6ZSBhbGwgbXkgaW5zdGFuY2VzXG5jYXJkU2VjdGlvbi5yZW5kZXJJdGVtcygpO1xuY2FyZFByZXZpZXdQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuLy9hbGwgdGhlIHJlc3RcblxuLyoqRWxlbWVudHMgKi9cbmNvbnN0IHByb2ZpbGVFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWVkaXQtYnV0dG9uXCIpO1xuY29uc3QgcHJvZmlsZUVkaXRNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjcHJvZmlsZS1lZGl0LW1vZGFsXCIsXG4gIGhhbmRsZUZvcm1TdWJtaXQ6IGhhbmRsZVByb2ZpbGVFZGl0U3VibWl0LFxufSk7XG5wcm9maWxlRWRpdE1vZGFsLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZE5ld0NhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtYWRkLWJ1dHRvblwiKTtcbmNvbnN0IGFkZENhcmRNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHtcbiAgcG9wdXBTZWxlY3RvcjogXCIjYWRkLWNhcmQtbW9kYWxcIixcbiAgaGFuZGxlRm9ybVN1Ym1pdDogaGFuZGxlQWRkQ2FyZEZvcm1TdWJtaXQsXG59KTtcbmFkZE5ld0NhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkQ2FyZE1vZGFsLm9wZW4oKTtcbn0pO1xuXG5hZGRDYXJkTW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgcHJvZmlsZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlLW5hbWVcIik7XG5jb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZGVzY3JpcHRpb24tdGl0bGVcIik7XG5jb25zdCBwcm9maWxlVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZS1pbnB1dFwiKTtcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi1pbnB1dFwiXG4pO1xuY29uc3QgcHJvZmlsZUVkaXRGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJlZGl0LXByb2ZpbGUtbW9kYWxfX2Zvcm1cIl07XG5jb25zdCBhZGRDYXJkRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5mb3Jtc1tcImFkZC1jYXJkLW1vZGFsX19mb3JtXCJdO1xuY29uc3QgY2FyZGxpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYXJkLWxpc3QtaWRcIik7XG5cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgcHJvZmlsZVRpdGxlLFxuICBwcm9maWxlRGVzY3JpcHRpb24sXG59KTtcblxuLyoqRXZlbnQgSGFuZGxlcnMgKi9cbmZ1bmN0aW9uIGhhbmRsZVByb2ZpbGVFZGl0U3VibWl0KGRhdGEpIHtcbiAgdXNlckluZm8uc2V0VXNlckluZm8oZGF0YS5OYW1lLCBkYXRhLkRlc2NyaXB0aW9uKTtcbiAgcHJvZmlsZUVkaXRNb2RhbC5jbG9zZSgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVBZGRDYXJkRm9ybVN1Ym1pdChjYXJkRGF0YSkge1xuICBjb25zb2xlLmxvZyhjYXJkRGF0YSk7XG4gIHJlbmRlckNhcmQoY2FyZERhdGEsIGNhcmRsaXN0RWwpO1xuICBhZGRDYXJkTW9kYWwuY2xvc2UoKTtcbiAgYWRkQ2FyZFZhbGlkYXRvci5kaXNhYmxlQnV0dG9uKCk7XG59XG5cbi8qKkV2ZW50IExpc3RlbmVycyAqL1xuXG5wcm9maWxlRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50VXNlckluZm8gPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xuICBwcm9maWxlVGl0bGVJbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VySW5mby5wcm9maWxlVGl0bGU7XG4gIHByb2ZpbGVEZXNjcmlwdGlvbklucHV0LnZhbHVlID0gY3VycmVudFVzZXJJbmZvLnByb2ZpbGVEZXNjcmlwdGlvbjtcbiAgcHJvZmlsZUVkaXRNb2RhbC5vcGVuKCk7XG59KTtcblxuY29uc3QgYWRkQ2FyZFZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHtcbiAgZm9ybUVsOiBhZGRDYXJkRm9ybUVsZW1lbnQsXG4gIGNvbmZpZzogY29uZmlnLFxufSk7XG5hZGRDYXJkVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcblxuY29uc3QgcHJvZmlsZUVkaXRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih7XG4gIGZvcm1FbDogcHJvZmlsZUVkaXRGb3JtLFxuICBjb25maWc6IGNvbmZpZyxcbn0pO1xucHJvZmlsZUVkaXRWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuXG4iXSwibmFtZXMiOlsiQ2FyZCIsImNvbnN0cnVjdG9yIiwiX3JlZiIsImNhcmRTZWxlY3RvciIsImhhbmRsZUltYWdlQ2xpY2siLCJuYW1lIiwibGluayIsIl9uYW1lIiwiX2xpbmsiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJfc2V0RXZlbnRsaXN0ZW5lcnMiLCJfY2FyZEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9oYW5kbGVMaWtlSWNvbiIsIl9oYW5kbGVUcmFzaEljb24iLCJfY2FyZEltYWdlIiwidGV4dCIsIl90ZXh0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicmVtb3ZlIiwiZ2V0VmlldyIsImRvY3VtZW50IiwiY29udGVudCIsImNsb25lTm9kZSIsIl9jYXJkQ2FwdGlvbiIsInNyYyIsImFsdCIsInRleHRDb250ZW50IiwiRm9ybVZhbGlkYXRvciIsImZvcm1FbCIsImNvbmZpZyIsIl9mb3JtRWwiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbCIsIl9lcnJvck1lc3NhZ2VFbCIsImlkIiwiYWRkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfaW5wdXRFbHMiLCJldmVyeSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImRpc2FibGVCdXR0b24iLCJfc3VibWl0QnV0dG9uIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlIiwiZW5hYmxlVmFsaWRhdGlvbiIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwib3BlbiIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhGb3JtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9wb3B1cEZvcm0iLCJfaGFuZGxlRm9ybVN1Ym1pdCIsIl9nZXRJbnB1dFZhbHVlcyIsIl9pbnB1dExpc3QiLCJfZm9ybVZhbHVlcyIsImlucHV0IiwidmFsdWUiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9wcmV2aWV3SW1hZ2VNb2RhbEltZyIsIl9wcmV2aWV3SW1hZ2VNb2RhbENhcHRpb24iLCJkYXRhIiwiU2VjdGlvbiIsInNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9yZW5kZXJlciIsIl9lbGVtZW50IiwiX2l0ZW1zIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiYWRkSXRlbXMiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJwcm9maWxlVGl0bGUiLCJwcm9maWxlRGVzY3JpcHRpb24iLCJfcHJvZmlsZVRpdGxlIiwiX3Byb2ZpbGVEZXNjcmlwdGlvbiIsImdldFVzZXJJbmZvIiwic2V0VXNlckluZm8iLCJwcm9maWxlVGl0bGVJbnB1dCIsInByb2ZpbGVEZXNjcmlwdGlvbklucHV0IiwiaW5pdGlhbENhcmRzIiwic2VsZWN0b3JzIiwiY2FyZFNlY3Rpb24iLCJjYXJkVGVtcGxhdGUiLCJwcmV2aWV3SW1hZ2VNb2RhbCIsImNyZWF0ZUNhcmQiLCJjYXJkIiwiY2FyZFByZXZpZXdQb3B1cCIsInJlbmRlckNhcmQiLCJjYXJkRGF0YSIsImNhcmRFbGVtZW50IiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlRWRpdE1vZGFsIiwiaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQiLCJhZGROZXdDYXJkQnV0dG9uIiwiYWRkQ2FyZE1vZGFsIiwiaGFuZGxlQWRkQ2FyZEZvcm1TdWJtaXQiLCJwcm9maWxlRWRpdEZvcm0iLCJmb3JtcyIsImFkZENhcmRGb3JtRWxlbWVudCIsImNhcmRsaXN0RWwiLCJ1c2VySW5mbyIsIk5hbWUiLCJEZXNjcmlwdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJhZGRDYXJkVmFsaWRhdG9yIiwiY3VycmVudFVzZXJJbmZvIiwicHJvZmlsZUVkaXRWYWxpZGF0b3IiXSwic291cmNlUm9vdCI6IiJ9