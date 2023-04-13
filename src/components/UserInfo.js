export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
    this._userData = {};
  }

  getUserInfo() {
    this._userData.name = this._name.textContent;
    this._userData.job = this._job.textContent;
    return this._userData;
  }

  setUserInfo(data) {
    const { name, about, avatar, _id } = data;
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }

  getUserID() {
    return this._id;
  }
}