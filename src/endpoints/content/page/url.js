import { getContentURL } from '../url.js';
import config from './config.js';

const getPageURL = (locale, page = `:${config.params.page}`) => `${getContentURL(locale)}/${config.path}/${page}`;

export { getPageURL };
