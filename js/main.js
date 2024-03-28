import {getData} from './api.mjs';
import {showDataErrorMessage} from './message-response.mjs';
import {renderThumbnails} from './thumbnails.mjs';
import {openUserPostModal} from './full-photo-modal.mjs';
import {addImageUploadHandler} from './form-upload.mjs';

const bootstrap = async () => {
  try {
    const picturesData = await getData();
    const onThumbnailClick = (pictureData) => openUserPostModal(pictureData);
    renderThumbnails(picturesData, onThumbnailClick);
  } catch {
    showDataErrorMessage();
  }
  addImageUploadHandler();
};

bootstrap();
