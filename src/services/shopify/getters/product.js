import { shopifyProductGQL } from '../gql/shopify/product.js';
import { shopifyClient } from '../client.js';
import config from '../../../config.js';

const getShopifyProduct = async (handle) => {
  try {
    const { data: { product } } = await shopifyClient.request(shopifyProductGQL, {
      variables: { handle },
    });

    return product;
  } catch (error) {
    const errorMessage = config.server.env === 'production'
      ? 'Failed to fetch product from Shopify'
      : `Failed to fetch product from Shopify: ${error.message}`;

    console.error('Shopify product fetch failed:', { error, handle });
    throw new Error(errorMessage);
  }
};

export { getShopifyProduct };
