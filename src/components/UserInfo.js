export default class UserInfo {
  constructor({ profileTitle, profileDescription, profileAvatar }) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    return {
      profileTitle: this._profileTitle.textContent,
      profileDescription: this._profileDescription.textContent,
      profileAvatar: this._profileAvatar.textContent
    };
  }

  setUserInfo(profileTitleInput, profileDescriptionInput) {
    this._profileTitle.textContent = profileTitleInput;
    this._profileDescription.textContent = profileDescriptionInput;
  }
}
