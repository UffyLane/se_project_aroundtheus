export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    getUserInfo();
    this._profileTitle.textContent = profileTitleInput.value;
    this._profileDescription.textContent = profileDescriptionInput.value;
  }

  setUserInfo() {}
}
