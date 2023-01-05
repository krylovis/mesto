let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileEditButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('#inputName');
let jobInput = document.querySelector('#inputJob');


profileEditButton.addEventListener('click', function () {
  console.log('nameInput');
  popup.classList.toggle('popup_opened');
});

popupCloseButton.addEventListener('click', function () {
  console.log('nameInput');
  popup.classList.toggle('popup_opened');
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);