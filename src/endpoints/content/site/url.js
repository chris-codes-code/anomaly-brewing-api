import { getContentURL } from '../url.js';
import config from './config.js';

const getSiteURL = (locale) => `${getContentURL(locale)}/${config.path}`;

export { getSiteURL };
