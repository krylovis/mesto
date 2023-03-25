import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  }

  open(name, image) {
    this._popupPhoto.src = image;
    this._popupPhoto.alt = name;
    this._popupFigcaption.textContent = name;
    super.open();
  };
}