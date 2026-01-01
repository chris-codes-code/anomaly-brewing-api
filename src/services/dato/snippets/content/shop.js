import { productSnippetQueryGQL } from '../product.js';

const contentShopSnippetQueryGQL = `
  ... on ContentShopRecord {
    _modelApiKey
    products {
      ${productSnippetQueryGQL}
    }
  }
`;

export { contentShopSnippetQueryGQL };
