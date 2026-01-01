import { getURL } from '../url.js';
import config from './config.js';

const getContentURL = (locale) => `${getURL(locale)}/${config.path}`;

export { getContentURL };
