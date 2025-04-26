import "./index.css";

//import all the classes
import { selectors, config } from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
import PopupWithConfirm from "../components/PopupWithConfirm";
//Create instances of the classes

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d78649ed-fd14-41f7-9a2b-04c3fb13cc28",
    "content-type": "application/json",
  },
});

const cardSection = new Section(
  {
    renderer: (data) => {
      cardSection.addItems(createCard(data));
    },
  },
  selectors.cardSection
);

const createCard = (data) => {
  const card = new Card(
    data,
    "#card-template",
    () => {
      cardPreviewPopup.open(data);
    },
    function handleCardDelete(card) {
      confirmDeletePopup.open();
      confirmDeletePopup.setSubmitAction(() => {
        confirmDeletePopup.setLoading(true, "Saving");
        api
          .removeCard(card.getId())
          .then(() => {
            card._handleTrashIcon();
            confirmDeletePopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            confirmDeletePopup.setLoading(false, "Saving");
          });
      });
    },
    (card) => {
      const id = card.getId();
      if (card.isLiked()) {
        console.log("disliking");
        api.dislikeCard(id).then((res) => {
          card.updateLikesView();
        });
      } else {
        console.log("liking");
        api.likeCard(id).then((res) => {
          card.updateLikesView();
        });
      }
    })
  
  return card.getView();
};

const cardPreviewPopup = new PopupWithImage(selectors.previewImageModal);
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItems(cardElement);
}

const confirmDeletePopup = new PopupWithConfirm({
  popupSelector: "#delete-card-modal",
});
confirmDeletePopup.setEventListeners();

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
  handleFormSubmit: (data) => {
    addCardModal.setLoading(true, "Saving...");
    api
      .addCardModal(data)
      .then((res) => {
        cardSection.addItems(createCard(res));
        addCardValidator.disableButton();
        addCardFormElement.reset();
        addCardModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardModal.setLoading(false, "Saving...");
      });
  },
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
const profileAvatar = document.querySelector("#profile-image-id");
const profileEditForm = document.forms["edit-profile-modal__form"];
const addCardFormElement = document.forms["add-card-modal__form"];
const avatarModalForm = document.forms["edit-avatar-modal__form"];

const userInfo = new UserInfo({
  profileTitle,
  profileDescription,
  profileAvatar,
});

const avatarModal = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: (inputValue) => {
    console.log(inputValue);
    avatarModal.setLoading(true, "Saving");
    api
      .avatarModal(inputValue)
      .then((info) => {
        userInfo.setUserInfo(info);
      })
      // .then((res) => {
      //   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      // })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        avatarModal.setLoading(false, "Saving");
      });
  },
});

const avatarEditButton = document.querySelector("#edit-avatar-button");
avatarEditButton.addEventListener("click", () => {
  avatarModal.open();
});
avatarModal.setEventListeners();

/**Event Handlers */
function handleProfileEditSubmit(data) {
  profileEditModal.setLoading(true, "Saving...");
  api
    .editprofileInfo({ name: data.Name, about: data.Description })
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
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
api
  .fetchInitialData()
  .then(([userData, cardsData]) => {
    console.log("hey");
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cardsData);
  })
  .catch((err) => {
    console.error(err);
  });

const avatarModalValidator = new FormValidator({
  formEl: avatarModalForm,
  config: config,
});
avatarModalValidator.enableValidation();
