import { initialCards } from './initialCards.js';

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

export function renderCards() {
  elements.innerHTML = '';
  initialCards.forEach(item => {
    const element = elementTemplate.cloneNode(true);
  
    element.querySelector('.element__title').textContent = item.name;
    element.querySelector('.element__image').src = item.link;
  
    elements.append(element);
  });
}

renderCards();