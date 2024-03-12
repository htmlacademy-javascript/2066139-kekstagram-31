import {openUserPostModal} from './full-photo-modal.mjs';

const thumbnailContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({urlPhoto, description, likes, comments}, index) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailImgElement = thumbnail.querySelector('.picture__img');

  thumbnailImgElement.src = urlPhoto;
  thumbnailImgElement.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.setAttribute('data-index', index);

  return thumbnail;
};

const onThumbnailClick = (evt, pictures) => {
  const thumbnailLink = evt.target.closest('a.picture');

  if (thumbnailLink) {

    const thumbnailItem = pictures[thumbnailLink.dataset.index];

    if (thumbnailItem) {
      openUserPostModal(thumbnailItem);
    }
  }
};

const renderThumbnails = (pictures) => {
  const thumbnailListFragment = document.createDocumentFragment();

  pictures.forEach((picture, index) => {
    const thumbnailElement = createThumbnail(picture, index);
    thumbnailListFragment.append(thumbnailElement);
  });

  thumbnailContainer.append(thumbnailListFragment);
  thumbnailContainer.addEventListener('click', (evt) => onThumbnailClick(evt, pictures));
};

export {renderThumbnails, onThumbnailClick};
