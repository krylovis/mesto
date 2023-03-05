import { initialCards } from './initialCards.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

const popupList = document.querySelectorAll('.popup');
const popupProfileForm = document.querySelector('.popup_type_profile-form');
const popupNewPlaceForm = document.querySelector('.popup_type_new-place');
const popupCloseButtonList = document.querySelectorAll('.popup__close-button');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileName = document.querySelector('.profile__name');

const profileForm = document.querySelector('form[name="profileForm"]');
const inputName = document.querySelector('#inputName');
const inputJob = document.querySelector('#inputJob');
const profileSubmitButton = profileForm.querySelector('.popup__submit-button');

const newPlaceForm = document.querySelector('form[name="newPlaceForm"]');
const inputPlaceName = document.querySelector('#inputPlaceName');
const inputPlaceLink = document.querySelector('#inputPlaceLink');
const newPlaceSubmitButton = newPlaceForm.querySelector('.popup__submit-button');

const formSelectors = {
  label: '.popup__label',
  input: '.popup__input',
  inputTypeError: '.popup__input_type_error',
  inputError: '.popup__input-error',
  inputErrorActive: 'popup__input-error_active',
  submitBtn: '.popup__submit-button',
  submitBtnInactive: 'popup__submit-button_inactive',
};

popupCloseButtonList.forEach(item => {
  item.addEventListener('click', () => {
    popupList.forEach((item) => {
      closePopup(item);
    });
  });
});

popupList.forEach(item => {
  item.addEventListener('click', (event) => {
    const classList = Array.from(event.target.classList);
    if (classList.includes('popup')) {
      closePopup(item);
    }
  });
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

// Редактировать профиль

const profileFormValidation = new FormValidator(formSelectors, popupProfileForm);
profileFormValidation.enableValidation();

profileEditButton.addEventListener('click', () => {
  profileFormValidation.resetValidation();
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

const newPlaceFormValidation = new FormValidator(formSelectors, popupNewPlaceForm);
newPlaceFormValidation.enableValidation();

const cardsContainer = document.querySelector('.elements');

profileAddButton.addEventListener('click', () => {
  newPlaceForm.reset();
  newPlaceFormValidation.resetValidation();
  openPopup(popupNewPlaceForm);
});

function handleAddCard(event) {
  event.preventDefault();
  const cardData = {};
  cardData.name = inputPlaceName.value;
  cardData.link = inputPlaceLink.value;
  if (inputPlaceName.value && inputPlaceLink.value) {
    const card = new Card(cardData, '#element-template');
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
    newPlaceForm.reset();
    closePopup(popupNewPlaceForm);
  }
}

newPlaceForm.addEventListener('submit', handleAddCard);

// Создать новую карточку

function renderCards() {
  initialCards.forEach(item => {
    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
  });
}

renderCards();
