const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'src/pages/**/*{.js,.ts,.jsx,.tsx}',
    '!src/pages/**/_*{.js,.ts,.jsx,.tsx}',
    '!src/pages/**/[*{.js,.ts,.jsx,.tsx}',
    '!src/pages/api',
    '!src/pages/account',
    '!src/pages/slocator',
    '!src/pages/{4,5}*',
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page.replace('src/pages', '').replace(/\.\w+.*?\w$/gim, '');
                const route = path === '/index' ? '' : path;

                return `
                        <url>
                            <loc>${`https://lighthouse.app${route}`}</loc>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
