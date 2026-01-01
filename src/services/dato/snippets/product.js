import { imageSnippetQueryGQL } from './image.js';

const productSnippetQueryGQL = `
  slug
  title
  svgPath
  svgViewBox
  variants {
    sku
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
