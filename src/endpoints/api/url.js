import { getURL } from '../url.js';
import config from './config.js';

const getApiURL = (locale) => `${getURL(locale)}/${config.path}`;

export { getApiURL };
