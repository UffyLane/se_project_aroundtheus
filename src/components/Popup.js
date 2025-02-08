export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._modal.classList.add("modal_opened");
    this._document.addEventListener("keydown", closeModalOnEsc);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    this._document.removeEventListener("keydown", closeModalOnEsc);
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
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
  }
}
