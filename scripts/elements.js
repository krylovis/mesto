import { initialCards } from './initialCards.js';

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

export function renderCards() {
  elements.innerHTML = '';
  initialCards.forEach(item => {
    const element = elementTemplate.cloneNode(true);
  
    element.querySelector('.element__title').textContent = item.name;
    element.querySelector('.element__image').src = item.link;

    element.querySelector('.element__image').addEventListener('click', (event) => {
      event.preventDefault();
      console.log('event.target', event.target);
    });

    element.querySelector('.element__like').addEventListener('click', (event) => {
      event.preventDefault();
      event.target.classList.toggle('element__like_active');
    });
    
    element.querySelector('.element__trash').addEventListener('click', (event) => {
      event.preventDefault();
      event.target.parentElement.remove();
    });
  
    elements.append(element);
  });
}

renderCards();