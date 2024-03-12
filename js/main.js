import {generatedPosts} from './data.mjs';
import {renderThumbnails} from './thumbnails.mjs';

const picturesData = generatedPosts();
renderThumbnails(picturesData);
