import { getContentURL } from '../url.js';
import config from './config.js';

const getInventoryURL = (locale) => `${getContentURL(locale)}/${config.path}`;

export { getInventoryURL };

