import { getContentURL } from '../url.js';
import config from './config.js';

const getPagesURL = (locale) => `${getContentURL(locale)}/${config.path}`;

export { getPagesURL };
