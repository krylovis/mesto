export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLike = this._element.querySelector('.element__like');
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.alt = this._name;
    this._elementImage.src = this._image;

    return this._element;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleButtonLikeClick();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleButtonLikeDelete();
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._image)
    });
  };

  _handleButtonLikeClick() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _handleButtonLikeDelete() {
    this._element.remove();
    this._element = null;
  }
}