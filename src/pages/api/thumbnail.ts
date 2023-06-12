/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Chromium from 'chrome-aws-lambda';

let browser: any = null;
let timer: any = null;
const isProduction = process.env.NODE_ENV === 'production';
const getAbsoluteURL = (path?: string): string => {
  const baseURL = isProduction ? `https://lighthouse.app` : 'http://localhost:3001';
  return decodeURIComponent(`${baseURL}${path}`);
};

export default async (req: any, res: any) => {
  if (isProduction) {
    try {
      browser = await Chromium.puppeteer.connect({
        browserWSEndpoint: 'ws://pup.lighthouse-backend.com:3003?token=dingdidingbadummtis',
      });
    } catch (e) {
      browser = await Chromium.puppeteer.launch({
        args: Chromium.args,
        executablePath: await Chromium.executablePath,
        headless: true,
      });
    }
  } else {
    browser = await Chromium.puppeteer.launch({
      args: Chromium.args,
      executablePath: await Chromium.executablePath,
      headless: true,
    });
  }

  const page = await browser.newPage();
  await page.setViewport({
    width: 1100,
    height: 650,
    deviceScaleFactor: 1,
  });
  const url = getAbsoluteURL(req.query?.path || '');
  const quality = parseInt(req.query?.quality || 10, 10);
  await page.goto(url, {
    timeout: 30 * 1000,
    waitUntil: 'load',
  });
  const data = await page.screenshot({
    type: 'jpeg',
    quality,
    fullPage: false,
    clip: {
      x: 0,
      y: 0,
      width: 1100,
      height: 650,
    },
  });

  clearTimeout(timer);
  timer = setTimeout(async () => {
    try {
      await browser.close();
    } catch (e) {
      //
    }
  }, 1000 * 60 * 10);
  // Set the s-maxage property which caches the images then on the Vercel edge
  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
  res.setHeader('Content-Type', 'image/png');
  // write the image to the response with the specified Content-Type
  res.end(data);
};
