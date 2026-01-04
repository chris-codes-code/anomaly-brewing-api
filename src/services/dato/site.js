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
      socialLinks {
        label
        icon
        url
      }
    }
  }
`;

const getSite = async () => {
  return executeQuery(siteQueryGQL, {
    token: datocms.apiToken,
  });
};

export { getSite };
