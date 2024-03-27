import {getData} from './api.mjs';
import {getErrorMessage} from './message-response.mjs';
import {renderThumbnails} from './thumbnails.mjs';
import {openUserPostModal} from './full-photo-modal.mjs';
import {addImageUploadHandler} from './form-upload.mjs';

const initializeApp = async () => {
  try {
    const picturesData = await getData();
    const onThumbnailClick = (pictureData) => openUserPostModal(pictureData);
    renderThumbnails(picturesData, onThumbnailClick);
  } catch {
    getErrorMessage();
  }
  addImageUploadHandler();
};

initializeApp();

// getData()
//   .then((picturesData) => renderThumbnails(picturesData, onThumbnailClick))
//   .catch(getErrorMessage);
// addImageUploadHandler();
