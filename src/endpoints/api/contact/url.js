import { getApiURL } from '../url.js';
import config from './config.js';

const getContactURL = (locale) => `${getApiURL(locale)}/${config.path}`;

export { getContactURL };
