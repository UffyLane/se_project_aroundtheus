import "./index.css";

//import all the classes
import { initialCards, selectors } from "../src/components/constants";
import Card from "../src/components/Card";
import FormValidator from "../src/components/FormValidator";
import Section from "../src/components/Section";
import PopupWithImage from "../src/components/PopupWithImage";
import PopupWithForm from "../src/components/PopupWithForm";
import UserInfo from "../src/components/UserInfo";

//Create instances of the classes
const createCard = (data) => {
  const card = new Card(data, "#card-template", () => {
    cardPreviewPopup.open(data);
  });
  return card.getView();
};
const cardPreviewPopup = new PopupWithImage(selectors.previewImageModal);
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItems(cardElement);
}
const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  selectors.cardSection
);

// initialize all my instances
cardPreviewPopup.setEventListeners();
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
  handleFormSubmit: handleAddCardFormSubmit,
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


const userInfo = new UserInfo({
  profileTitle, profileDescription
});

/**Event Handlers */
function handleProfileEditSubmit(e) {
  e.preventDefault();
 userInfo.setUserInfo(profileTitleInput.value, profileDescriptionInput.value);
  profileEditModal.close();
}

function handleAddCardFormSubmit(cardData) {
  console.log(cardData);
  renderCard(cardData, cardlistEl);
  addCardModal.close();
  addCardValidator.resetValidation(); // Resets validation and disables the button
}

/**Event Listeners */

profileEditButton.addEventListener("click", () => {
  userInfo.setUserInfo(profileTitleInput.value, profileDescriptionInput.value);
  profileEditModal.open();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditModalCloseButton.addEventListener("click", () => {
  userInfo.getUserInfo(profileTitleInput.value, profileDescriptionInput.value);
  profileEditModal.close();
});


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
