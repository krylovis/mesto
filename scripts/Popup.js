export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeByEscape = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) this.close();
      if (evt.target.classList.contains('popup__close-button')) this.close();
    })
  }
}