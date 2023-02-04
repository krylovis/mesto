import { initialCards } from './initialCards.js';

let popupProfileForm = document.querySelector('.popup_type_profile-form');
let popupNewPlace = document.querySelector('.popup_type_new-place');
let popupPlacePhoto = document.querySelector('.popup_type_place-photo');
let popupCloseButton = document.querySelectorAll('.popup__close-button');

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

popupCloseButton.forEach(item => {
  item.addEventListener('click', () => {
    closePopup();
  });
});

function closePopup() {
  popupNewPlace.classList.remove('popup_opened');
  popupProfileForm.classList.remove('popup_opened');
  popupPlacePhoto.classList.remove('popup_opened');
};

// Редактировать профиль

profileEditButton.addEventListener('click', () => {
  popupProfileForm.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileSubtitle.textContent;
});

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup();
}

profileForm.addEventListener('submit', handleFormSubmit);

// Открыть фото

const popupPhoto = document.querySelector('.popup__photo');
const popupFigcaption = document.querySelector('.popup__figcaption');

function openPlacePhoto(event) {
  event.preventDefault();
  popupPhoto.src = event.target.src;
  const placeTitle = event.target.parentElement.querySelector('.element__title');
  popupFigcaption.textContent = placeTitle.textContent;
  popupPlacePhoto.classList.toggle('popup_opened');
}

// Добавить новое место

profileAddButton.addEventListener('click', () => {
  popupNewPlace.classList.toggle('popup_opened');
});

function addCard(event) {
  event.preventDefault();
  let card = {};
  card.name = inputPlaceName.value;
  card.link = inputPlaceLink.value;
  if (inputPlaceName.value && inputPlaceLink.value) {
    initialCards.unshift(card);
    renderCards();
    inputPlaceName.value = '';
    inputPlaceLink.value = '';
    closePopup();
  }
}

newPlaceForm.addEventListener('submit', addCard);

// Создать новую карточку

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;

function renderCards() {
  cardsContainer.innerHTML = '';
  initialCards.forEach(item => {
    const element = cardTemplate.cloneNode(true);
    const buttonDelete = element.querySelector('.element__trash');
    const cardImage = element.querySelector('.element__image');
    const card = element.querySelector('.element');
  
    element.querySelector('.element__title').textContent = item.name;
    cardImage.alt = item.name;
    cardImage.src = item.link;

    cardImage.addEventListener('click', (event) => {
      event.preventDefault();
      openPlacePhoto(event);
    });

    element.querySelector('.element__like').addEventListener('click', (event) => {
      event.preventDefault();
      event.target.classList.toggle('element__like_active');
    });
    
    buttonDelete.addEventListener('click', () => {
      card.remove();
    });
  
    cardsContainer.append(element);
  });
}

renderCards();
