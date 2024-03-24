import {isEscapeKey} from './util.mjs';
import {renderDataUserPost} from './loading-modal-data.mjs';

const bodyScrollElement = document.querySelector('body');
const userPostModalElement = bodyScrollElement.querySelector('.big-picture');
const userPostModalCloseElement = userPostModalElement.querySelector('#picture-cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserPostModal();
  }
};

const onCloseButtonClick = () => closeUserPostModal();

function openUserPostModal (pictureItem) {
  bodyScrollElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  userPostModalCloseElement.addEventListener('click', onCloseButtonClick);

  renderDataUserPost(pictureItem);
  userPostModalElement.classList.remove('hidden');
}

function closeUserPostModal () {
  userPostModalElement.classList.add('hidden');
  bodyScrollElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openUserPostModal};
