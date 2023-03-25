import { initialCards } from './initialCards.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

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

function handleCardClick(name, image) {
  popupPhoto.src = image;
  popupPhoto.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupPlacePhoto);
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

// Редактировать профиль

profileEditButton.addEventListener('click', () => {
  formValidators['profileForm'].resetValidation();
  openPopup(popupProfileForm);
  inputName.value = profileName.textContent;
  inputJob.value = profileSubtitle.textContent;
});

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupProfileForm);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Добавить новое место

const cardsContainer = document.querySelector('.elements');

profileAddButton.addEventListener('click', () => {
  newPlaceForm.reset();
  formValidators['newPlaceForm'].resetValidation();
  openPopup(popupNewPlaceForm);
});

const createCard = (data, template) => {
  const card = new Card(data, template, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

function handleAddCard(event) {
  event.preventDefault();
  const cardData = {};
  cardData.name = inputPlaceName.value;
  cardData.link = inputPlaceLink.value;
  if (inputPlaceName.value && inputPlaceLink.value) {
    cardsContainer.prepend(createCard(cardData, '#element-template'));
    newPlaceForm.reset();
    closePopup(popupNewPlaceForm);
  }
}

newPlaceForm.addEventListener('submit', handleAddCard);

// Создать секцию с карточками

const cardList = new Section({ items: initialCards, renderer: (item) => {
  const card = createCard(item, '#element-template');
  cardList.setItem(card);
} }, '.elements');

cardList.renderItems();
