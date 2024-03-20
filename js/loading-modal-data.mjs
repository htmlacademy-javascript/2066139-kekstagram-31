import {NUMBER_LOAD_COMMENTS} from './consts.mjs';

const userPostModalElement = document.querySelector('.big-picture');
const socialCommentList = userPostModalElement.querySelector('.social__comments');

const fullSizePhoto = userPostModalElement.querySelector('.big-picture__img img');
const socialCaption = userPostModalElement.querySelector('.social__caption');
const likesCount = userPostModalElement.querySelector('.likes-count');

const commentShownCount = userPostModalElement.querySelector('.social__comment-shown-count');
const commentTotalCount = userPostModalElement.querySelector('.social__comment-total-count');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const renderListComments = (comments) => {
  const commentListFragment = document.createDocumentFragment();

  comments.forEach(({avatar, message, name}, index) => {
    const commentElement = commentTemplate.cloneNode(true);

    const commentatorAvatar = commentElement.querySelector('.social__picture');
    const commentatorMessage = commentElement.querySelector('.social__text');
    commentatorAvatar.src = avatar;
    commentatorAvatar.alt = name;
    commentatorMessage.textContent = message;

    if (index >= NUMBER_LOAD_COMMENTS) {
      commentElement.classList.add('hidden');
    }

    commentElement.append(commentatorAvatar, commentatorMessage);
    commentListFragment.append(commentElement);
  });

  socialCommentList.innerHTML = '';

  return socialCommentList.append(commentListFragment);
};

const updateShownCommentCount = () => {
  commentShownCount.textContent = socialCommentList.querySelectorAll('.social__comment:not(.hidden)').length;
};

const renderDataUserPost = ({urlPhoto, description, likes, comments}) => {
  fullSizePhoto.src = urlPhoto;
  fullSizePhoto.alt = description;

  socialCaption.textContent = description;
  likesCount.textContent = likes;
  commentTotalCount.textContent = comments.length;

  if (comments.length > 0) {
    renderListComments(comments);
  }

  commentTotalCount.textContent = comments.length;
  updateShownCommentCount();
};

export {renderDataUserPost, updateShownCommentCount};
