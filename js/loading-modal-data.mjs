const userPostModalElement = document.querySelector('.big-picture');
const socialCommentList = userPostModalElement.querySelector('.social__comments');
const commentCount = userPostModalElement.querySelector('.social__comment-count');
const commentsLoader = userPostModalElement.querySelector('.comments-loader');

const fullSizePhoto = userPostModalElement.querySelector('.big-picture__img img');
const socialCaption = userPostModalElement.querySelector('.social__caption');
const likesCount = userPostModalElement.querySelector('.likes-count');

const commentShownCount = userPostModalElement.querySelector('.social__comment-shown-count');
const commentTotalCount = userPostModalElement.querySelector('.social__comment-total-count');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const getListСomments = (comments) => {
  const commentListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    const commentatorAvatar = commentElement.querySelector('.social__picture');
    const commentatorMessage = commentElement.querySelector('.social__text');
    commentatorAvatar.src = comment.avatar;
    commentatorAvatar.alt = comment.name;
    commentatorMessage.textContent = comment.message;

    commentElement.append(commentatorAvatar, commentatorMessage);
    commentListFragment.append(commentElement);
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
