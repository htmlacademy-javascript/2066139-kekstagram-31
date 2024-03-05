const thumbnailContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({urlPhoto, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailImg = thumbnail.querySelector('.picture__img');

  thumbnailImg.src = urlPhoto;
  thumbnailImg.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const thumbnailListFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    thumbnailListFragment.append(thumbnailElement);
  });
  thumbnailContainer.append(thumbnailListFragment);
};

export {renderThumbnails};
