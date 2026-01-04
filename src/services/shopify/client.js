import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import config from '../../config.js';

const shopifyClient = createStorefrontApiClient({
  apiVersion: config.shopify.apiVersion,
  publicAccessToken: config.shopify.publicAccessToken,
  storeDomain: config.shopify.storeDomain,
  customFetchApi: fetch,
});

export { shopifyClient };
