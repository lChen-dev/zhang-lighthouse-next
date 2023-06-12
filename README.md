[![CircleCI](https://circleci.com/gh/Lighthouse-Org/lighthouse-next.svg?style=sheild&circle-token=7b6a24c6e2e20f624c9a9aac438194573b864ca2)](#)

# File system guide
- `/src` app code
  - `/pages` nextjs route pages
  - `/components` component code to be loaded by a `pages` file or another component. These should be grouped by folder based on module.
  - `/redux` redux stores and actions
  - `/utils` for various javascript utility functions
-`/public` static public files
  - `/static` static files i.e. css, images, fonts

Please try and follow this structure and avoid creating unnessesary folders
