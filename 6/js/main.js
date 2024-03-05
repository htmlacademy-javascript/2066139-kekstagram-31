import {generatedPosts} from './data.mjs';
import {renderThumbnails} from './thumbnails.mjs';

const pictures = generatedPosts();
renderThumbnails(pictures);

// eslint-disable-next-line no-console
console.table(pictures);
