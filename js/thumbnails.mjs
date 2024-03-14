const thumbnailContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({urlPhoto, description, likes, comments}, imageClickHandler) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailImgElement = thumbnail.querySelector('.picture__img');

  thumbnailImgElement.src = urlPhoto;
  thumbnailImgElement.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnailImgElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    imageClickHandler({urlPhoto, description, likes, comments});
  });

  return thumbnail;
};

const renderThumbnails = (pictures, onThumbnailClick) => {
  const thumbnailListFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture, onThumbnailClick);
    thumbnailListFragment.append(thumbnailElement);
  });

  thumbnailContainer.append(thumbnailListFragment);
};

export {renderThumbnails};
