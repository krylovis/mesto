import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({selector, handleFormSubmit}) {
    super(selector);
    this._formData = {};
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitBtn = this._popup.querySelector('.popup__submit-button');
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmitBind = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    this._inputList.forEach(input => this._formData[input.name] = input.value);
    return this._formData;
  };

  close() {
    super.close();
    this._popupForm.reset();
  };

  _handleSubmit(event) {
    event.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmitBind);
  };
}