import {RANDOM_THUMBNAILS_COUNT} from './consts.mjs';
import {getRandomArraysFromRange} from './util.mjs';
import {renderThumbnails} from './thumbnails.mjs';

const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
const imgFilterElement = document.querySelector('.img-filters');
const buttonFilterElements = imgFilterElement.querySelectorAll('.img-filters__button');
const defaultFilter = imgFilterElement.querySelector('#filter-default');
const randomFilter = imgFilterElement.querySelector('#filter-random');
const discussedFilter = imgFilterElement.querySelector('#filter-discussed');

const setActiveClass = (evt) => {
  buttonFilterElements.forEach((button) => button.classList.remove(BUTTON_ACTIVE_CLASS));
  evt.target.classList.add(BUTTON_ACTIVE_CLASS);
};

const compareCountComments = (pictureA, pictureB) => {
  const commentsA = pictureA.comments.length;
  const commentsB = pictureB.comments.length;

  return commentsB - commentsA;
};

const onButtonDefaultFilterClick = (evt, pictures, onThumbnailClick) => {
  setActiveClass(evt);
  renderThumbnails(pictures, onThumbnailClick);
};

const onButtonRandomFilterClick = (evt, pictures, onThumbnailClick) => {
  setActiveClass(evt);
  const randomPhoto = getRandomArraysFromRange(pictures, RANDOM_THUMBNAILS_COUNT);
  renderThumbnails(randomPhoto, onThumbnailClick);
};

const onButtonDiscussedFilterClick = (evt, pictures, onThumbnailClick) => {
  setActiveClass(evt);
  const discussedPhoto = pictures.slice().sort(compareCountComments);
  renderThumbnails(discussedPhoto, onThumbnailClick);
};


const showPhotoFilter = (pictures, onThumbnailClick) => {
  imgFilterElement.classList.remove('img-filters--inactive');
  defaultFilter.addEventListener('click', (evt) => onButtonDefaultFilterClick(evt, pictures, onThumbnailClick));
  randomFilter.addEventListener('click', (evt) => onButtonRandomFilterClick(evt, pictures, onThumbnailClick));
  discussedFilter.addEventListener('click', (evt) => onButtonDiscussedFilterClick(evt, pictures, onThumbnailClick));
};

export {showPhotoFilter};
