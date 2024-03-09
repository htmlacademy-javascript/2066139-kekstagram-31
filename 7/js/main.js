import {generatedPosts} from './data.mjs';
import {renderThumbnails, onThumbnailClick} from './thumbnails.mjs';

const picturesData = generatedPosts();
renderThumbnails(picturesData);
onThumbnailClick(picturesData);
