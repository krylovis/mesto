import { initialCards } from './initialCards.js';
import { openPlacePhoto } from './index.js';

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;

export function renderCards() {
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