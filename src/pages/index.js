import "./index.css";

//import all the classes
import { initialCards, selectors } from "../components/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

//Create instances of the classes
const createCard = (data) => {
  const card = new Card(data, "#card-template", () => {
    CardPreviewPopup.open(data);
  });
  return card.getView();
};
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
const profileEditModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: () => {},
});
profileEditModal.setEventListeners();

const profileEditModalCloseButton = document.querySelector(
  "#modal-close-button"
);

const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: () => {},
});
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

addCardModalCloseButton.addEventListener("click", () => {
  addCardModal.close();
});

addCardModal.setEventListeners();

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

/**Event Handlers */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditModal.close();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = profileUrlInput.value;
  renderCard({ name, link }, cardlistEl);
  addCardModal.close();
  e.target.reset();
  addCardValidator.resetValidation(); // Resets validation and disables the button
}

/**Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.open();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditModalCloseButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.close();
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
