import { imageSnippetQueryGQL } from './image.js';

const productSnippetQueryGQL = `
  slug
  title
  shopifyProduct
  svgPath
  svgViewBox
  variants {
    shopifyVariant
    metadata {
      volume
      quantity
    }
    image {
      ${imageSnippetQueryGQL}
    }
    title
  }
  metadata {
    percentage
    styles
  }
`;

export { productSnippetQueryGQL };
