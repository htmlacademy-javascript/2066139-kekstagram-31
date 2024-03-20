import {isEscapeKey, getNormalizedStringArray} from './util.mjs';
import {configureFormValidation} from './form-validation.mjs';
import {imageEditingScaleInitialize, imageEditingScaleReset} from './image-editing.mjs';

const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadInputElement = uploadForm.querySelector('.img-upload__input');
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
  if (isValidForm()) {
    hashtagInputElement.value = getNormalizedStringArray(hashtagInputElement.value);
    descriptionElement.value = descriptionElement.value.trim();
    resetValidate();
    imageEditingScaleReset();
  } else {
    evt.preventDefault();
  }
});

const addImageUploadHandler = () => {
  uploadInputElement.addEventListener('change', (evt) => {
    if (evt.target.value) {
      openEditingImageForm();
    }
  });
};

function openEditingImageForm () {
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imageEditingFormCloseElement.addEventListener('click', closeEditingImageForm);
  imageEditingScaleInitialize();
  imageEditingFormElement.classList.remove('hidden');
}

function closeEditingImageForm () {
  bodyElement.classList.remove('modal-open');
  imageEditingFormElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset(); // Сбрасываем значения и состояние формы редактирования
  resetValidate(); // Сбрасываем ошибки в форме
  imageEditingScaleReset();
  uploadInputElement.value = ''; // Сбрасываем значение поля выбора файла
}

export {addImageUploadHandler};
