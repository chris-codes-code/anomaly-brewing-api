import config from './config.js';

const getURL = (locale = `:${config.params.locale}`) => {
  const path = config.path ? `/${config.path}` : '';
  return `${path}/${locale}`;
};

export { getURL };
