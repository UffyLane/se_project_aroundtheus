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

  setUserInfo(data) {
    if (data.name) this._profileTitle.textContent = data.name;
    if (data.about) this._profileDescription.textContent = data.about;
    if (data.avatar) this._profileAvatar.src = data.avatar;
  }
}
