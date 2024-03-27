import {getData} from './api.mjs';
import {getErrorMessage} from './message-response.mjs';
import {renderThumbnails} from './thumbnails.mjs';
import {openUserPostModal} from './full-photo-modal.mjs';
import {addImageUploadHandler} from './form-upload.mjs';

const onThumbnailClick = (pictureData) => openUserPostModal(pictureData);
getData()
  .then((picturesData) => renderThumbnails(picturesData, onThumbnailClick))
  .catch(getErrorMessage);
addImageUploadHandler();
