import './index.css';
import { initialCards } from '../scripts/initialCards.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

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
const createCard = (data, template) => {
  const card = new Card(data, template, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

// Создать секцию с карточками
const cardList = new Section({ renderer: (item) => {
  const card = createCard(item, '#element-template');
  cardList.setItemAppend(card);
} }, '.elements');

cardList.renderItems(initialCards);

// Popup новое место
const cardsContainer = document.querySelector('.elements');
const popupAddCard = new PopupWithForm({
  selector: '.popup_type_new-place',
  handleFormSubmit: (formData) => {
    cardList.setItemPrepend(createCard(formData, '#element-template'));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

function openAddCardPopup() {
  formValidators['newPlaceForm'].resetValidation();
  popupAddCard.open();
};

profileAddButton.addEventListener('click', openAddCardPopup);
