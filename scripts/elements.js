const elements = document.querySelector('.elements');
const profileAddButton = document.querySelector('.profile__add-button');
const elementTemplate = document.querySelector('#element-template').content;

const inputPlaceName = document.querySelector('#input-place-name');
const inputPlaceLink = document.querySelector('#input-place-link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(item => {
  const element = elementTemplate.cloneNode(true);
  console.log('item.name', item.name);
  console.log('element', element);

  element.querySelector('.element__title').textContent = item.name;
  element.querySelector('.element__image').src = item.link;

  elements.append(element);
});