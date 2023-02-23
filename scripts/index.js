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
});

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupProfileForm);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Открыть фото

const popupPhoto = document.querySelector('.popup__photo');
const popupFigcaption = document.querySelector('.popup__figcaption');

function openPlacePhoto(placeImage, placeTitle) {
  popupPhoto.src = placeImage.src;
  popupPhoto.alt = placeImage.alt;
  popupFigcaption.textContent = placeTitle.textContent;
  openPopup(popupPlacePhoto);
}

// Добавить новое место

const cardsContainer = document.querySelector('.elements');

function createCard(item) {
  const element = cardTemplate.cloneNode(true);
  const card = element.querySelector('.element');
  const buttonDelete = element.querySelector('.element__trash');
  const cardImage = element.querySelector('.element__image');
  const cardTitle = element.querySelector('.element__title');
  const buttonLike = element.querySelector('.element__like');

  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;

  cardImage.addEventListener('click', () => {
    openPlacePhoto(cardImage, cardTitle);
  });

  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('element__like_active');
  });

  buttonDelete.addEventListener('click', () => {
    card.remove();
  });

  return element;
}

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
    const card = createCard(cardData);
    cardsContainer.prepend(card);
    newPlaceForm.reset();
    closePopup(popupNewPlace);
  }
}

newPlaceForm.addEventListener('submit', handleAddCard);

// Создать новую карточку

const cardTemplate = document.querySelector('#element-template').content;

function renderCards() {
  initialCards.forEach(item => {
    const card = createCard(item);
    cardsContainer.append(card);
  });
}

renderCards();
