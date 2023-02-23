const validSettings = {
  popupForm: '.popup__form',
  popupInput: '.popup__input',
  popupSubmitButton: '.popup__submit-button',
  submitButtonInactive: 'popup__submit-button_inactive',
  inputTypeError: 'popup__input_type_error',
  inputError: function (id) { return `.${id}-error` },
  inputErrorActive: 'popup__input-error_active',
};

const enableValidation = (validSettings) => {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(validSettings.inputError(inputElement.id));
    inputElement.classList.add(validSettings.inputTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validSettings.inputErrorActive);
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(validSettings.inputError(inputElement.id));
    inputElement.classList.remove(validSettings.inputTypeError);
    errorElement.classList.remove(validSettings.inputErrorActive);
    errorElement.textContent = '';
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validSettings.submitButtonInactive);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validSettings.submitButtonInactive);
      buttonElement.disabled = false;
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validSettings.popupInput));
    const buttonElement = formElement.querySelector(validSettings.popupSubmitButton);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const formList = Array.from(document.querySelectorAll(validSettings.popupForm));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};


enableValidation(validSettings);