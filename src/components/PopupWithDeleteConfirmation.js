import Popup from './Popup.js';

export default class PopupWithDeleteConfirmation extends Popup {
  constructor({selector}) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  udateSubmit(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', event => {
      event.preventDefault();
      this._handleSubmit();
    });
  };
}