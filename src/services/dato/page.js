import { executeQuery } from '@datocms/cda-client';
import config from '../../config.js';
import { contentContactSnippetQueryGQL } from './snippets/content/contact.js';
import { contentShopSnippetQueryGQL } from './snippets/content/shop.js';
import { contentTextSnippetQueryGQL } from './snippets/content/text.js';

const { datocms } = config;

const pageQueryGQL = (slug) => `
  {
    page(filter: {slug: {eq: "${slug}"}}) {
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

const getPage = async (slug) => await executeQuery(pageQueryGQL(slug), {
  token: datocms.apiToken,
});

export { getPage };
