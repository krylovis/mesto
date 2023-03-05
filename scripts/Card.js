const popupPlacePhoto = document.querySelector('.popup_type_place-photo');
const popupPhoto = document.querySelector('.popup__photo');
const popupFigcaption = document.querySelector('.popup__figcaption');
const popupCloseButton = document.querySelector('.popup_type_place-photo .popup__close-button');

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.alt = this._name;
    this._elementImage.src = this._image;

    return this._element;
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.element__like');
    this._elementImage.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._elementLike.addEventListener('click', () => {
      this._handleButtonLikeClick();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleButtonLikeDelete();
    });

    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }

  _closeByEscape = (event) => {
    if (event.key === 'Escape') {
      this._handleClosePopup();
    };
  };

  _handleOpenPopup() {
    popupPhoto.src = this._image;
    popupPhoto.alt = this._name;
    popupFigcaption.textContent = this._name;
    popupPlacePhoto.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  }

  _handleClosePopup() {
    popupPhoto.src = '';
    popupPhoto.alt = '';
    popupFigcaption.textContent = '';
    popupPlacePhoto.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
  }

  _handleButtonLikeClick() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _handleButtonLikeDelete() {
    this._element.remove();
  }
}