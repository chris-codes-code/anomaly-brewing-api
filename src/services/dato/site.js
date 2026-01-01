import { executeQuery } from '@datocms/cda-client';
import config from '../../config.js';
import { controlSnippetQueryGQL } from './snippets/control.js';

const { datocms } = config;

const siteQueryGQL = `
  {
    siteModel {
      homePage {
        _modelApiKey
        slug
      }
      notification
      desktopNavigation {
        ${controlSnippetQueryGQL}
      }
      mobileNavigation {
        ${controlSnippetQueryGQL}
      }
      footerNavigation {
        ${controlSnippetQueryGQL}
      }
    }
  }
`;

const getSite = async () => {
  return await executeQuery(siteQueryGQL, {
    token: datocms.apiToken,
  });
};

export { getSite };
