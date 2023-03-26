export default class UserInfo {
  constructor({ name, job}) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._userData = {};
  }

  getUserInfo() {
    this._userData.name = this._name.textContent;
    this._userData.job = this._job.textContent;
    return this._userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.userName;
    this._job.textContent = data.job;
  }
}