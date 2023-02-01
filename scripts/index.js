import { initialCards } from './initialCards.js';
import { renderCards } from './elements.js';

let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupTitle = document.querySelector('.popup__title');

let profileEditButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileName = document.querySelector('.profile__name');

let profileForm = document.querySelector('form[name="profileForm"]');
let inputName = document.querySelector('#inputName');
let inputJob = document.querySelector('#inputJob');

let newPlaceForm = document.querySelector('form[name="newPlaceForm"]');
const inputPlaceName = document.querySelector('#inputPlaceName');
const inputPlaceLink = document.querySelector('#inputPlaceLink');

popupCloseButton.addEventListener('click', () => {
  closePopup();
});

function closePopup() {
  popup.classList.remove('popup_opened');
  profileForm.classList.remove('popup__form_opened');
  newPlaceForm.classList.remove('popup__form_opened');
};

// Редактировать профиль

profileEditButton.addEventListener('click', () => {
  popupTitle.textContent = 'Редактировать профиль';
  popup.classList.toggle('popup_opened');
  profileForm.classList.toggle('popup__form_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileSubtitle.textContent;
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup();
}

profileForm.addEventListener('submit', handleFormSubmit);

// Добавить новое место

profileAddButton.addEventListener('click', () => {
  popupTitle.textContent = 'Новое место';
  popup.classList.toggle('popup_opened');
  newPlaceForm.classList.toggle('popup__form_opened');
});

function addCard(evt) {
  evt.preventDefault();
  let card = {
    name: '',
    link: '',
  };
  card.name = inputPlaceName.value;
  card.link = inputPlaceLink.value;
  initialCards.unshift(card);
  renderCards();
  closePopup();
}

newPlaceForm.addEventListener('submit', addCard);
