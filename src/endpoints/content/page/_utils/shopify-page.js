import { getShopifyProduct } from '../../../../services/shopify/getters/product.js';
import { CONTENT_TYPES } from '../../../../utils/constants.js';

const buildProduct = async (product) => {
  if (!product) {
    return product;
  }

  let shopifyProduct = null;
  if (product.shopifyProduct?.handle) {
    try {
      shopifyProduct = await getShopifyProduct(product.shopifyProduct.handle);
    } catch (error) {
      console.warn('Failed to fetch Shopify product:', { error, handle: product.shopifyProduct.handle });
    }
  }

  const shopifyVariants = shopifyProduct?.variants?.edges
    ? shopifyProduct.variants.edges.map((edge) => edge.node)
    : null;

  // Create a Map for O(1) variant lookups
  const variantMap = shopifyVariants
    ? new Map(shopifyVariants.map((v) => [v.id, v]))
    : null;

  const variants = product.variants && Array.isArray(product.variants)
    ? product.variants.map((variant) => ({
      ...variant,
      shopify: variant.shopifyVariant?.id && variantMap
        ? variantMap.get(variant.shopifyVariant.id) || null
        : null,
    }))
    : product.variants;

  return {
    ...product,
    shopify: shopifyProduct,
    variants,
  };
};

const addShopifyData = async (pageData) => {
  if (!pageData?.page) {
    return pageData;
  }

  const { page } = pageData;

  if (!page.content || !Array.isArray(page.content)) {
    return pageData;
  }

  const processedContent = await Promise.all(
    page.content.map(async (entry) => {
      if (entry._modelApiKey === CONTENT_TYPES.SHOP && entry.products) {
        const processedProducts = await Promise.all(
          entry.products.map((product) => buildProduct(product)),
        );

        return {
          ...entry,
          products: processedProducts,
        };
      }

      return entry;
    }),
  );

  return {
    ...pageData,
    page: {
      ...page,
      content: processedContent,
    },
  };
};

export { addShopifyData };
