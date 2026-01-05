import { shopifyInventoryGQL } from '../gql/shopify/inventory.js';
import { shopifyClient } from '../client.js';
import config from '../../../config.js';

const getShopifyInventory = async () => {
  try {
    const { data } = await shopifyClient.request(shopifyInventoryGQL, {
      variables: {
        first: 250, // Shopify allows up to 250 products per query
        variantFirst: 250, // Shopify allows up to 250 variants per query
      },
    });

    // Flatten the nested structure into a simple array
    const inventory = [];

    data.products.edges.forEach(({ node: product }) => {
      product.variants.edges.forEach(({ node: variant }) => {
        inventory.push({
          variantId: variant.id,
          available: variant.quantityAvailable,
          availableForSale: variant.availableForSale || false,
        });
      });
    });

    return inventory;
  } catch (error) {
    const errorMessage = config.server.env === 'production'
      ? 'Failed to fetch inventory from Shopify'
      : `Failed to fetch inventory from Shopify: ${error.message}`;

    console.error('Shopify inventory fetch failed:', error);
    throw new Error(errorMessage);
  }
};

export { getShopifyInventory };

