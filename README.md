# Reddit Aparecium
<p align="center">
  <img src="https://raw.githubusercontent.com/jakkarintiew/reddit-aparecium/master/src/assets/logo.png?token=AHHR7PEGBRCOE2WBCE6NGF24Y4O4C" width="350"/>
</p>

## Description
This repository is only the front-end part of the project developed using Vue.js.
Reddit threads are hard to navigate and often biased as Reddit only shows non-premium user the top voted comments.  Users are influenced by top comments and may disregard views that may contradict their own. While there are different tools for analyzing Reddit user history and subreddits, there are currently no tools for analyzing the discussion of a single Reddit post.

This work visualizes a Reddit post as a clustering of comments by their underlying *topics* of discussion, and adds interactivity with:

-   Force directed graph by center of gravity at comment of highest topic score in a topic
-   Clusters by coloring a specific topic
-   Node radius by Reddit vote score
-   Tooltip to show comment and sentiment analysis
-   Single-click Reddit user analytics side bar (thanks [atomiks's Reddit User Analyser!](https://github.com/atomiks/reddit-user-analyser))
-   Collapsible comment section

## Host Visualization Front End locally

```shell
cd reddit-aparecium
npm install
```

```shell
npm run serve     # Compiles and hot-reloads for development

# Other kinds of running options
npm run build     # Compiles and minifies for production
npm run test      # Run your tests
npm run lint      # Lints and fixes files
```

Browse to `localhost:8080/#/` (with Chrome) and enjoy
