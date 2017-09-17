# node_vue_instagram
SPA to browse instagram feed

## How to start

Requirements: docker-ce, nodejs 8+, linux.

1. Create new docker machine `docker-machine create -d virtualbox --virtualbox-hostonly-cidr 192.168.10.1/24 --virtualbox-memory '1024' --virtualbox-boot2docker-url https://releases.rancher.com/os/latest/rancheros.iso --engine-install-url https://raw.githubusercontent.com/SvenDowideit/install-docker/5896b863698967df0738976d6ee98efc5d4637ae/1.12.6.sh spa-sandbox`
2. Build and run the environment `docker-compose up -d`.
3. Run the server `npm run dev`.
4. Import fresh posts `node scripts/import_fresh.js`.
5. Browse the web site `http://localhost:8080/#/fresh`.
6. Publish to Featured `node scripts/publish_featured.js`.
7. Check the Featured section `http://localhost:8080/#/featured`.

## Architecture

VueJS+WebPack as a JS framework for a Single Page App.
MongoDB as a schemaless backend database.
Redis Sorted Sets as a cache layer for timestamp-sorted posts list sections.
Docker for local development and deployment to a cloud.

## What is done and what is not

This is a rough implementation of a SPA without tests and code needs some grooming. However most of the points of the exercise were covered.

Infinite scroll was not covered  – run out of time. I would implement infinite scroll as a VUE event which will listen to scroll up/down and based on this fetch prev/next page to add to vue.$store and remove not visible posts. Based on this view would watch vue.$store and redraw accordingly. Having only limited number of posts in DOM would keep performance at the optimal level.

Redis cache expiration is enforced by the backend and has 60 seconds TTL.


