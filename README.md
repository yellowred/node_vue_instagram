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

## Architecture

VueJS+WebPack as a JS framework for a Single Page App.
MongoDB as a schemaless backend database.
Redis Sorted Sets as a cache layer for timestamp-sorted posts list sections.
Docker for local development and deployment to a cloud.

## What is done and what is not

This is a rough implementation of a SPA without tests and code needs some grooming. However most of the points of the exercise were covered.

Infinite scroll was not covered  – run out of time. I would implement infinite scroll as a VUE event which will listen to scroll up/down and based on this fetch prev/next page to add to vue.$store and remove not visible posts. Based on this view would watch vue.$store and redraw accordingly. Having only limited number of posts in DOM would keep performance at the optimal level.

Redis cache expiration is enforced by the backend and has 60 seconds TTL.


