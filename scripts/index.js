import { initialCards } from './initialCards.js';
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

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if(evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
});

const closeByEscape = (event) => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

function handleCardClick(name, image) {
  popupPhoto.src = image;
  popupPhoto.alt = name;
  popupFigcaption.textContent = name;
  popupPlacePhoto.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
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

// Создать новую карточку

function renderCards() {
  initialCards.forEach(item => {
    cardsContainer.append(createCard(item, '#element-template'));
  });
}

renderCards();
