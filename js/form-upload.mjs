import {sendData} from './api.mjs';
import {showUploadSuccessMessage, showUploadErrorMessage} from './message-response.mjs';
import {isEscapeKey, getNormalizedStringArray} from './util.mjs';
import {configureFormValidation} from './form-validation.mjs';
import {initializeImageEditingScale, resetImageEditingScale} from './image-editing-scale.mjs';
import {initializeEffectSlider, destroyEffectSlider, resetEffect} from './image-effects.mjs';

const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileElement = uploadForm.querySelector('.img-upload__input');
const imageEditingFormElement = uploadForm.querySelector('.img-upload__overlay');
const imageUploadPreview = imageEditingFormElement.querySelector('.img-upload__preview > img');
const submitButtonElement = uploadForm.querySelector('.img-upload__submit');
const imageEditingFormCloseElement = imageEditingFormElement.querySelector('.img-upload__cancel');
const hashtagInputElement = imageEditingFormElement.querySelector('[name="hashtags"]');
const descriptionElement = imageEditingFormElement.querySelector('[name="description"]');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));
const isInputFocused = () => [hashtagInputElement, descriptionElement].includes(document.activeElement);

const onDocumentKeydown = (evt) => {
  const isImageEditorClosable = !isInputFocused() && !isErrorMessageExists();

  if (isEscapeKey(evt) && isImageEditorClosable) {
    evt.preventDefault();
    closeEditingImageForm();
  }
};

const toggleSubmitButton = (isDisabled, text) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = text;
};

const { isValidForm, resetValidate } = configureFormValidation(uploadForm, hashtagInputElement, descriptionElement);

const sendFormData = async (formElement) => {
  if (isValidForm()) {
    hashtagInputElement.value = getNormalizedStringArray(hashtagInputElement.value);
    descriptionElement.value = descriptionElement.value.trim();
    toggleSubmitButton(true, SubmitButtonText.SENDING);
    try {
      await sendData(new FormData(formElement));
      showUploadSuccessMessage();
      closeEditingImageForm();
    } catch {
      showUploadErrorMessage();
    } finally {
      toggleSubmitButton(false, SubmitButtonText.IDLE);
    }
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const addImageUploadHandler = () => {
  uploadFileElement.addEventListener('change', (evt) => {
    if (evt.target.value) {
      const fileImg = uploadFileElement.files[0];
      const isMatches = isValidFileType(fileImg);

      if (isMatches) {
        imageUploadPreview.src = URL.createObjectURL(fileImg);
      }

      openEditingImageForm();
    }
  });
};

const onFormResetButtonClick = () => closeEditingImageForm();

function openEditingImageForm () {
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', onFormSubmit);
  imageEditingFormCloseElement.addEventListener('click', onFormResetButtonClick);
  initializeImageEditingScale();
  initializeEffectSlider();
  imageEditingFormElement.classList.remove('hidden');
}

function closeEditingImageForm () {
  bodyElement.classList.remove('modal-open');
  imageEditingFormElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.removeEventListener('submit', onFormSubmit);
  imageEditingFormCloseElement.removeEventListener('click', onFormResetButtonClick);
  uploadForm.reset(); // Сбрасываем значения и состояние формы редактирования
  resetValidate(); // Сбрасываем ошибки в форме
  resetEffect();
  destroyEffectSlider();
  resetImageEditingScale();
  uploadFileElement.value = ''; // Сбрасываем значение поля выбора файла
  URL.revokeObjectURL(imageUploadPreview.src);
}

export {addImageUploadHandler};
