import { SHOPIFY } from '../../../../utils/constants.js';

const shopifyProductGQL = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      variants(first: ${SHOPIFY.VARIANT_LIMIT}) {
        edges {
          node {
            compareAtPrice { amount, currencyCode }
            id
            image {
              height
              url
              width
            }
            title
            price { amount, currencyCode }
          }
        }
      }
    }
  }
`;

export { shopifyProductGQL };
