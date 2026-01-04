# Anomaly Brewing API

RESTful API for Anomaly Brewing, built with Express.js and integrated with DatoCMS for content management and Shopify for e-commerce data.

## Features

- Content management integration with DatoCMS
- Shopify Storefront API integration for product and variant data
- Automatic enrichment of product pages with real-time Shopify pricing and inventory
- Newsletter subscription via EmailOctopus
- Multi-locale support
- CORS configuration
- Security headers via Helmet

## Prerequisites

- Node.js 18+ (ES modules support)
- npm or yarn
- DatoCMS account and API token
- Shopify store with Storefront API access
- EmailOctopus API key (for newsletter subscriptions)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

## Environment Variables

See `.env.example` for all required environment variables.

### Required Variables

- `DATOCMS_API_TOKEN` - DatoCMS API token for content fetching
- `SHOPIFY_STORE_DOMAIN` - Shopify store domain (e.g., `your-store.myshopify.com`)
- `SHOPIFY_PUBLIC_ACCESS_TOKEN` - Shopify Storefront API public access token
- `SHOPIFY_API_VERSION` - Shopify API version (e.g., `2026-01`)
- `EMAIL_OCTOPUS_API_KEY` - EmailOctopus API key
- `EMAIL_OCTOPUS_API_ENDPOINT` - EmailOctopus API endpoint URL
- `CORS_ORIGIN` - Allowed CORS origin (e.g., `http://localhost:3000`)

### Optional Variables

- `NODE_ENV` - Environment (default: `development`)
- `PORT` - Server port (default: `3001`)
- `CORS_CREDENTIALS` - Enable CORS credentials (default: `false`)
- `CORS_METHODS` - Allowed CORS methods (default: `GET,POST,PUT,DELETE,PATCH`)
- `DEFAULT_LOCALE` - Default locale (default: `en`)

## API Endpoints

### Health Check
- `GET /` - Health check endpoint

### Content Endpoints
- `GET /:locale/content/site` - Get site settings and navigation
- `GET /:locale/content/pages` - Get all pages
- `GET /:locale/content/page/:page` - Get specific page by slug
  - Automatically enriches product pages with Shopify data (pricing, variants, images)
  - For pages with `content_shop` entries, fetches real-time product data from Shopify

### API Endpoints
- `POST /:locale/api/subscribe` - Subscribe to newsletter
  - Body: `{ email: string }`

## Response Format

### Success Response
```json
{
  "data": { ... },
  "status": 200
}
```

### Error Response
```json
{
  "data": {
    "message": "Error message"
  },
  "status": 400
}
```

### Page Response with Shopify Data

When fetching a page that contains shop content (`content_shop`), the response includes enriched product data:

```json
{
  "data": {
    "page": {
      "title": "Shop",
      "content": [
        {
          "_modelApiKey": "content_shop",
          "products": [
            {
              "slug": "product-slug",
              "title": "Product Name",
              "shopify": {
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "gid://shopify/ProductVariant/123",
                        "title": "Variant Title",
                        "price": {
                          "amount": "29.99",
                          "currencyCode": "USD"
                        },
                        "compareAtPrice": {
                          "amount": "39.99",
                          "currencyCode": "USD"
                        },
                        "image": {
                          "url": "https://...",
                          "width": 800,
                          "height": 800
                        }
                      }
                    }
                  ]
                }
              },
              "variants": [
                {
                  "title": "Variant Title",
                  "shopify": {
                    "id": "gid://shopify/ProductVariant/123",
                    "price": {
                      "amount": "29.99",
                      "currencyCode": "USD"
                    },
                    "compareAtPrice": {
                      "amount": "39.99",
                      "currencyCode": "USD"
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "status": 200
}
```

## Development

```bash
# Start development server with hot reload
yarn dev

# Run linter
yarn lint

# Run tests
yarn test
```

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file handles the serverless function configuration.

## Project Structure

```
src/
├── app.js                    # Express app configuration
├── server.js                  # Server entry point
├── router.js                  # Route definitions
├── config.js                  # Application configuration
├── endpoints/                 # API endpoints
│   ├── api/                  # API routes (subscribe)
│   └── content/              # Content routes (site, pages, page)
│       └── page/
│           └── _utils/
│               └── shopify-page.js  # Shopify data enrichment logic
├── services/                  # External service integrations
│   ├── dato/                 # DatoCMS service layer
│   │   └── snippets/         # GraphQL query fragments
│   └── shopify/              # Shopify Storefront API integration
│       ├── client.js         # Shopify API client setup
│       ├── getters/          # Data fetching functions
│       │   └── product.js    # Product data fetcher
│       └── gql/               # GraphQL queries
│           └── shopify/
│               └── product.js # Product query definition
├── middleware/                # Express middleware
│   ├── async-handler.js      # Async error handling
│   └── error-handler.js      # Global error handler
└── utils/                     # Utility functions
    ├── env-validation.js      # Environment variable validation
    ├── response.js            # Response formatting
    └── validation.js          # Input validation
```

## Shopify Integration

The API integrates with Shopify's Storefront API to enrich product data from DatoCMS with real-time pricing and variant information.

### How It Works

1. **Content Fetching**: Pages are fetched from DatoCMS, which may contain product references via the Shopify Instance Selector plugin
2. **Product Enrichment**: When a page contains `content_shop` entries:
   - Each product's Shopify handle is used to fetch product data from Shopify
   - Variant data is matched between DatoCMS and Shopify using variant IDs
   - Real-time pricing, images, and availability are added to the response

### Shopify Data Structure

Products in DatoCMS reference Shopify products via:
- `shopifyProduct` - Reference to the Shopify product (contains `handle`)
- `variants[].shopifyVariant` - Reference to specific Shopify variants (contains `id`)

The API fetches the following from Shopify:
- Product variants with pricing (`price`, `compareAtPrice`)
- Variant images
- Variant titles and IDs

### GraphQL Query

The Shopify integration uses the `product` query (not the deprecated `productByHandle`):

```graphql
query getProduct($handle: String!) {
  product(handle: $handle) {
    variants(first: 10) {
      edges {
        node {
          id
          title
          price { amount, currencyCode }
          compareAtPrice { amount, currencyCode }
          image { url, width, height }
        }
      }
    }
  }
}
```

### Error Handling

- If a Shopify product cannot be fetched, the product data is still returned without Shopify enrichment
- Failed Shopify API calls are logged but do not break the page response
- Missing variant matches result in `null` for the `shopify` field on that variant

## Architecture

### Data Flow

1. **Request**: Client requests a page via `GET /:locale/content/page/:page`
2. **DatoCMS Fetch**: Page data is fetched from DatoCMS, including product references
3. **Shopify Enrichment**: For pages with `content_shop` entries:
   - Products are processed in parallel using `Promise.all`
   - Each product's Shopify handle is used to fetch variant data
   - Variants are matched by Shopify variant ID
   - Enriched data is merged back into the response
4. **Response**: Complete page data with Shopify enrichment is returned

### Key Design Decisions

- **Non-blocking Shopify calls**: If Shopify API fails, the page still returns with DatoCMS data
- **Parallel processing**: All products are fetched concurrently for better performance
- **ID-based matching**: Variants are matched using Shopify's GID format for reliability
- **Separation of concerns**: Shopify logic is isolated in `_utils/shopify-page.js`

### Performance Considerations

- Shopify API calls are made in parallel for all products on a page
- Variant matching is done in-memory after fetching all data
- Consider implementing caching for frequently accessed products
- Monitor Shopify API rate limits

## Code Review Notes

### Current Implementation Status

✅ **Working Features:**
- Shopify Storefront API integration using `product` query (non-deprecated)
- Product data enrichment with pricing and variant information
- Variant matching by Shopify GID
- Error handling that doesn't break page responses
- Proper async/await usage with Promise.all for parallel processing

### Potential Improvements

1. **Caching**: Consider implementing Redis or in-memory caching for Shopify product data to reduce API calls
2. **Rate Limiting**: Add rate limiting for Shopify API calls to prevent hitting limits
3. **Error Logging**: Enhance error logging with more context (product handle, variant ID, etc.)
4. **Configuration**: Make variant limit (`first: 10`) configurable
5. **Type Safety**: Consider adding TypeScript or JSDoc types for better type safety
6. **Testing**: Add unit tests for Shopify integration logic
7. **Monitoring**: Add metrics/monitoring for Shopify API call success rates and latency

### Code Quality

- ✅ Clean separation of concerns
- ✅ Proper error handling
- ✅ Consistent code style
- ✅ Good use of async/await
- ⚠️ Console.log statements should be replaced with proper logging
- ⚠️ Consider extracting magic numbers (variant limit) to constants

## License

MIT

