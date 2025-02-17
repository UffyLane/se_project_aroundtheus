import "./index.css";

//import all the classes
import { initialCards, selectors } from "../components/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

//Create instances of the classes
const CardPreviewPopup = new PopupWithImage(selectors.previewImageModal);
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  CardSection.addItems(cardElement);
}
const CardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  selectors.cardSection
);

// initialize all my instances
CardSection.renderItems(initialCards);
CardPreviewPopup.setEventListeners();
//all the rest

/**Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeButtons = document.querySelectorAll(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: () => {},
});
addCardModal.setEventListeners();
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  addCardModal.open();
});
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["edit-profile"];
const addCardFormElement = document.forms["add-card"];
const cardlistEl = document.querySelector(".cards__list");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const profileUrlInput = addCardFormElement.querySelector(
  ".modal__input_type_url"
);
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalImg = previewImageModal.querySelector(".modal__image");
const previewImageModalCaption =
  previewImageModal.querySelector(".modal__caption");

/**Functions */
function openModal(modal) {
  openModal.classList.add("modal_opened");
  document.addEventListener("keydown", this._handleEscClose);
  document.addEventListener("mousedown", closeModalByOverlay);
}
function closeModal(modal) {
  closeModal.classList.remove("modal_opened");
  document.removeEventListener("keydown", this._handleEscClose);
  document.removeEventListener("mousedown", closeModalByOverlay);
}

function closeModalByOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

// on index.js
function handleImageClick(name, link) {
  previewImageModalImg.src = link;
  previewImageModalImg.alt = name;
  previewImageModalCaption.textContent = name;
  openModal(previewImageModal);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

/**Event Handlers */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = profileUrlInput.value;
  renderCard({ name, link }, cardlistEl);
  closeModal(addCardModal);
  e.target.reset();
  addCardValidator.resetValidation(); // Resets validation and disables the button
}

/**Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardValidator = new FormValidator({
  formEl: addCardFormElement,
  config: config,
});
addCardValidator.enableValidation();

const profileEditValidator = new FormValidator({
  formEl: profileEditForm,
  config: config,
});
profileEditValidator.enableValidation();
