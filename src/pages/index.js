import "./index.css";

//import all the classes
import { initialCards, selectors, config } from "../../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

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
cardSection.renderItems();
cardPreviewPopup.setEventListeners();
//all the rest

/**Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
profileEditModal.setEventListeners();

const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
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
  profileTitle,
  profileDescription,
});

/**Event Handlers */
function handleProfileEditSubmit() {
  userInfo.setUserInfo(data.Name, data.Description);
  profileEditModal.close();
}

function handleAddCardFormSubmit(cardData) {
  console.log(cardData);
  renderCard(cardData, cardlistEl);
  addCardModal.close();
  addCardValidator.disableButton;
}

/**Event Listeners */

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.profileTitle;
  profileDescriptionInput.value = currentUserInfo.profileDescription;
  profileEditModal.open();
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
