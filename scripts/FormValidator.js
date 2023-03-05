export default class FormValidator {
  constructor(formSelectors, formElement) {
    this._formElement = formElement;

    this._label = formSelectors.label;
    this._input = formSelectors.input;
    this._inputTypeError = formSelectors.inputTypeError;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
    this._inputError = formSelectors.inputError;
    this._inputErrorActive = formSelectors.inputErrorActive;
    this._submitBtn = this._formElement.querySelector(formSelectors.submitBtn);
    this._submitBtnInactive = formSelectors.submitBtnInactive;
  };

  _showError = (inputElement, errorMessage) => {
    const errorElement = inputElement.closest(this._label).querySelector(this._inputError);
    inputElement.classList.add(this._inputTypeError);
    errorElement.classList.add(this._inputErrorActive);
    errorElement.textContent = errorMessage;
  };

  _hideError = (inputElement) => {
    const errorElement = inputElement.closest(this._label).querySelector(this._inputError);
    inputElement.classList.remove(this._inputTypeError);
    errorElement.classList.remove(this._inputErrorActive);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  };

  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitBtn.classList.add(this._submitBtnInactive);
      this._submitBtn.disabled = true;
    } else {
      this._submitBtn.classList.remove(this._submitBtnInactive);
      this._submitBtn.disabled = false;
    }
  };

  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
};