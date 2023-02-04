import { initialCards } from './initialCards.js';
import { openPlacePhoto } from './index.js';

const cardsContainer = document.querySelector('.cardsContainer');
const cardsContainerTemplate = document.querySelector('#element-template').content;

export function renderCards() {
  cardsContainer.innerHTML = '';
  initialCards.forEach(item => {
    const element = cardsContainerTemplate.cloneNode(true);
  
    element.querySelector('.element__title').textContent = item.name;
    element.querySelector('.element__image').src = item.link;

    element.querySelector('.element__image').addEventListener('click', (event) => {
      event.preventDefault();
      openPlacePhoto(event);
    });

    element.querySelector('.element__like').addEventListener('click', (event) => {
      event.preventDefault();
      event.target.classList.toggle('element__like_active');
    });
    
    element.querySelector('.element__trash').addEventListener('click', (event) => {
      event.preventDefault();
      event.target.parentElement.remove();
    });
  
    cardsContainer.append(element);
  });
}

renderCards();