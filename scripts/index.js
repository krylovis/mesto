import { initialCards } from './initialCards.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const popupList = document.querySelectorAll('.popup');
const popupProfileForm = document.querySelector('.popup_type_profile-form');
const popupNewPlaceForm = document.querySelector('.popup_type_new-place');

const popupPlacePhoto = document.querySelector('.popup_type_place-photo');
const popupPhoto = document.querySelector('.popup__photo');
const popupFigcaption = document.querySelector('.popup__figcaption');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileName = document.querySelector('.profile__name');

const profileForm = document.querySelector('form[name="profileForm"]');
const inputName = document.querySelector('#inputName');
const inputJob = document.querySelector('#inputJob');

const newPlaceForm = document.querySelector('form[name="newPlaceForm"]');
const inputPlaceName = document.querySelector('#inputPlaceName');
const inputPlaceLink = document.querySelector('#inputPlaceLink');

const formSelectors = {
  label: '.popup__label',
  input: '.popup__input',
  inputTypeError: '.popup__input_type_error',
  inputError: '.popup__input-error',
  inputErrorActive: 'popup__input-error_active',
  submitBtn: '.popup__submit-button',
  submitBtnInactive: 'popup__submit-button_inactive',
};

// Popup с фотографией

function handleCardClick(name, image) {
  const popupWithImage = new PopupWithImage('.popup_type_place-photo');
  popupWithImage.open(name, image);
  popupWithImage.setEventListeners();
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

// Popup профиля

const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__subtitle',
});

const popupUserInfo = new PopupWithForm({
  selector: '.popup_type_profile-form',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    popupUserInfo.close();
  }
});

profileEditButton.addEventListener('click', () => {
  formValidators['profileForm'].resetValidation();
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputJob.value = data.job;
  popupUserInfo.open();
  popupUserInfo.setEventListeners();
});

// Создать карточку
const createCard = (data, template) => {
  const card = new Card(data, template, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

// Создать секцию с карточками
const cardList = new Section({ items: initialCards, renderer: (item) => {
  const card = createCard(item, '#element-template');
  cardList.setItem(card);
} }, '.elements');

cardList.renderItems();

// Popup новое место
profileAddButton.addEventListener('click', () => {
  newPlaceForm.reset();
  formValidators['newPlaceForm'].resetValidation();
  popupAddCard.open();
  popupAddCard.setEventListeners();
});

const cardsContainer = document.querySelector('.elements');
const popupAddCard = new PopupWithForm({
  selector: '.popup_type_new-place',
  handleFormSubmit: (formData) => {
    cardsContainer.prepend(createCard(formData, '#element-template'));
    newPlaceForm.reset();
    popupAddCard.close();
  }
});
