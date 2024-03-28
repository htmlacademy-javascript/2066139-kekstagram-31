import {isEscapeKey} from './util.mjs';

const REMOVE_MESSAGE_TIMEOUT = 5000;
const bodyElement = document.body;
const errorLoadDataTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
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

const showDataErrorMessage = () => {
  const dataErrorMessage = errorLoadDataTemplate.cloneNode(true);
  document.body.append(dataErrorMessage);
  setTimeout(() => {
    dataErrorMessage.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
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
  bodyElement.addEventListener('click', onBodyCloseClick);
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
  bodyElement.removeEventListener('click', onBodyCloseClick);
}

export {showDataErrorMessage, showUploadSuccessMessage, showUploadErrorMessage};
