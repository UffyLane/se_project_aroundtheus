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
      profileAvatar: this._profileAvatar.src,
    };
  }

  setUserInfo(name, about, avatar) {
    if (name) this._profileTitle.textContent = name;
    if (about) this._profileDescription.textContent = about;
    if (avatar) this._profileAvatar.src = avatar;
  }
}
