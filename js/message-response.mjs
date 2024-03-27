import {isEscapeKey} from './util.mjs';

const ALERT_SHOW_TIME = 5000;
const dataErrorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const successClassNameElement = successMessageTemplate.firstElementChild.className;
const errorClassNameElement = errorMessageTemplate.firstElementChild.className;
let currentMessage;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const getErrorMessage = () => {
  const dataErrorMessage = dataErrorMessageTemplate.cloneNode(true);
  document.body.append(dataErrorMessage);
  setTimeout(() => {
    dataErrorMessage.remove();
  }, ALERT_SHOW_TIME);
};

const onCloseButtonClick = () => closeSuccessMessage();

const onBodyCloseClick = (evt) => {
  if (!evt.target.closest(`.${successClassNameElement}`) && !evt.target.closest(`.${errorClassNameElement}`)) {
    closeSuccessMessage();
  }
};

const getUploadMessage = (template, button) => {
  currentMessage = template.cloneNode(true);
  const messageButtonClose = currentMessage.querySelector(button);
  document.body.append(currentMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  messageButtonClose.addEventListener('click', onCloseButtonClick);
  currentMessage.addEventListener('click', onBodyCloseClick);
};

const showUploadSuccessMessage = () => {
  getUploadMessage(successMessageTemplate, '.success__button');
};

const showUploadErrorMessage = () => {
  getUploadMessage(errorMessageTemplate, '.error__button');
};

function closeSuccessMessage () {
  currentMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {getErrorMessage, showUploadSuccessMessage, showUploadErrorMessage};
