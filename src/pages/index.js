import "./index.css";

//import all the classes
import { initialCards, selectors, config } from "../utils/constants";
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

const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

addCardModal.setEventListeners();

const profileTitle = document.querySelector("#profile-title-name");
const profileDescription = document.querySelector("#profile-description-title");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["edit-profile-modal__form"];
const addCardFormElement = document.forms["add-card-modal__form"];
const cardlistEl = document.querySelector("card-list-id");

const userInfo = new UserInfo({
  profileTitle,
  profileDescription,
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

fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
  method: "GET",
  headers: {
    authorization: "d78649ed-fd14-41f7-9a2b-04c3fb13cc28"
  }
})
  .then(res => res.json())
  .then((result) => {
    document.getElementById("profile-title-name").textContent = result.name;
    document.getElementById("profile-description-title").textContent = result.about;
    document.getElementById("profile-image-id").src = result.avatar;
  })

  .catch((err) => {
    console.error(err); 
  })
  .finally(()=>{

  });

  fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  method: "GET",
  headers: {
    authorization: "d78649ed-fd14-41f7-9a2b-04c3fb13cc28", "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Jacques Cousteau ",
    about: "Explorer"
  })

  .then(res => res.json())
  .then((result) => {
    document.getElementById("card-title-id").textContent = result.name;
    document.getElementById("card__image-modal").textContent = result.link;
    document.getElementById("card-template").src = result._id;
  })

  .catch((err) => {
    console.error(err); 
  })
  .finally(()=>{
})

});

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  method: "POST",
  headers: {
    authorization: "d78649ed-fd14-41f7-9a2b-04c3fb13cc28", "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
  })

  .then(res => res.json())
  .then((result) => {
    document.getElementById("card-title-id").textContent = result.name;
    document.getElementById("card__image-modal").textContent = result.link;
    document.getElementById("card-id").src = result._id;
  })

  .catch((err) => {
    console.error(err); 
  })
  .finally(()=>{
})

});



  


 


  


 