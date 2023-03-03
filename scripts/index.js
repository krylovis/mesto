import { initialCards } from './initialCards.js';
import Card from './Card.js';

const popupList = document.querySelectorAll('.popup');
const popupProfileForm = document.querySelector('.popup_type_profile-form');
const popupNewPlace = document.querySelector('.popup_type_new-place');
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

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfileForm);
  inputName.value = profileName.textContent;
  inputJob.value = profileSubtitle.textContent;
  profileSubmitButton.classList.add('popup__submit-button_inactive');
  profileSubmitButton.disabled = true;
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
  openPopup(popupNewPlace);
  newPlaceSubmitButton.classList.add('popup__submit-button_inactive');
  newPlaceSubmitButton.disabled = true;
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
    closePopup(popupNewPlace);
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
