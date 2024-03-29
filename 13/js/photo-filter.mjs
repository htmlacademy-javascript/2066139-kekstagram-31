import {RANDOM_THUMBNAILS_COUNT} from './consts.mjs';
import {getRandomArraysFromRange, debounce} from './util.mjs';
import {renderThumbnails} from './thumbnails.mjs';

const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
const photoFilterContainer = document.querySelector('.img-filters');
const buttonFilterElements = photoFilterContainer.querySelectorAll('.img-filters__button');

const ButtonFilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const setActiveClass = (target) => {
  if (!target.classList.contains(BUTTON_ACTIVE_CLASS)) {
    buttonFilterElements.forEach((button) => button.classList.remove(BUTTON_ACTIVE_CLASS));
    target.classList.add(BUTTON_ACTIVE_CLASS);
  }
};

const selectedRandomFilter = (pictures) => {
  const randomPhoto = getRandomArraysFromRange(pictures, RANDOM_THUMBNAILS_COUNT);

  return randomPhoto;
};

const selectedDiscussedFilter = (pictures) => {
  const compareCountComments = ({comments:a}, {comments:b}) => b.length - a.length;
  const discussedPhoto = [...pictures].sort(compareCountComments);

  return discussedPhoto;
};

const onButtonFilterClick = {
  [ButtonFilterId.DEFAULT]: (pictureData) => pictureData,
  [ButtonFilterId.RANDOM]: selectedRandomFilter,
  [ButtonFilterId.DISCUSSED]: selectedDiscussedFilter,
};

const filterThumbnails = (selectedButtonFilter, pictures, onThumbnailClick) => {
  const filteredPhoto = onButtonFilterClick[selectedButtonFilter.id](pictures);
  renderThumbnails(filteredPhoto, onThumbnailClick);
};

const debouncedFilterThumbnails = debounce(filterThumbnails);

const showPhotoFilter = (pictures, onThumbnailClick) => {
  photoFilterContainer.classList.remove('img-filters--inactive');
  photoFilterContainer.addEventListener('click', (evt) => {
    const selectedButtonFilter = evt.target.closest('.img-filters__button');

    if (selectedButtonFilter) {
      setActiveClass(selectedButtonFilter);
      debouncedFilterThumbnails(selectedButtonFilter, pictures, onThumbnailClick);
    }
  });
};

export {showPhotoFilter};
