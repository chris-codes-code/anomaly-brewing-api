import { executeQuery } from '@datocms/cda-client';
import config from '../../config.js';
import { validateSlug } from '../../utils/validation.js';
import { contentContactSnippetQueryGQL } from './snippets/content/contact.js';
import { contentShopSnippetQueryGQL } from './snippets/content/shop.js';
import { contentTextSnippetQueryGQL } from './snippets/content/text.js';

const { datocms } = config;

const pageQueryGQL = (slug) => {
  // Validate slug to prevent GraphQL injection
  validateSlug(slug);
  
  // Escape special characters for GraphQL string
  const escapedSlug = slug.replace(/"/g, '\\"');
  
  return `
    {
      page(filter: {slug: {eq: "${escapedSlug}"}}) {
        _modelApiKey
        content {
          ${contentContactSnippetQueryGQL}
          ${contentShopSnippetQueryGQL}
          ${contentTextSnippetQueryGQL}
        }
        title
      }
    }
  `;
};

const getPage = async (slug) => {
  const query = pageQueryGQL(slug);
  return executeQuery(query, {
    token: datocms.apiToken,
  });
};

export { getPage };
