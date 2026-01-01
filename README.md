# Anomaly Brewing API

RESTful API for Anomaly Brewing, built with Express.js and integrated with DatoCMS for content management.

## Features

- Content management integration with DatoCMS
- Contact form submission via Web3Forms
- Newsletter subscription via EmailOctopus
- Multi-locale support
- CORS configuration
- Security headers via Helmet

## Prerequisites

- Node.js 18+ (ES modules support)
- npm or yarn
- DatoCMS account and API token
- Web3Forms access key
- EmailOctopus API key

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
- `WEB_3_FORMS_ACCESS_KEY` - Web3Forms API access key
- `WEB_3_FORMS_API_ENDPOINT` - Web3Forms API endpoint URL
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

### API Endpoints
- `POST /:locale/api/contact` - Submit contact form
  - Body: `{ name: string, email: string, message: string }`
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
├── app.js              # Express app configuration
├── server.js           # Server entry point
├── router.js           # Route definitions
├── config.js           # Application configuration
├── endpoints/          # API endpoints
│   ├── api/           # API routes (contact, subscribe)
│   └── content/       # Content routes (site, pages, page)
├── services/          # External service integrations
│   └── dato/         # DatoCMS service layer
└── utils/            # Utility functions
```

## License

MIT

