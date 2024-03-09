import {createElement} from './util.mjs';

const userPostModalElement = document.querySelector('.big-picture');
const socialCommentList = userPostModalElement.querySelector('.social__comments');
const commentCount = userPostModalElement.querySelector('.social__comment-count');
const commentsLoader = userPostModalElement.querySelector('.comments-loader');

const fullSizePhoto = userPostModalElement.querySelector('.big-picture__img img');
const socialCaption = userPostModalElement.querySelector('.social__caption');
const likesCount = userPostModalElement.querySelector('.likes-count');

const commentShownCount = userPostModalElement.querySelector('.social__comment-shown-count');
const commentTotalCount = userPostModalElement.querySelector('.social__comment-total-count');

const getListСomments = (comments) => {
  const commentListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const socialCommentItem = createElement('li', 'social__comment');
    const commentatorAvatar = createElement('img', 'social__picture');
    commentatorAvatar.src = comment.avatar;
    commentatorAvatar.alt = comment.name;
    commentatorAvatar.width = 35;
    commentatorAvatar.height = 35;
    const commentatorMessage = createElement('p', 'social__text', comment.message);

    socialCommentItem.append(commentatorAvatar, commentatorMessage);
    commentListFragment.append(socialCommentItem);
  });

  return socialCommentList.append(commentListFragment);
};

const renderDataUserPost = ({urlPhoto, description, likes, comments}) => {
  commentsLoader.classList.add('hidden'); //temp
  commentCount.classList.add('hidden'); //temp

  fullSizePhoto.src = urlPhoto;
  fullSizePhoto.alt = description;

  socialCaption.textContent = description;
  likesCount.textContent = likes;
  commentShownCount.textContent = '#'; // TODO: отобразить кол-во показанных комментариев
  commentTotalCount.textContent = comments.length;

  getListСomments(comments);
};

export {renderDataUserPost};
