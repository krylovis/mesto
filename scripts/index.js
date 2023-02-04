import { initialCards } from './initialCards.js';

const popupList = document.querySelectorAll('.popup');
const popupProfileForm = document.querySelector('.popup_type_profile-form');
const popupNewPlace = document.querySelector('.popup_type_new-place');
const popupPlacePhoto = document.querySelector('.popup_type_place-photo');
const popupCloseButtonList = document.querySelectorAll('.popup__close-button');

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

popupCloseButtonList.forEach(item => {
  item.addEventListener('click', () => {
    popupList.forEach((iten) => {
      closePopup(iten);
    });
  });
});

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};

// Редактировать профиль

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfileForm);
  inputName.value = profileName.textContent;
  inputJob.value = profileSubtitle.textContent;
});

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupProfileForm);
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
  openPopup(popupPlacePhoto);
}

// Добавить новое место

const cardsContainer = document.querySelector('.elements');

function createCard(item) {
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
  
    return element;
}

profileAddButton.addEventListener('click', () => {
  openPopup(popupNewPlace);
});

function addCard(event) {
  event.preventDefault();
  let cardData = {};
  cardData.name = inputPlaceName.value;
  cardData.link = inputPlaceLink.value;
  if (inputPlaceName.value && inputPlaceLink.value) {
    initialCards.unshift(cardData);
    const card = createCard(cardData);
    cardsContainer.prepend(card);
    inputPlaceName.value = '';
    inputPlaceLink.value = '';
    closePopup(popupNewPlace);
  }
}

newPlaceForm.addEventListener('submit', addCard);

// Создать новую карточку

const cardTemplate = document.querySelector('#element-template').content;

function renderCards() {
  initialCards.forEach(item => {
    const card = createCard(item);
    cardsContainer.append(card);
  });
}

renderCards();
