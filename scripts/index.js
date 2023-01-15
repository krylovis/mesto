let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileEditButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupContainer = document.querySelector('.popup__container');
let inputName = document.querySelector('#inputName');
let inputJob = document.querySelector('#inputJob');


profileEditButton.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputJob.value = profileSubtitle.textContent;
  popup.classList.toggle('popup_opened');
});

popupCloseButton.addEventListener('click', function () {
  closePopup();
});

function closePopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup();
}

popupContainer.addEventListener('submit', handleFormSubmit);