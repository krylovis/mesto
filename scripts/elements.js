import { initialCards } from './initialCards.js';

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

export function renderCards() {
  elements.innerHTML = '';
  initialCards.forEach(item => {
    const element = elementTemplate.cloneNode(true);
  
    element.querySelector('.element__title').textContent = item.name;
    element.querySelector('.element__image').src = item.link;

    element.querySelector('.element__like').addEventListener('click', (event) => {
      event.target.classList.toggle('element__like_active');
    });
    
    element.querySelector('.element__trash').addEventListener('click', (event) => {
      event.target.parentElement.remove();
    });
  
    elements.append(element);
  });
}

renderCards();