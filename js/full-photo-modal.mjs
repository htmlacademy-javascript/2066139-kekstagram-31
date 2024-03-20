import {isEscapeKey} from './util.mjs';
import {renderDataUserPost, updateShownCommentCount} from './loading-modal-data.mjs';

const NUMBER_LOAD_COMMENTS = 5;
const bodyScrollElement = document.querySelector('body');
const userPostModalElement = bodyScrollElement.querySelector('.big-picture');
const userPostModalCloseElement = userPostModalElement.querySelector('#picture-cancel');
const socialCommentListElement = userPostModalElement.querySelector('.social__comments');
const commentsLoaderElement = userPostModalElement.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserPostModal();
  }
};

const onCommentsLoad = () => {
  const commentsHiddenElement = socialCommentListElement.querySelectorAll('.social__comment.hidden');

  if (commentsHiddenElement.length > NUMBER_LOAD_COMMENTS) {
    for (let i = 0; i < NUMBER_LOAD_COMMENTS; i++) {
      commentsHiddenElement[i].classList.remove('hidden');
    }
  } else {
    commentsHiddenElement.forEach((commentHidden) => commentHidden.classList.remove('hidden'));
    commentsLoaderElement.classList.add('hidden');
  }

  updateShownCommentCount();
};

function openUserPostModal (pictureItem) {
  bodyScrollElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  userPostModalCloseElement.addEventListener('click', closeUserPostModal);

  renderDataUserPost(pictureItem);

  if (socialCommentListElement.children.length <= NUMBER_LOAD_COMMENTS) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', onCommentsLoad);
  }

  userPostModalElement.classList.remove('hidden');
}

function closeUserPostModal () {
  userPostModalElement.classList.add('hidden');
  bodyScrollElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoad);
  socialCommentListElement.innerHTML = ''; // очищаем список комментариев
}

export {openUserPostModal};
