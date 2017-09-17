# node_vue_instagram
SPA to browse instagram feed

## How to start

Requirements: docker-ce, nodejs 8+, linux.

1. Start the environment `docker-compose up -d`.
2. Run the server `npm run dev`.
3. Import fresh posts `node scripts/import_fresh.js`.
4. Browse the web site `http://localhost:8080/#/fresh`.
5. Publish to Featured `node scripts/publish_featured.js`.
6. Check the Featured section `http://localhost:8080/#/featured`.
