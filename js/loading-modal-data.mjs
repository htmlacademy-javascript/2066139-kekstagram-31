import {CHUNK_LOAD_COMMENTS} from './consts.mjs';

const userPostModalElement = document.querySelector('.big-picture');
const socialCommentList = userPostModalElement.querySelector('.social__comments');

const fullSizePhoto = userPostModalElement.querySelector('.big-picture__img img');
const socialCaption = userPostModalElement.querySelector('.social__caption');
const likesCount = userPostModalElement.querySelector('.likes-count');

const commentsLoaderElement = userPostModalElement.querySelector('.comments-loader');
const commentShownCount = userPostModalElement.querySelector('.social__comment-shown-count');
const commentTotalCount = userPostModalElement.querySelector('.social__comment-total-count');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

let commentsData;
let loadedCommentsCount;

const createComment = ({avatar, message, name}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentatorAvatar = commentElement.querySelector('.social__picture');
  const commentatorMessage = commentElement.querySelector('.social__text');
  commentatorAvatar.src = avatar;
  commentatorAvatar.alt = name;
  commentatorMessage.textContent = message;

  return commentElement;
};

const renderListComments = (comments) => {
  const commentListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    commentListFragment.append(commentElement);
  });

  socialCommentList.append(commentListFragment);
};

const showNextComments = () => {
  if (commentsData.length <= CHUNK_LOAD_COMMENTS) {
    removeCommentsLoader();
    loadedCommentsCount += commentsData.length;
    renderListComments(commentsData);
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', onCommentsLoadClick);
    loadedCommentsCount += CHUNK_LOAD_COMMENTS;
    renderListComments(commentsData.splice(0, CHUNK_LOAD_COMMENTS));
  }
};

const updateShownCommentCount = () => {
  commentShownCount.textContent = loadedCommentsCount.toString();
};

function onCommentsLoadClick () {
  showNextComments();
  updateShownCommentCount();
}

function removeCommentsLoader () {
  commentsLoaderElement.classList.add('hidden');
  commentsLoaderElement.removeEventListener('click', onCommentsLoadClick);
}

const renderDataUserPost = ({url, description, likes, comments}) => {
  fullSizePhoto.src = url;
  fullSizePhoto.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  commentTotalCount.textContent = comments.length;
  socialCommentList.textContent = ''; // очищаем список комментариев
  loadedCommentsCount = 0;

  if (comments.length > 0) {
    commentsData = [...comments];
    showNextComments();
  } else {
    commentsLoaderElement.classList.add('hidden');
  }

  commentTotalCount.textContent = comments.length;
  updateShownCommentCount();
};

export {renderDataUserPost, removeCommentsLoader};
