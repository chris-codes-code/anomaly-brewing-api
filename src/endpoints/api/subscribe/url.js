import { getApiURL } from '../url.js';
import config from './config.js';

const getSubscribeURL = (locale) => `${getApiURL(locale)}/${config.path}`;

export { getSubscribeURL };
