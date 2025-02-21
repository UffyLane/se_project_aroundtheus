export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    return {
      profileTitle: this._profileTitle.textContent,
      profileDescription: this._profileDescription.textContent,
    };
  }

  setUserInfo(profileTitleInput, profileDescriptionInput) {
    this._profileTitle.textContent = profileTitleInput;
    this._profileDescription.textContent = profileDescriptionInput;
  }
}
