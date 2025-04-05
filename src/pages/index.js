import "./index.css";

//import all the classes
import { selectors, config } from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../pages/Api";

//Create instances of the classes


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d78649ed-fd14-41f7-9a2b-04c3fb13cc28",
    "content-type": "application/json"
  }
});




const cardSection = new Section(
  {
    renderer: (data) => {cardSection.addItems(createCard(data))},
  },
  selectors.cardSection,

);

const createCard = (data) => {
  const card = new Card(data, "#card-template", () => {
    cardPreviewPopup.open(data);
  },

  (card) => {
    ("click", () => {
      card.handleDelete.open();
    
  },
  
       
  (card) => {
const id = card.getId();
api.likeCard(id).then(res => {
  card.handlelike();
},
)})});

  return card.getView();
}

const cardPreviewPopup = new PopupWithImage(selectors.previewImageModal);
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItems(cardElement);
  
}
    // initialize all my instances

    cardPreviewPopup.setEventListeners();
  

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
  handleFormSubmit: (data) =>
{ 
  api.addCardModal(data)
  .then((res) => {
    cardSection.addItems(createCard(res));
    this.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    // change button
  })


}});



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

const userInfo = new UserInfo({
  profileTitle,
  profileDescription,
});


const avatarModal = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: (inputValues) => {
    api.avatarModal(inputValues)
  .then((res) => {
    
  })
  .then(res => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
})
   .catch((err) => {
     console.error(err);
   })
}})

avatarModal.setEventListeners();


/**Event Handlers */
function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data.Name, data.Description);
  profileEditModal.close();
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

api.fetchInitialData()
.then(([userData, cardsData]) => {
  console.log("hey");
 userInfo.setUserInfo(userData.name, userData.about)
  cardSection.renderItems(cardsData);
})
.catch(err => {
  console.error(err);
});
















 






  


 


  


 