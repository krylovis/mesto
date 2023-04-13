import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';

export const profileEditAvatarButton = document.querySelector('.profile__edit-avatar-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');

export const formValidators = {};

export const formSelectors = {
  label: '.popup__label',
  input: '.popup__input',
  inputTypeError: '.popup__input_type_error',
  inputError: '.popup__input-error',
  inputErrorActive: 'popup__input-error_active',
  submitBtn: '.popup__submit-button',
  submitBtnInactive: 'popup__submit-button_inactive',
};

// Api
const token = '14893dca-a279-433c-a27c-967896487d71';
const cohort = 'cohort-63';
const baseUrl = `https://mesto.nomoreparties.co/v1/${cohort}`;
const headers = {
  authorization: token,
  'Content-Type': 'application/json'
};

export const api = new Api({
  baseUrl: baseUrl,
  headers: headers
});

// UserInfo
export const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__subtitle',
  avatar: '.profile__avatar',
});