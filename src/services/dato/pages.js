import { executeQuery } from '@datocms/cda-client';
import config from '../../config.js';

const { datocms } = config;

const pagesQueryGQL = `
  {
    allPages {
      slug
      title
    }
  }
`;

const getPages = async () => {
  return await executeQuery(pagesQueryGQL, {
    token: datocms.apiToken,
  });
};

export { getPages };
