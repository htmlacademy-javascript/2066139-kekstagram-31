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

const renderListComments = () => {
  const commentsToRender = Math.min(CHUNK_LOAD_COMMENTS, commentsData.length - loadedCommentsCount);
  const commentListFragment = document.createDocumentFragment();

  commentsData.slice(loadedCommentsCount, loadedCommentsCount + CHUNK_LOAD_COMMENTS).forEach((comment) => {
    const commentElement = createComment(comment);
    commentListFragment.append(commentElement);
  });

  socialCommentList.append(commentListFragment);
  loadedCommentsCount += commentsToRender;

  if (loadedCommentsCount >= commentsData.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsLoaderElement.removeEventListener('click', onCommentsLoadClick);
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', onCommentsLoadClick);
  }
};

const updateShownCommentCount = () => {
  commentShownCount.textContent = loadedCommentsCount.toString();
};

function onCommentsLoadClick () {
  renderListComments();
  updateShownCommentCount();
}

const renderDataUserPost = ({urlPhoto, description, likes, comments}) => {
  fullSizePhoto.src = urlPhoto;
  fullSizePhoto.alt = description;

  socialCaption.textContent = description;
  likesCount.textContent = likes;
  commentTotalCount.textContent = comments.length;
  socialCommentList.textContent = ''; // очищаем список комментариев
  loadedCommentsCount = 0;

  if (comments.length > 0) {
    commentsData = comments;
    renderListComments();
  }

  commentTotalCount.textContent = comments.length;
  updateShownCommentCount();
};

export {renderDataUserPost};
