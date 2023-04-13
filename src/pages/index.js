import './index.css';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteConfirmation from '../components/PopupWithDeleteConfirmation.js';
import PopupWithImage from '../components/PopupWithImage.js';

import {
  profileEditAvatarButton,
  profileEditButton,
  profileAddButton,
  formSelectors,
  formValidators,
  api,
  userInfo,
} from '../utils/constants.js';

// Данные с сервера
api.getData().then((res) => {
  const [user, cards] = res;
  userInfo.setUserInfo(user);
  cardList.renderItems(cards);
}).catch(err => console.log(err));

// Popup с фотографией
const popupWithImage = new PopupWithImage('.popup_type_place-photo');
popupWithImage.setEventListeners();
function handleCardClick(name, image) {
  popupWithImage.open(name, image);
};

// Валидация форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formSelectors, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formSelectors);

// Popup редактирования аватара
const popupEditAvatar = new PopupWithForm({
  selector: '.popup_type_new-avatar',
  handleFormSubmit: (formData) => {
    popupEditAvatar.renderLoading(true);
    const { link } = formData;
    api.editAvatar({ avatar: link })
      .then(res => {
        userInfo.setUserInfo(res);
        popupEditAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupEditAvatar.renderLoading(false));
  }
});
popupEditAvatar.setEventListeners();

function openEditAvatar() {
  formValidators['newAvatarForm'].resetValidation();
  popupEditAvatar.open();
};

profileEditAvatarButton.addEventListener('click', openEditAvatar);

// Popup профиля
const popupUserInfo = new PopupWithForm({
  selector: '.popup_type_profile-form',
  handleFormSubmit: (formData) => {
    const { userName, job } = formData;
    api.editUserInfo({ name: userName, about: job })
      .then(res => {
        userInfo.setUserInfo(res);
        popupUserInfo.close();
      })
      .catch(err => console.log(err));
  }
});
popupUserInfo.setEventListeners();

function openProfilePopup() {
  formValidators['profileForm'].resetValidation();
  const data = userInfo.getUserInfo();
  const { name, job } = data;
  popupUserInfo.setInputValues({ userName: name, job });
  popupUserInfo.open();
};

profileEditButton.addEventListener('click', openProfilePopup);

// Popup подтверждение удаления
const popupDeleteConfirmation = new PopupWithDeleteConfirmation({
  selector: '.popup_type_delete-confirmation',
});
popupDeleteConfirmation.setEventListeners();

// Создать карточку
const createCard = (data, template) => {
  const card = new Card(data, template, handleCardClick, handleButtonLikeClick, handleButtonDelete, userInfo.getUserID());

  function handleButtonLikeClick() {
    if (!card.isMyLike) {
      api.addLike(card.getCardID())
        .then(data => {
          card.addlikeActive();
          card.updateCounter(data);
        })
        .catch(err => console.log(err));
    } else {
      api.removeLike(card.getCardID())
        .then(data => {
          card.removelikeActive();
          card.updateCounter(data);
        })
        .catch(err => console.log(err));
    }
  };

  function handleButtonDelete() {
    popupDeleteConfirmation.open();
    popupDeleteConfirmation.updateSubmit(() => {
      api.deleteCard(card.getCardID())
        .then(() => {
          card.remove();
          popupDeleteConfirmation.close();
        })
        .catch(err => console.log(err));
    });
  };

  const cardElement = card.generateCard();
  return cardElement;
};

// Создать секцию с карточками
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item, '#element-template');
    cardList.setItemAppend(card);
  }
}, '.elements');

// Popup новое место
const popupAddCard = new PopupWithForm({
  selector: '.popup_type_new-place',
  handleFormSubmit: (formData) => {
    popupAddCard.renderLoading(true);
    api.addCard(formData)
      .then(res => {
        cardList.setItemPrepend(createCard(res, '#element-template'));
        popupAddCard.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupAddCard.renderLoading(false));
  }
});
popupAddCard.setEventListeners();

function openAddCardPopup() {
  formValidators['newPlaceForm'].resetValidation();
  popupAddCard.open();
};

profileAddButton.addEventListener('click', openAddCardPopup);
