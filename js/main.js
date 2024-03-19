import {generatedPosts} from './data.mjs';
import {renderThumbnails} from './thumbnails.mjs';
import {openUserPostModal} from './full-photo-modal.mjs';
import {addImageUploadHandler} from './form-upload.mjs';

const picturesData = generatedPosts();
const onThumbnailClick = (pictureData) => openUserPostModal(pictureData);
renderThumbnails(picturesData, onThumbnailClick);
addImageUploadHandler();
