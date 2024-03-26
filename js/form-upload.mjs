import {isEscapeKey, getNormalizedStringArray} from './util.mjs';
import {configureFormValidation} from './form-validation.mjs';
import {initializeImageEditingScale, resetImageEditingScale} from './image-editing-scale.mjs';
import {initializeEffectSlider, destroyEffectSlider, resetEffect} from './image-effects.mjs';

const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileElement = uploadForm.querySelector('.img-upload__input');
const imageEditingFormElement = uploadForm.querySelector('.img-upload__overlay');
const imageEditingFormCloseElement = imageEditingFormElement.querySelector('.img-upload__cancel');
const hashtagInputElement = imageEditingFormElement.querySelector('[name="hashtags"]');
const descriptionElement = imageEditingFormElement.querySelector('[name="description"]');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (![hashtagInputElement, descriptionElement].includes(document.activeElement)) {
      closeEditingImageForm();
    }
  }
};

const { isValidForm, resetValidate } = configureFormValidation(uploadForm, hashtagInputElement, descriptionElement);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (isValidForm()) {
    hashtagInputElement.value = getNormalizedStringArray(hashtagInputElement.value);
    descriptionElement.value = descriptionElement.value.trim();
    uploadForm.submit();
    resetValidate();
    resetEffect();
    resetImageEditingScale();
  }
});

const addImageUploadHandler = () => {
  uploadFileElement.addEventListener('change', (evt) => {
    if (evt.target.value) {
      openEditingImageForm();
    }
  });
};

const onFormResetButtonClick = () => closeEditingImageForm();

function openEditingImageForm () {
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imageEditingFormCloseElement.addEventListener('click', onFormResetButtonClick);
  initializeImageEditingScale();
  initializeEffectSlider();
  imageEditingFormElement.classList.remove('hidden');
}

function closeEditingImageForm () {
  bodyElement.classList.remove('modal-open');
  imageEditingFormElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageEditingFormCloseElement.removeEventListener('click', onFormResetButtonClick);
  uploadForm.reset(); // Сбрасываем значения и состояние формы редактирования
  resetValidate(); // Сбрасываем ошибки в форме
  resetEffect();
  destroyEffectSlider();
  resetImageEditingScale();
  uploadFileElement.value = ''; // Сбрасываем значение поля выбора файла
}

export {addImageUploadHandler};
