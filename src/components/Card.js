export default class Card {
  constructor(data, templateSelector, handleCardClick, handleButtonLikeClick, handleButtonDelete, userID) {
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._cardID = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleButtonLikeClick = handleButtonLikeClick;
    this._handleButtonDelete = handleButtonDelete;
    this._userID = userID;
    this._isOwner = this._userID === data.owner._id;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementTitle = this._element.querySelector('.element__title');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementCounter = this._element.querySelector('.element__counter');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementCounter = this._element.querySelector('.element__counter');
    this._elementTrash = this._element.querySelector('.element__trash');

    if(!this._isOwner) {
      this._elementTrash.remove();
      this._elementTrash = null;
    };

    this._setEventListeners();

    this._elementTitle.textContent = this._name;
    this._elementImage.alt = this._name;
    this._elementImage.src = this._image;
    this._elementCounter.textContent = this._likes.length;

    return this._element;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleButtonLikeClick();
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._image);
    });

    if(this._isOwner) {
      this._elementTrash.addEventListener('click', () => {
        this._handleButtonDelete();
      });
    };
  };

  togglelike() {
    this._elementLike.classList.toggle('element__like_active');
  };

  updateCounter(data) {
    this._elementCounter.textContent = data.length;
  };
}