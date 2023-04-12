import './index.css';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteConfirmation from '../components/PopupWithDeleteConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const profileEditAvatarButton = document.querySelector('.profile__edit-avatar-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const inputName = document.querySelector('#inputName');
const inputJob = document.querySelector('#inputJob');

const formSelectors = {
  label: '.popup__label',
  input: '.popup__input',
  inputTypeError: '.popup__input_type_error',
  inputError: '.popup__input-error',
  inputErrorActive: 'popup__input-error_active',
  submitBtn: '.popup__submit-button',
  submitBtnInactive: 'popup__submit-button_inactive',
};

// UserInfo
const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__subtitle',
  avatar: '.profile__avatar',
});

// Api
const token = '14893dca-a279-433c-a27c-967896487d71';
const cohort = 'cohort-63';
const baseUrl = `https://mesto.nomoreparties.co/v1/${cohort}`;
const headers = {
  authorization: token,
  'Content-Type': 'application/json'
};

const api = new Api({
  baseUrl: baseUrl,
  headers: headers
});

api.getData().then((res) => {
  const [user, cards] = res;
  userInfo.setUserInfo(user);
  cardList.renderItems(cards);
}).catch(err => console.log(err));

// Popup с фотографией
const popupWithImage = new PopupWithImage('.popup_type_place-photo');
popupWithImage.setEventListeners();

function handleCardClick(name, image) {
  popupWithImage.open(name, image);
};

// Валидация форм
const formValidators = {};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formSelectors, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formSelectors);

// Popup редактирования аватара
const popupEditAvatar = new PopupWithForm({
  selector: '.popup_type_new-avatar',
  handleFormSubmit: (formData) => {
    popupEditAvatar.renderLoading(true);
    const { link } = formData;
    api.editAvatar({ avatar: link })
    .then(res => userInfo.setUserAvatar({ avatar: res.avatar }))
    .catch(err => console.log(err))
    .finally(() => popupEditAvatar.renderLoading(false));
    popupEditAvatar.close();
  }
});
popupEditAvatar.setEventListeners();

function openEditAvatar() {
  formValidators['newAvatarForm'].resetValidation();
  popupEditAvatar.open();
};

profileEditAvatarButton.addEventListener('click', openEditAvatar);

// Popup профиля
const popupUserInfo = new PopupWithForm({
  selector: '.popup_type_profile-form',
  handleFormSubmit: (formData) => {
    const { userName, job} = formData;
    api.editUserInfo({ name: userName, about: job})
    .then(res => userInfo.editUserInfo({ name: res.name, about: res.about}))
    .catch(err => console.log(err));
    popupUserInfo.close();
  }
});
popupUserInfo.setEventListeners();

function openProfilePopup() {
  formValidators['profileForm'].resetValidation();
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputJob.value = data.job;
  popupUserInfo.open();
};

profileEditButton.addEventListener('click', openProfilePopup);

// Создать карточку
function handleButtonLikeClick() {
  if(!this.isMyLike) {
    api.addLike(this.getCardID())
    .then(data => {
      this.addlikeActive();
      this.updateCounter(data);
    })
    .catch(err => console.log(err));
  } else {
    api.removeLike(this.getCardID())
    .then(data => {
      this.removelikeActive();
      this.updateCounter(data);
    })
    .catch(err => console.log(err));
  }
};

// Popup подтверждение удаления
const popupDeleteConfirmation = new PopupWithDeleteConfirmation({
  selector: '.popup_type_delete-confirmation',
});
popupDeleteConfirmation.setEventListeners();

function handleButtonDelete() {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.udateSubmit(() => {
    api.deleteCard(this.getCardID())
    .then(this._element.remove())
    .then(popupDeleteConfirmation.close())
    .catch(err => console.log(err));
  });
};

const createCard = (data, template) => {
  const card = new Card(data, template, handleCardClick, handleButtonLikeClick, handleButtonDelete, userInfo.getUserID());
  const cardElement = card.generateCard();
  return cardElement;
};

// Создать секцию с карточками
const cardList = new Section({ renderer: (item) => {
  const card = createCard(item, '#element-template');
  cardList.setItemAppend(card);
} }, '.elements');

// Popup новое место
const popupAddCard = new PopupWithForm({
  selector: '.popup_type_new-place',
  handleFormSubmit: (formData) => {
    popupAddCard.renderLoading(true);
    api.addCard(formData)
    .then(res => cardList.setItemPrepend(createCard(res, '#element-template')))
    .catch(err => console.log(err))
    .finally(() => popupAddCard.renderLoading(false));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

function openAddCardPopup() {
  formValidators['newPlaceForm'].resetValidation();
  popupAddCard.open();
};

profileAddButton.addEventListener('click', openAddCardPopup);
