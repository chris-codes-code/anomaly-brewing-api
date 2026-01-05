const shopifyInventoryGQL = `
  query getAllProductsInventory($first: Int!, $variantFirst: Int!) {
    products(first: $first) {
      edges {
        node {
          variants(first: $variantFirst) {
            edges {
              node {
                id
                quantityAvailable
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

export { shopifyInventoryGQL };

